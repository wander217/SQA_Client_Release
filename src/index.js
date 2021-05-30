import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import SqaStore from "./app/SqaProvider";
import {Provider} from "react-redux"; 
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import {viVN} from "@material-ui/core/locale";

const sqaTheme= createMuiTheme({
  palette:{
    background:{
        default:"#F5F7FF"
    }
  }
},viVN);

ReactDOM.render(
    <ThemeProvider theme={sqaTheme}>
       <Provider store={SqaStore}>
          <App />
        </Provider>
    </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
