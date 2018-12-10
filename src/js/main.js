import "../css/main.css";
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app";
import AppStore from "./components/app/AppStore";
import {observe} from "mobx";
import capiConfig from './config.json';

const app = document.getElementById("app");
const {CapiAdapter} = window.simcapi;
let capiModel = new CapiAdapter.CapiModel({bgColor: ''});


ReactDOM.render(<App store={AppStore}/>, app);


CapiAdapter.expose('bgColor', capiModel, capiConfig.capi.bgColor);
console.log('CAPIADAPTER', CapiAdapter, capiConfig.capi.bgColor);
const disposer2 = observe(AppStore, 'bgColor', (change) => {
    console.log("bgColor changed to ", AppStore['bgColor']);

        // this.syncToCapiModel();
    capiModel.set('bgColor', AppStore['bgColor']);
});
