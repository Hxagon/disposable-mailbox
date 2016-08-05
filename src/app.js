import React, {Component} from "react";
import "./app.scss";
import {createStore, compose, combineReducers} from "redux";
import {Provider, connect} from "react-redux";
import config from "./config";
import MailContainer from "./containers/mail-container";
import hasher from "hasher";
import {loginWithUsernameIfValid, updateMailsIfValidUsername} from "./actions";
import configureStore from "./store/configureStore";
import Header from "./components/header";
import "babel-polyfill";
import "bootstrap/scss/bootstrap.scss"; // adds 80kb

let store = configureStore();

// TODO: collapse all but first mail

setInterval(
    () => {
        console.log("interval");
        store.dispatch(updateMailsIfValidUsername()
        );
    }, config.reload_interval_ms);


//add hash change listener
function hashChangeListener(username) {
    store.dispatch(loginWithUsernameIfValid(username));
}
hasher.changed.add(hashChangeListener);
hasher.initialized.add(hashChangeListener); //add initialized listener (to grab initial value in case it is already set)
hasher.init(); //initialize hasher (start listening for history changes)

// update hasher on username change
store.subscribe(() => {
        let username = store.getState().login.username;
        hasher.setHash(username);
    }
);


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Header/>
                    <MailContainer/>
                </div>
            </Provider>

        );
    }
}
