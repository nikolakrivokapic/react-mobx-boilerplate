import "../css/main.css"
import React from "react"
import ReactDOM from "react-dom"

import App from "./components/app"
import AppStore from "./components/app/AppStore"

const app = document.getElementById("app");

ReactDOM.render(<App store={AppStore}/>, app);

