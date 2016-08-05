import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "../reducers";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";

const loggerMiddleware = createLogger();

const enhancer = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default function configureStore() {
    return createStore(rootReducer, enhancer);
}