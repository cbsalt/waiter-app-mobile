import { FlatList } from 'react-native';

import { products } from '../../mocks/products';
import { formatCurrency } from '../../utils';

import { CustomText } from '../CustomText';
import { PlusCircle } from '../Icons/PlusCircle';

import { ProductImage,
  Product,
  ProductDetails,
  Separator,
  AddToCartButton
} from './styles';

export function Menu() {
  return (
    <FlatList
      data={products}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      ItemSeparatorComponent={Separator}
      keyExtractor={product => product._id}
      renderItem={({ item: product }) => (
        <Product>
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

          <AddToCartButton>
            <PlusCircle />
          </AddToCartButton>
        </Product>
      )}
    />
  );
}
