import {
    CHANGE_USERNAME,
    CHANGE_INPUT_USERNAME,
    REQUEST_MAILS,
    RECEIVE_MAILS,
    CHANGE_USERNAME_FROM_INPUT
} from "./actions";


const initialState = {
    login: {
        username: null,
        address: null,
        inputFieldUsername: ""
    },
    mails: [],
    isFetching: false,
    doneInitialFetchingForUsername: false
};


function rootReducer(state = initialState, action) {
    console.log(`action: ${action.type}`);
    switch (action.type) {
        case CHANGE_USERNAME:
            return Object.assign({}, state, {
                login: {username: action.username, address: null, inputFieldUsername: action.username},
                doneInitialFetchingForUsername: false
            });
        case CHANGE_INPUT_USERNAME:
            return Object.assign({}, state, {
                login: {
                    username: state.login.username,
                    address: state.login.address,
                    inputFieldUsername: action.inputFieldUsername
                }
            });
        case CHANGE_USERNAME_FROM_INPUT:
            return Object.assign({}, state, {
                login: {
                    username: state.login.inputFieldUsername,
                    address: null,
                    inputFieldUsername: state.login.inputFieldUsername
                },
                doneInitialFetchingForUsername: false
            });
        case REQUEST_MAILS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_MAILS:
            return Object.assign({}, state, {
                isFetching: false,
                login: {username: action.username, address: action.address, inputFieldUsername: action.address},
                mails: action.mails,
                doneInitialFetchingForUsername: true
            });
        default:
            return state
    }
}

export default rootReducer;