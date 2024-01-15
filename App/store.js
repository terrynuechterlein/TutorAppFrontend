import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk as ReduxThunk } from 'redux-thunk';
import AuthReducer from './Reducers/AuthReducer';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createLogger } from 'redux-logger';

console.log("ReduxThunk is a function:", typeof ReduxThunk === "function");

// Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Specifies which reducers to persist
};

const rootReducer = combineReducers({
  auth: AuthReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const loggerMiddleware = createLogger();

const store = createStore(
  persistedReducer, 
  applyMiddleware(ReduxThunk, loggerMiddleware)
);

const persistor = persistStore(store);

export { store, persistor };
