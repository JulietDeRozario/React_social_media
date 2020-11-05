import React from 'react';
import ReactDOM from 'react-dom';
import './style/dist/index.css';
import App from './App';
import { createStore }from 'redux';
import reducers from './reducers';
import  {Provider} from 'react-redux';
// TODO: mettre tout au propre dans des components
// TODO: utiliser les Link to de Paul

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
);

ReactDOM.render(
  <Provider store={store}>
  <App />
  </ Provider>,
  document.getElementById('root')
);

