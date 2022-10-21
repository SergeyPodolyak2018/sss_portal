




export default {
    name: 'myDetector',

    lookup(options) {
        const getUrlParams = url => `${url}?`.split('?')[1]
            .split('&').reduce((params, pair) =>
                ((key, val) => key ? {...params, [key]: val} : params)
                (...`${pair}=`.split('=').map(decodeURIComponent)), {});
        // options -> are passed in options
        let url_pareams = getUrlParams(window.location.href);


        if(url_pareams.hasOwnProperty(options.lookupQuerystring)){
            return url_pareams[options.lookupQuerystring];
        }
        return 'ru';
    },
};


