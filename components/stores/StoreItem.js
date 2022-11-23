import { Pressable, View, Text , StyleSheet} from "react-native";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

import axios from 'axios';

import IconButton from "../ui/IconButton";

import { AuthContext } from '../../contexts/auth-context';
import { StoresContext } from '../../contexts/stores_context';
import { BASE_URL, STORES_URL } from '../../constants/network';

export default function StoreItem({id, name}){
    const navigation = useNavigation();
    const authCtx = useContext(AuthContext);
    const storesCtx = useContext(StoresContext);

    function storesPressHandler(){
        navigation.navigate('StoreDetail',{
             storeId: id });
    }

    function storeDeleteHandler(){
        axios.delete(
            `${BASE_URL}${STORES_URL}${id}`,
            authCtx.apiAuthHeaders
          )
          .then( res => {
            //const storesList = res.data;
            //console.log(storesList);
            storesCtx.deleteStore(id);
          })
          .catch(error => {
            console.log(error);
            return error;
          });
    }

    return (
        <View style={styles.itemContainer}>
            <Pressable
                onPress={storesPressHandler}
                style={({pressed})=> pressed && styles.pressed}
            >
                <View style={styles.storeItem}>
                    <View>
                        <Text style={[styles.textBase, styles.name]}>
                            {name}
                        </Text>
                    </View>
                </View>

            </Pressable>
            <IconButton
                    icon="trash"
                    color={Colors.primary500}
                    size={30}
                    onPress={storeDeleteHandler}
            />
        </View>
        );
}

const styles = StyleSheet.create({
    pressed:{
        opacity: 0.75
    },
    storeItem:{
        padding:12,
        marginVertical: 5,
        marginLeft: 20,
        backgroundColor: Colors.primary500,
        flexDirection:'row',
        justifyContent: 'space-between',
        width:250,
        borderRadius: 6,
        elevation: 3,
        shadowColor: Colors.primary300,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1},
        shadowOpacity: 0.4,
    },
    textBase: {
        color: Colors.primary700
    },
    name: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    itemContainer:{
        paddingHorizontal:12,
        paddingVertical:4,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    }
});
