import { computed, observable } from "mobx"
import axios from 'axios';
import {getRandomColor} from '../../utils/helpers';

export class AppStore {
    @observable cards = [];
    @observable deckId = 'initial';
    @observable bgColor = '';
    @observable todoBgColor = '';

    fetchCards = (url) =>  {
        axios.get(url)
            .then(res => {
                this.cards = res.data.cards;
            });
    }

    changeBg = () =>  {
        this.bgColor = getRandomColor();
    }

    changeTodoBg = () =>  {
        this.todoBgColor = getRandomColor();
    }

    fetchDeck = () =>  {
        const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
        axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => {
                this.deckId = res.data.deck_id;
                this.fetchCards(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=4`);
            });
    }
}

export default new AppStore

