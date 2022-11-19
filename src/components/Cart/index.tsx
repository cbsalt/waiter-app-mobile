import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Products';
import { formatCurrency } from '../../utils';
import { api } from '../../utils/api';

import { Button } from '../Button';
import { CustomText } from '../CustomText';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { OrderConfirmedModal } from '../OrderConfirmedModal';

import {
  Actions,
  Image,
  Item,
  ProductContainer,
  QuantityContainer,
  ProductDetails,
  Summary,
  TotalContainer
} from './styles';

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder, selectedTable }: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmOrder() {
    setIsLoading(true);

    const payload = {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity
      }))
    };

    await api.post('/orders', payload);
    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://localhost:3001/uploads/${cartItem.product.imagePath}`,
                  }}
                />

                <QuantityContainer>
                  <CustomText size={14} color="#666">
                    {cartItem.quantity}x
                  </CustomText>
                </QuantityContainer>

                <ProductDetails>
                  <CustomText size={14} weight="600">{cartItem.product.name}</CustomText>
                  <CustomText size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </CustomText>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <CustomText color="#666">Total</CustomText>
              <CustomText size={20} weight="600">{formatCurrency(total)}</CustomText>
            </>
          ) : (
            <CustomText color="#999">
              Seu carrinho está vazio
            </CustomText>
          )}
        </TotalContainer>

        <Button
          disabled={cartItems.length === 0}
          loading={isLoading}
          onPress={handleConfirmOrder}
        >
          Confirmar pedido
        </Button>
      </Summary>

      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOk}
      />
    </>
  );
}
