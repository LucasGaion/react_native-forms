import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './screens/ProductList';
import ProductForm from './screens/ProductForm';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Lista de Produtos' }} />
        <Stack.Screen name="ProductForm" component={ProductForm} options={{ title: 'Cadastro de Produto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
