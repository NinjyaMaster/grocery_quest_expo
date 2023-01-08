import { FlatList } from 'react-native';

import GroceryItem from './GroceryItem';

const renderGroceryItem = (itemData) => {
  return <GroceryItem {...itemData.item} />;
};

export default function GroceriesList({ groceries }) {
  return (
    <FlatList data={groceries} renderItem={renderGroceryItem} keyExtractor={(item) => item.id} />
  );
}
