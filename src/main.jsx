import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppWrapper from './AppWrapper';
import { store } from './store/store';
import { Buffer } from 'buffer';

if (!globalThis.Buffer) {
    globalThis.Buffer = Buffer;
}

if (!globalThis.process) {
    globalThis.process = { env: {} };
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <AppWrapper />
            </HashRouter>
        </Provider>
    </React.StrictMode>
);
