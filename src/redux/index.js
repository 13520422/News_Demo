
import { createStore, applyMiddleware, compose, } from 'redux';
import { Provider, } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import Thunk  from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
//import rootSagas from '../sagas';
import { rootReducer, } from '../stores';
import rehydrateStore from './rehydrateStore';
import AsyncStorage from '@react-native-community/async-storage';
// Middlewares, enhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
 
const store = createStore(persistedReducer, applyMiddleware(Thunk));


let persisttor = persistStore(store);


// Method to start saga
//const startSaga = () => sagaMiddleware.run(rootSagas);

export { Provider, rehydrateStore, store,persisttor };