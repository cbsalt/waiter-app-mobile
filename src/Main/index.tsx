import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Products';

import { CategoriesContainer, CenteredContainer, Container, MenuContainer } from './styles';

import { Empty } from '../components/Icons/Empty';
import { CustomText } from '../components/CustomText';
import { Category } from '../types/Category';
import { api } from '../utils/api';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ]).then(([categoriesResponse, productsResponse]) => {
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
      setIsLoading(false);
    });

  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId
      ? '/products'
      : `/categories/${categoryId}/products`;

    setIsLoadingProducts(true);

    await new Promise(resolve => setTimeout(resolve, 1000)); //delay
    const { data } = await api.get(route);

    setProducts(data);
    setIsLoadingProducts(false);
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product
        });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);
      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        const newCartItems = [...prevState];
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }


      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      };

      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color="#d73035" size="large" />
          </CenteredContainer>
        )}

        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color="#d73035" size="large" />
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu
                      products={products}
                      onAddToCart={handleAddToCart}
                    />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />

                    <CustomText color="#666" style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado!
                    </CustomText>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </Container>

      <Footer>
        {!selectedTable && (
          <Button disabled={isLoading} onPress={() => setIsTableModalVisible(true)}>
            Novo Pedido
          </Button>
        )}

        {selectedTable && (
          <Cart
            cartItems={cartItems}
            onAdd={handleAddToCart}
            onDecrement={handleDecrementCartItem}
            onConfirmOrder={handleResetOrder}
            selectedTable={selectedTable}
          />
        )}
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
