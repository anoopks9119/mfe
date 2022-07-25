import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";


const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath}) => {

    const history = defaultHistory || createMemoryHistory({
        initialEntries : [initialPath]
    });
    if (onNavigate) {
        history.listen(onNavigate);
    }
    ReactDom.render(
        <App history={history} onSignIn={onSignIn}/>,
        el
    );

    return {
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location;
            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }

};

if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#_auth-dev-root');
    if (el) {
        mount(el, { defaultHistory : createBrowserHistory()});
    }
}

export { mount } 