import React, { Suspense } from "react";
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import App from './App';
import ErrorBoundary from "./components/ErrorBoundary";
import './styles/index.css';



async function init() {
    const container : any = document.getElementById('root')

    // Create a root.
    const root = ReactDOMClient.createRoot(container);

    root.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<ErrorBoundary>
						<App />
					</ErrorBoundary>
				</BrowserRouter>
            </PersistGate>
        </Provider>
    )

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    /// /
    //reportWebVitals()
}

init()
