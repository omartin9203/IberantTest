﻿import { createStore, applyMiddleware, compose, combineReducers, Store } from "redux";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { ApplicationState, configReducer } from "./stores/reducers";
import { History } from "history";
import { storeBuilder } from "redux-scaffolding-ts";
import { TestItemStore, TestItemsStore, NewTestItemStore, PersonItemStore, NewPersonItemStore, PersonItemsStore } from "./stores/test-store";

export default function configureStore(history: History, initialState?: ApplicationState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    const windowIfDefined = typeof window === "undefined" ? null : (window as any);

    // If devTools is installed, connect to it
    const composeEnhancers =
        typeof window === "object" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                  // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
                  latency: 0,
              })
            : compose;

    // define middlewares
    const middlewares = [thunk, routerMiddleware(history)];

    const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middlewares))(createStore);

    // Add repositories
    //storeBuilder.addRepository(new ServicesStore() as any);

    // Combine all reducers and instantiate the app-wide store instance
    const store = storeBuilder.getStore(initialState, buildRootReducer(), createStoreWithMiddleware as any) as Store<
        ApplicationState
    >;

    storeBuilder.addRepository(new TestItemStore() as any);
    storeBuilder.addRepository(new NewTestItemStore() as any);
    storeBuilder.addRepository(new TestItemsStore() as any);

    storeBuilder.addRepository(new PersonItemStore() as any);
    storeBuilder.addRepository(new NewPersonItemStore() as any);
    storeBuilder.addRepository(new PersonItemsStore() as any);

    return store;
}

function buildRootReducer() {
    return combineReducers<ApplicationState>({ config: configReducer, router: routerReducer } as any);
}
