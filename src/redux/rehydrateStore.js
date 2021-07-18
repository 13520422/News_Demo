 
  
import { persistStore,persistReducer } from 'redux-persist'; 
import AsyncStorage from '@react-native-community/async-storage';

const blacklist = [
  'home', 
  // Any sub-store that shouldn't be store between run time go here...
];

/**
 * This method take in the redux store and rehydrate it (READ: MODIFY)
 * The method return the promise, allow the the caller to wait until the process is complete
 */
const rehydrateStore = (store) => {
  if (!store) throw new Error('Can\'t start the redux without input store');

  return new Promise((resolve, reject) => {
    try {
      const callback = () => {
        resolve();
      };
      const persistConfig = {
        key: 'root',
        storage: AsyncStorage,
        blacklist
    };
      persistReducer(
        persistConfig,
        store,
        
        callback
      );
    } catch (e) {
      console.log(e)

      reject(e);
    }
  });
};

export default rehydrateStore;
