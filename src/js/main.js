import "../css/main.css";
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app";
import AppStore from "./components/app/AppStore";

const app = document.getElementById("app");
const transporter = window.simcapi.Transporter;
import Capi from './capi';

function init() {
    ReactDOM.render(<App store={AppStore}/>, app);

    const capi = new Capi();
    capi.expose();
}

function boot() {
    transporter.addInitialSetupCompleteListener(init);
    transporter.notifyOnReady();
}

document.addEventListener('DOMContentLoaded', boot);
