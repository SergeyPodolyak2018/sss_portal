require('babel-register')({
	presets: ['es2015', 'react'],
})

const articles_src = require('../src/data/articlesRU')
console.log(
	'%c 🇨🇴: articles ',
	'font-size:16px;background-color:#1ac03d;color:white;',
	articles_src.default.articles.map(article => {
		return {
			article: article.preview.link.split('/')[2],
		}
	})
)

const router = require('./router').default
const Sitemap =
	require('react-router-sitemap').default

function generateSitemap() {
	const articles =
		articles_src.default.articles.map(article => {
			return {
				article:
					article.preview.link.split('/')[2],
			}
		})
	const ids = [
		{ id: 0 },
		{ id: 1 },
		{ id: 2 },
		{ id: 3 },
		{ id: 4 },
	]
	const langs = [{ lang: 'en/' }, { lang: 'ru/' }]
	const paramsConfig = {
		'/:lang/innovation_progress': langs,
		'/:lang/search_discoveries': langs,
		'/direct_speech/:article': articles,
		'/ru/direct_speech/:article': articles,
		'/en/direct_speech/:article': articles,
		'/ru/?index=:id': ids,
		'/en/?index=:id': ids,
		'/?index=:id': ids,
		'/:lang': langs,
	}
	return new Sitemap(router)
		.applyParams(paramsConfig)
		.build('http://sss-portal.asferro.net/#/')
		.save('./public/sitemap.xml')
}

generateSitemap()
