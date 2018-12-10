import capiConfig from './config.json';
import {observe} from "mobx";
import AppStore from "../components/app/AppStore";
import TodoStore from "../components/todo/TodoStore";

const {CapiAdapter} = window.simcapi;

export default class Capi {
    constructor() {
        this.capiModel = new CapiAdapter.CapiModel({
            bgColor: '',
            filter: ''
        });
    }

    expose() {
        this.exposeProperty('bgColor', capiConfig.capi.bgColor, AppStore);
        this.exposeProperty('filter', capiConfig.capi.filter, TodoStore);
    }

    exposeProperty(key, config, Store) {
        CapiAdapter.expose(key, this.capiModel, config);

        observe(Store, key, () => {
            this.capiModel.set(key, Store[key]);
        });

        this.capiModel.on(`change:${key}`, (value) => {
            Store[key] = value.get(key);
        });
    }
}


