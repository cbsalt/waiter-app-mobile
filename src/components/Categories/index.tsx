import { useState } from 'react';
import { FlatList } from 'react-native';
import { Category } from '../../types/Category';

import { CustomText } from '../CustomText';

import { CategoryContainer, Icon } from './styles';

interface CategoryProps {
  categories: Category[]
  onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState('null');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;

    onSelectCategory(category);
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
          <CategoryContainer
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
          </CategoryContainer>
        );}}
    />
  );
}
