import { useState } from 'react';
import { FlatList } from 'react-native';

import { categories } from '../../mocks/categories';
import { CustomText } from '../CustomText';

import { Category, Icon } from './styles';

export function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('null');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;

    setSelectedCategory(category);
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={category => category._id}
      renderItem={({ item: category}) => {
        const isSelected = selectedCategory === category._id;

        return (
          <Category
            key={category._id}
            onPress={() => handleSelectCategory(category._id)}
          >
            <Icon>
              <CustomText opacity={isSelected ? 1 : 0.5}>{category.icon}</CustomText>
            </Icon>

            <CustomText
              size={14}
              weight="600"
              opacity={isSelected ? 1 : 0.5}>
              {category.name}
            </CustomText>
          </Category>
        );}}
    />
  );
}
