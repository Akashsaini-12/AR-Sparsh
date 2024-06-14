import {combineReducers, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import EncryptedStorage from 'react-native-encrypted-storage';
// import AsyncStorage from '@react-native-community/async-storage';
import {composeWithDevTools} from '@redux-devtools/extension';

// root reducer
import * as reducers from './ducks';

export default function configureStore(initialState = {}) {
  const persistConfig = {
    key: 'root',
    storage: EncryptedStorage,
    whitelist: ['userInfo'],
  };
  const rootReducer = combineReducers(reducers);
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const middleware = [thunk];
  const enhancer = composeWithDevTools(applyMiddleware(...middleware));

  const store = createStore(persistedReducer, initialState, enhancer);
  const persister = persistStore(store);

  return {store, persister};
}
