import React from 'react';
import ReactDOM from 'react-dom';
import {
	HashRouter as Router,
	Switch,
} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import WebFont from 'webfontloader';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ParallaxProvider } from 'react-scroll-parallax';


WebFont.load({
    google: {
        families: ['Open Sans','Roboto']
    }
});

ReactDOM.render(
	<React.StrictMode>
		<ParallaxProvider>
			<Router>
				{/* <Switch> */}
					<I18nextProvider i18n={i18n}>
						<App />
					</I18nextProvider>
				{/* </Switch> */}
			</Router>
		</ParallaxProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
