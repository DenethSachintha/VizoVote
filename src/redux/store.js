// redux/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';  // Import your auth reducer

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,  // Assuming authReducer handles `isAuthenticated`
  // Add other reducers here
});

// Create Redux store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))  // Using Redux DevTools and Thunk for async actions
);

export default store;
