import { FlatList } from "react-native";

import StoreItem from "./StoreItem";



export default function StoresList({stores, handleDeleteStore}){

    const renderStoreItem = ({ item }) => {
        return (
            <StoreItem {...item}
                handleDeleteStore={handleDeleteStore}
            />
        );
      };


    return <FlatList
            data={stores}
            renderItem={renderStoreItem}
            keyExtractor={(item)=> item.id}
            />;
}