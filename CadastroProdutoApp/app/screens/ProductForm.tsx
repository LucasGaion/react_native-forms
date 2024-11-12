import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

type ProductFormProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<{ params: { id?: number; name?: string; description?: string; price?: number } }, 'params'>;
};

const ProductForm = ({ navigation, route }: ProductFormProps) => {
  const [product, setProduct] = useState({
    name: route.params?.name || '',
    description: route.params?.description || '',
    price: route.params?.price ? route.params.price.toString() : '', // Converte preço para string
  });

  const handleInputChange = (name: string, value: string) => {
    setProduct({ ...product, [name]: value });
  };

  const handleSaveProduct = async () => {
    if (!product.name || !product.description || !product.price) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const url = route.params?.id
        ? `http://localhost:3000/products/${route.params.id}`
        : 'http://localhost:3000/products';
      const method = route.params?.id ? 'put' : 'post';

      await axios[method](url, product);
      Alert.alert('Sucesso', 'Produto salvo com sucesso!');
      navigation.navigate('ProductList');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao salvar o produto');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Produto:</Text>
      <View style={styles.inputContainer}>
        <Icon name="tag" size={20} color="#00B8D9" />
        <TextInput
          style={styles.input}
          value={product.name}
          onChangeText={(value) => handleInputChange('name', value)}
          placeholder="Nome do Produto"
          placeholderTextColor="#bbb"
        />
      </View>

      <Text style={styles.label}>Descrição:</Text>
      <View style={styles.inputContainer}>
        <Icon name="file-text" size={20} color="#00B8D9" />
        <TextInput
          style={styles.input}
          value={product.description}
          onChangeText={(value) => handleInputChange('description', value)}
          placeholder="Descrição do Produto"
          placeholderTextColor="#bbb"
        />
      </View>

      <Text style={styles.label}>Preço:</Text>
      <View style={styles.inputContainer}>
        <Icon name="money" size={20} color="#00B8D9" />
        <TextInput
          style={styles.input}
          value={product.price}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange('price', value)}
          placeholder="Preço"
          placeholderTextColor="#bbb"
        />
      </View>

      <Button title="Salvar Produto" onPress={handleSaveProduct} color="#00B8D9" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#444',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#333',
    borderRadius: 10,
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#00B8D9',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    elevation: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProductForm;
