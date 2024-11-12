import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

type ProductListProps = {
  navigation: NavigationProp<any>;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

const ProductList = ({ navigation }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao buscar produtos');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      Alert.alert('Sucesso', 'Produto excluído');
      fetchProducts();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao excluir produto');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Novo Produto" onPress={() => navigation.navigate('ProductForm')} color="#00B8D9" />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.price}>R$ {item.price}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Editar" onPress={() => navigation.navigate('ProductForm', item)} color="#ffc107" />
              <Button title="Excluir" onPress={() => handleDeleteProduct(item.id)} color="#dc3545" />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212', // Fundo escuro
    flex: 1,
  },
  addButton: {
    backgroundColor: '#00B8D9', // Ciano Claro
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  item: {
    padding: 20,
    marginVertical: 12,
    borderRadius: 12,
    backgroundColor: '#2C2C2C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  itemName: {
    fontWeight: '600',
    fontSize: 22,
    color: '#fff',
    marginBottom: 6,
  },
  itemDescription: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 10,
  },
  price: {
    color: '#28a745',
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    elevation: 2,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProductList;
