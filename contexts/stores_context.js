import { createContext, useReducer } from "react";


export const StoresContext = createContext({
    stores: [],
    addStore:({description, amount, date}) => {},
    setStores: (store) => {},
    deleteStore: (id) => {},
    updateStore: (id, {description, amount, date}) => {}
});

function storesReducer(state, action){
    switch(action.type){
        case 'ADD':
            return [ action.payload , ...state];
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatableStoreIndex = state.findIndex(
                (store) => store.id === action.payload.id
                );
            const updatableStore = state[updatableStoreIndex];
            const updatedItem = {...updatableStore, ...action.payload.data};
            const updatedStores = [...state];
            updatedStores[updatableStoreIndex] = updatedItem;
            return updatedStores;
        case 'DELETE':
            return state.filter((store) => store.id !== action.payload);
        default:
            return state;
    }
}

export default function StoresContextProvider({children}){
    const [storesState, dispatch] = useReducer(storesReducer, []);

    function addStore(storeData){
        dispatch({type: 'ADD', payload: storeData});
    }

    function setStores(stores){
        dispatch({type:'SET', payload: stores });
    }

    function deleteStore(id){
        dispatch({type: 'DELETE', payload: id});
    }

    function updateStore(id, storeData){
        dispatch({type:'UPDATE', payload:{id:id, data:storeData}});
    }

    const value = {
        stores :  storesState,
        setStores: setStores,
        addStore: addStore,
        deleteStore: deleteStore,
        updateStore: updateStore,
    };

    return <StoresContext.Provider value={value}>{children}</StoresContext.Provider>
}

