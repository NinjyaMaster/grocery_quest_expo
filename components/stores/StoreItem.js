import { Pressable, View, Text , StyleSheet} from "react-native";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";


export default function StoreItem({id, name}){ 
    const navigation = useNavigation();
 
    function storesPressHandler(){ 
        console.log("***************hi")
       // navigation.navigate('ManageExpense',{ 
       //     storesId: id });
    }

    return ( 
        <Pressable 
            onPress={storesPressHandler} 
            style={({pressed})=> pressed && styles.pressed} 
        > 
            <View style={styles.storeItem}>
                <View> 
                    <Text style={[styles.textBase, styles.name]}>
                        {name}
                    </Text>
                    <Text style={styles.textBase}>
                        text
                    </Text> 
                </View> 
            </View> 
        </Pressable> 
        );
}

const styles = StyleSheet.create({ 
    pressed:{ 
        opacity: 0.75 
    }, 
    storeItem:{ 
        padding:12,
        marginVertical: 8, 
        backgroundColor: Colors.primary500, 
        flexDirection:'row', 
        justifyContent: 'space-between', 
        borderRadius: 6, 
        elevation: 3, 
        shadowColor: Colors.primary300, 
        shadowRadius: 4, 
        shadowOffset: { width: 1, height: 1}, 
        shadowOpacity: 0.4, 
    }, 
    textBase: { 
        color: Colors.primary1000 
    }, 
    name: { 
        fontSize: 16, 
        marginBottom: 4, 
        fontWeight: 'bold', 
    }, 
    amoutContainer:{ 
        paddingHorizontal:12, 
        paddingVertical:4, 
        backgroundColor:'white', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 4, 
    }, 
    amount:{ 
        color: Colors.primary500, 
        fontWeight:'bold', 
        minWidth:60, 
    }
});
