import { find } from 'lodash'

const getContent = (arrey, path) => {
	let rez = find(arrey, o => {
		return o.preview.link === path
	})
	if (rez && rez.content) {
		return rez.content
	} else {
		return null
	}
}
export default getContent
