import config from "./config";
import {generateRandomUsername} from "./utils";
import "isomorphic-fetch";
import url from "url"; // adds 20kb


function cleanUsername(username) {
    if (username !== null) {
        username = username.replace(/[@].*$/, '');
    }
    return username;
}

function isValidUsername(username) {
    return !!cleanUsername(username);
}

function shouldFetchMails(state, username) {
    if (state.isFetching) {
        return false
    } else {
        return isValidUsername(username);
    }
}


export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const changeUsername = (username) => {
    return {
        type: CHANGE_USERNAME,
        username
    };
};

export const CHANGE_INPUT_USERNAME = 'CHANGE_INPUT_USERNAME';
export const changeInputUsername = (inputFieldUsername) => {
    return {
        type: CHANGE_INPUT_USERNAME,
        inputFieldUsername
    };
};

export const CHANGE_USERNAME_FROM_INPUT = 'CHANGE_USERNAME_FROM_INPUT';
export function changeUsernameFromInput() {
    return {
        type: CHANGE_USERNAME_FROM_INPUT
    }
}

export const REQUEST_MAILS = 'REQUEST_MAILS';
export function requestMails() {
    return {
        type: REQUEST_MAILS
    }
}


export const RECEIVE_MAILS = 'RECEIVE_MAILS';
export function receiveMails(username, address, mails) {
    return {
        type: RECEIVE_MAILS,
        username: username,
        address: address,
        mails: mails
    }
}


export function loginWithInputUsernameIfValid() {
    return function (dispatch, getState) {
        if (isValidUsername(getState().login.inputFieldUsername)) {
            dispatch(changeUsernameFromInput());
            dispatch(fetchMails());
        }

    }
}

export function loginWithUsernameIfValid(username) {
    return function (dispatch, getState) {
        if (isValidUsername(username)) {
            dispatch(changeUsername(username));
            dispatch(fetchMails());
        }

    }
}

export function loginWithRandomUsername() {
    return function (dispatch, getState) {
        let username = generateRandomUsername();
        dispatch(changeUsername(username));
        dispatch(fetchMails());
    }
}


export function fetchMails() {
    return function (dispatch, getState) {
        dispatch(requestMails());
        let username = getState().login.username;

        // http://redux.js.org/docs/advanced/AsyncActions.html
        let query = url.format({query: {username: username, action: "get"}});
        fetch(config.backend_url + query)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (data) {
                dispatch(receiveMails(data.username, data.address, data.mails));
            });


    }
}


export function updateMailsIfValidUsername() {
    return function (dispatch, getState) {
        let username = getState().login.username;

        if (shouldFetchMails(getState(), username)) {
            return dispatch(fetchMails())
        } else {
            return Promise.resolve()
        }
    }
}