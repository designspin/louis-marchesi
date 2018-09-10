import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const configureStore = (initialState) => {
    const enhancers = compose(
        applyMiddleware(thunk),
        process.env.NODE_ENV === 'development' &&
        typeof window !== 'undefined' &&
        typeof window.devToolsExtension !== 'undefined'
        ?
            window.devToolsExtension()
        :
            f => f,
    );

    const store = initialState
        ? createStore(reducer(), initialState, enhancers)
        : createStore(reducer(), enhancers);

    return store;
}

export default configureStore;