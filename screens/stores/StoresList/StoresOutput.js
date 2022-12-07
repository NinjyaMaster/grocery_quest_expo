import {View, StyleSheet, Text} from "react-native";
import StoresFlatList from "./StoresFlatList";
import { Colors } from "../../../constants/colors";


export default function StoresOutput({stores, handleDeleteStore}){
    let content;

    if(stores.length > 0){
        content = <StoresFlatList stores={stores} handleDeleteStore={handleDeleteStore}/>;
    }else{
        content = <Text style={styles.infoText}>Please add stores</Text>
    }

    return (
        <View style={styles.container}>
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        //flex: 1,
        //paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        //backgroundColor: Colors.primary100,
    },
    infoText:{
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop:32
    }
});
