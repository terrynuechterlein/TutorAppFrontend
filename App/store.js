import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk as ReduxThunk } from 'redux-thunk';
import AuthReducer from './Reducers/AuthReducer';
import ThemeReducer from './Reducers/ThemeReducer'; // Import ThemeReducer
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createLogger } from 'redux-logger';

// Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'theme'], 
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  theme: ThemeReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const loggerMiddleware = createLogger();

const store = createStore(
  persistedReducer,
  applyMiddleware(ReduxThunk, loggerMiddleware)
);

const persistor = persistStore(store);

export { store, persistor };
