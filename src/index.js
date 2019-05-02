import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import * as serviceWorker from './serviceWorker';
import './style.css';
import './firebase';

ReactDOM.render(<App />, document.getElementById('root'));
module.hot.accept();
serviceWorker.register();
