let createStore = (reducer) => {
    let state;
    let listeners = [];
    let getState = () => state;
    let subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };
    let dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };
    dispatch();
    return {
        getState,
        subscribe,
        dispatch
    };
};

// 应用中间件
// let applyMiddleWare = (middleWare) => (store) => {
//     middleWare = middleWare(store);
//     let dispatch = middleWare(store.dispatch);
//     return {
//         ...store,
//         dispatch
//     };
// };

// 应用多个中间件
let applyMiddleWare = (...middleWares) => store => {
    middleWares = middleWares.map(middleWare => middleWare(store));
    let dispatch = compose(...middleWares)(store.dispatch);
    return {
        ...store,
        dispatch
    };
};

let compose = (...fns) => (...args) => {
    let last = fns.pop();
    return fns.reduceRight((compose, fn) => fn(compose), last(...args));
};

export {createStore, applyMiddleWare};