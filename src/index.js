import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import AppWrapper from './AppWrapper';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
/*React.StrictMode - proveru pravila u toku razvoja*/

    <React.StrictMode> 
        { /*Uprvljanje stanjem u aplikacijuom - `store` prostor za globalne promenljive*/}
        <Provider store={store}>
            {/* Komponenta za implementaciju rutiranja (navigacije), mogu se koristiti i druge komponente, okviri(Next.js) ili sopstvena immplementacija */}
            <HashRouter>
                <AppWrapper></AppWrapper>
            </HashRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
