import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-http-backend";

import commonRu from './locales/ru/translation.json'
import commonEn from './locales/en/translation.json'
import myDetector from './myDetector';
const languageDetector = new LanguageDetector();
languageDetector.addDetector(myDetector);

const resources = {
    ru: { translation: commonRu },
    en: { translation: commonEn },
};
const options = {

    // order and from where user language should be detected
    order: ['myDetector','querystring','path', 'subdomain'],

        // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupSessionStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language on
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

    // optional expire and domain for set cookie
    cookieMinutes: 10,
    cookieDomain: 'myDomain',

    // optional htmlTag with lang attribute, the default is:
    htmlTag: document.documentElement,

    // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
    cookieOptions: { path: '/', sameSite: 'strict' }

};

i18n
    .use(XHR)
    .use(languageDetector)
    .init({
        // we init with resources

        resources,
        fallbackLng: "ru",
        debug: false,

        load: "languageOnly",

        ns: "translation",
        defaultNS: "translation",

        interpolation: {
            escapeValue: false // not needed for react!!
        },
        detection: options,

        supportedLngs: ['ru', 'en'],


        react: {
            wait: true
        }
    });

export default i18n;
