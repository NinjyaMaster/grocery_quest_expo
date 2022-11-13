import {View, StyleSheet, Text} from "react-native";
import StoresList from "./StoresList";
import { Colors } from "../../constants/colors";


export default function StoresOutput({stores, titleText}){
    let content = <Text style={styles.infoText}>{titleText}</Text>

    if(stores.length > 0){
        content = <StoresList stores={stores} />;
    }

    return (
        <View style={styles.container}>
            <Text>Stores</Text>
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: Colors.primary700,
    },
    infoText:{
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop:32
    }
});
