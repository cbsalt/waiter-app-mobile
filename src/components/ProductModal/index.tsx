import { FlatList, Modal } from 'react-native';

import { Close } from '../Icons/Close';
import { Product } from '../../types/Products';
import { formatCurrency } from '../../utils';

import { Button } from '../Button';
import { CustomText } from '../CustomText';
import { Footer } from '../Footer';

import {
  CloseButton,
  Header,
  Image,
  ModalBody,
  IngredientsContainer,
  Ingredient,
  Container,
  PriceContainer
} from './styles';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({ visible, onClose, product, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  function handleAddToCart() {
    onAddToCart(product!);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://localhost:3001/uploads/${product.imagePath}`,
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <CustomText weight="600" size={24}>{product.name}</CustomText>
          <CustomText color="#666" style={{ marginTop: 8}}>
            {product.description}
          </CustomText>
        </Header>

        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <CustomText weight="600" color="#666">
            Ingredientes
            </CustomText>

            <FlatList
              data={product.ingredients}
              keyExtractor={ingredient => ingredient._id}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16}}
              renderItem={({ item: ingredient }) => (
                <Ingredient>
                  <CustomText>{ingredient.icon}</CustomText>
                  <CustomText size={14} color="#666" style={{ marginLeft: 20 }}>
                    {ingredient.name}
                  </CustomText>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>

      <Footer>
        <Container>
          <PriceContainer>
            <CustomText color="#666">Preço</CustomText>
            <CustomText size={20} weight="600">{formatCurrency(product.price)}</CustomText>
          </PriceContainer>

          <Button onPress={handleAddToCart}>
            Adicionar ao pedido
          </Button>
        </Container>
      </Footer>
    </Modal>
  );
}
