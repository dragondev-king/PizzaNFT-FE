import React from 'react';
import ReactDOM from 'react-dom';
import { ethers } from "ethers";
import { ReactNotifications } from 'react-notifications-component'
import { Provider } from 'react-redux';
import { NftProvider } from "use-nft";

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./redux/store";
import { rpc_provider } from './config/contractConnect';
import 'react-notifications-component/dist/theme.css'
import './index.css';

const fetcher = ["ethers", { ethers, provider: rpc_provider }];

ReactDOM.render(
  <React.StrictMode>
    <NftProvider fetcher={fetcher}>
      <Provider store={ store }>
        <ReactNotifications />
        <App />
      </Provider>
    </NftProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
