import { useState } from 'react';
import { FlatList } from 'react-native';

import { Product } from '../../types/Products';
import { formatCurrency } from '../../utils';

import { CustomText } from '../CustomText';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';

import {
  ProductImage,
  ProductContainer,
  ProductDetails,
  Separator,
  AddToCartButton
} from './styles';

interface MenuProps {
  onAddToCart: (product: Product) => void;
  products: Array<Product>;
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={Separator}
        keyExtractor={product => product._id}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{
                uri: `http://localhost:3001/uploads/${product.imagePath}`,
              }}
            />
            <ProductDetails>
              <CustomText weight='600'>
                {product.name}
              </CustomText>
              <CustomText size={14} color="#666" style={{ marginVertical: 8 }}>
                {product.description}
              </CustomText>
              <CustomText size={14} weight="600">
                {formatCurrency(product.price)}
              </CustomText>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />

      <ProductModal
        visible={isModalVisible}
        product={selectedProduct}
        onClose={() => setIsModalVisible(false)}
        onAddToCart={onAddToCart}
      />
    </>
  );
}
