import { FlatList, Text } from "react-native";

import StoreItem from "./StoreItem";

function renderStoreItem(itemData){
    return <StoreItem {...itemData.item} />
}

export default function StoresList({stores}){

    return <FlatList 
            data={stores} 
            renderItem={renderStoreItem}
            keyExtractor={(item)=> item.id}
            />;
}