import React from "react"

import TodoStore from "../todo/TodoStore"
import AppStore from "./AppStore"
import TodoList from "../todo/TodoList"
import {observer} from "mobx-react";

@observer

export default class Main extends React.Component {
    componentDidMount() {
        this.props.store.fetchDeck();
    }

    render() {
        return <div style={{background: this.props.store.bgColor}} className={"main-wrapper"}>
            <TodoList store={TodoStore} appStore={AppStore} />

            <div className='cards'>
                {this.props.store.cards && this.props.store.cards.map((card, index) =>
                    <img key={index} src={card.image} />)}
            </div>
            <div className='deckId'>{this.props.store.deckId}</div>
            <button onClick={this.props.store.fetchDeck}>Fetch Cards</button>
            <button onClick={this.props.store.changeBg}>Change App BG</button>
            <button onClick={this.props.store.changeTodoBg}>Change BG Color for TODO container</button>
        </div>
    }
}
