import { legacy_createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import reduxThunk from 'redux-thunk'

const store = legacy_createStore(
    reducers,
    applyMiddleware(reduxThunk)
);

export default store;
