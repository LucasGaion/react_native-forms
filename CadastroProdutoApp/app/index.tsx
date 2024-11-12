import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './screens/ProductList'; // Ajuste o caminho conforme necessário
import ProductForm from './screens/ProductForm'; // Verifique se o caminho está correto

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="ProductForm" component={ProductForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
