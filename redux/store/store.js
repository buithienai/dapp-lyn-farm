import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/rootSaga';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(
            sagaMiddleware
        )
    ));

store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
}

store.runSagaTask()

export default () => store;