const getLng = () => {
 
	if (
		window.location.href.includes(
			window.location.origin + '/#/en/'
		)
	)
		return 'en'
	return 'ru'
	// const getUrlParams = url =>
	// 			`${url}?`
	// 				.split('?')[1]
	// 				.split('&')
	// 				.reduce(
	// 					(params, pair) =>
	// 						((key, val) =>
	// 							key
	// 								? { ...params, [key]: val }
	// 								: params)(
	// 							...`${pair}=`
	// 								.split('=')
	// 								.map(decodeURIComponent)
	// 						),
	// 					{}
	// 				)
	// // options -> are passed in options
	// let url_pareams = getUrlParams(window.location.href);

	// if(url_pareams.hasOwnProperty('lng')){
	//     return url_pareams['lng'];
	// }
	// return 'ru';
}
export default getLng
