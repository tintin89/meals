import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import restaurantsReducer from './store/reducers/restaurantsReducer';
import uiReducer from './store/reducers/uiReducer';
import authReducer from './store/reducers/authReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;

const rootReducer = combineReducers({
  restaurantsR:restaurantsReducer,
  uiR:uiReducer,
  authR:authReducer
 
})
const store = createStore(rootReducer,composeEnhancers(
  applyMiddleware(thunk)
));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>      
      <App/>        
    </Provider>    
  </React.StrictMode>,
  document.getElementById('root')
);


