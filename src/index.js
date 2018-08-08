import {createStore, applyMiddleWare} from "./redux";

let counter = (state = {number: 0}, action) => {
    if (action) {
        switch (action.type) {
            case 'ADD':
                return {number: state.number + 1};
            case 'SUB':
                return {number: state.number - 1};
            default:
                return state;
        }
    }
    return state;
};

let logger1 = store => next => action => {
    console.log("before1: ", store.getState());
    next(action);
    console.log("after1: ", store.getState());
};
let logger2 = store => next => action => {
    console.log("before2: ", store.getState());
    next(action);
    console.log("after2: ", store.getState());
};

// 如果放入多个中间件，需要从左往右依次执行
let store = applyMiddleWare(logger1, logger2)(createStore(counter));
store.subscribe(() => console.log(store.getState()));
store.dispatch({type: 'ADD'});


/*let logger = (store) => (next) => (action) => {
    console.log('before: ', store.getState());
    console.log(action);
    next(action);
    console.log('after: ', store.getState());
};

let thunk = (store) => (next) => (action) => {
    return typeof action === "function" ? action(next) : next(action);
};*/

/*let isPromise = (obj) => obj.then;
let promise = (store) => (next) => (action) => {
    return isPromise(action) ? action.then((data) => next(data)) : next(action);
};*/

// let store = applyMiddleWare(thunk)(createStore(counter));
// let store = applyMiddleWare(promise)(createStore(counter));
// store.subscribe(() => console.log(store.getState()));

// store.dispatch({type: 'ADD'});

/*store.dispatch(new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({type: 'SUB'});
    }, 2000);
}));*/
/*
store.dispatch(function(dispatch) {
    setTimeout(function() {
        dispatch({type: 'SUB'});
    }, 2000);
});*/
