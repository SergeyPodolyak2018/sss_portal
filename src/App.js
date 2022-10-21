import './App.css';

import { Footer, Share } from './components'
import {
	Route,
	Redirect,
	useLocation,
} from 'react-router-dom'

import { useEffect, useState } from 'react'
import ArticlePage from './components/articlePage/ArticlePage'
import Biography from './components/biography/Biography'
import DirectSpeech from './components/directSpeech/DirectSpeech'
import Form from './components/formWrapperProjects/FormWrapperProjects'
import Header from './components/header/Header'
import MainWrapper from './components/mainwrapper/MainWrapper'
import MetaTags from 'react-meta-tags'
import MobileDetect from 'mobile-detect'
import MobileLanscapePlaceholder from "./components/mobileLanscapePlaceholder/MobileLanscapePlaceholder"
import Projects                  from './components/projects/Projects';
import SearchDiscoveries         from './components/searchDiscoveries2/SearchDiscoveries';
// import biography              from "./data/biography";
// import contentDirectSpeech    from "./data/collectionArticle"
// import form                   from "./data/form";
// import {
//   footer,
//   mobileLandscapePlaceholder,
//   searchDiscovery,
//   share,
// }                             from "./data"
// import header                 from "./data/header";
// import mainPage               from "./data/mainpageList";
// import projects               from "./data/projects";
// import seoData                from './data/seo'
import getContent                from "./utils/getContent"
import getLanguage               from "./utils/getLanguage";
import getWindowMode             from "./utils/windowMode";
import getWindowSize             from "./utils/windowSize"
import i18n                      from "./i18n"
import { translate }             from "react-i18next";


import {
	// @index(['./data/*.js','!./data/index.js'], f => `${f.name},`)
	articlesEN,
	articlesRU,
	biography,
	emailSettings,
	footer,
	form,
	header,
	mainpageList,
	mobileLandscapePlaceholder,
	projects,
	searchDiscovery,
	seo,
	share,
	// @endindex
} from './data'


function App({ t }) {
	const location = useLocation()
	const { mode } = useWindowSize()
	const mode2 = useWindowSizev2()
	const md = new MobileDetect(navigator.userAgent)
	let lng = getLanguage()

  const [contentDirectSpeech, setArticles] =
		useState(
			lng === 'ru' ? articlesRU : articlesEN
		)
  // let contentDirectSpeech;
  //  contentDirectSpeech = articlesRU

	const [index, setIndex] = useState(
		location.search.indexOf('index') > -1
			? parseInt(
					location.search
						.split('=')[1]
						.split('&')[0]
			)
			: 0
	)

	useEffect(() => {
		lng = getLanguage()
    i18n.changeLanguage(lng)
    setArticles(
			lng === 'ru' ? articlesRU : articlesEN
		)

	}, [location])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location.pathname])

	const scroollListener = e => {
		if (
			window.matchMedia('(orientation: portrait)')
				.matches
		) {
			localStorage.setItem(
				'scrollY',
				window.scrollY
			)
		}
	}

//   const setArticles = (lng) => {
//     contentDirectSpeech =
//       lng === 'ru' ? articlesRU : articlesEN;
// }

	const isNotMobileLandscape = () => {
		return location.pathname.includes('/article/')
			? true
			: md.mobile()
			? window.matchMedia(
					'(orientation: portrait)'
			  ).matches
			: true
	}

	let [show_content, setShowContent] = useState(
		isNotMobileLandscape()
	)

	setTimeout(() => {
		if (isNotMobileLandscape() !== show_content)
			setShowContent(isNotMobileLandscape())
	}, 0)

	const orientator = e => {
		if (show_content) {
			setTimeout(() => {
				window.scrollTo(
					0,
					localStorage.getItem('scrollY')
				)
			}, 100)
		}
	}

	useEffect(() => {



		window.addEventListener(
			'scroll',
			scroollListener
		)
		window.addEventListener(
			'orientationchange',
			orientator
		)
		return () => {
			window.removeEventListener(
				'orientationchange',
				orientator
			)
			window.removeEventListener(
				'scroll',
				scroollListener
			)
		}


	}, [])

	const media_mode = window.matchMedia(
		'(max-width: 460px)'
	).matches
		? 'mobile'
		: window.matchMedia('(min-width: 769px)')
				.matches
		? 'desktop'
		: 'tablet'

	// (window.matchMedia("(orientation: portrait)").matches &&
	//         media_mode !== "mobile") ||
	//       location.pathname.includes("/article/")
	function getMeetaTags(data) {
		return (
			<MetaTags>
				<title>{t(data.title)}</title>
				<meta
					name='description'
					content={t(data.description)}
				/>
				<meta
					name='keywords'
					content={t(data.keywords)}
				/>
			</MetaTags>
		)
	}
	return (
		<div className='App'>
			{show_content ? (
				<>
					<Share
						mode={mode2}
						content={share}
						pathname={location.pathname}
					/>
					<Header
						menuButtons={header}
						pathname={location.pathname}
						mode={media_mode}
						width={mode2.px}
						setIndex={setIndex}
						width={mode2.px}
					/>
					<Route
						exact
						path={[
							// `/${lng}/?index=:id`,
							// '/?index=:id',
							// `/${lng}/`,
							// '/',
							`/${lng}/?index=:id`,
							'/?index=:id',
							`/${lng}`,
							'/',
						]}
					>
						{getMeetaTags(seo.mainPage)}
						<MainWrapper
							mode={media_mode}
							content={mainpageList}
							articles={contentDirectSpeech.articles.map(
								item => item.preview
							)}
							index={{
								index,
								setIndex,
							}}
						/>
						{/* <LazyLoad height={200} once={true} >
            </LazyLoad>*/}
					</Route>
					<Route
						exact
						path={[
							// `/${lng}/innovation_progress/`,
							// `/innovation_progress/`,
							`/${lng}/innovation_progress/`,
							`/innovation_progress/`,
							`/${lng}/innovation_progress`,
							`/innovation_progress`,
						]}
					>
						{getMeetaTags(seo.innovationPage)}
						<Biography
							content={biography}
							mode={media_mode}
							width={mode2.px}
						/>
						<Projects
							content={projects}
							mode={media_mode}
							mode2={mode2}
						/>
						<Form
							content={form}
							mode={media_mode}
						/>
						<Footer
							setIndex={setIndex}
							content={footer}
							mode={media_mode}
						/>
					</Route>

					<Route
						exact
						path={[
							`/${lng}/search_discoveries/`,
							`/search_discoveries/`,
							`/${lng}/search_discoveries`,
							`/search_discoveries`,
						]}
					>
						{getMeetaTags(seo.discoveryPage)}

						<SearchDiscoveries
							mode={media_mode}
							content={searchDiscovery}
							lng={lng}
						/>
						<Footer
							setIndex={setIndex}
							content={footer}
							mode={media_mode}
						/>
					</Route>
					<Route
						exact
						path={[
							`/${lng}/direct_speech`,
							`/direct_speech`,
							`/${lng}/direct_speech/`,
							`/direct_speech/`,
						]}
					>
						{getMeetaTags(seo.publicationPage)}

						<DirectSpeech
							content={contentDirectSpeech}
							mode={media_mode}
						/>
						<Footer
							setIndex={setIndex}
							content={footer}
							mode={media_mode}
						/>
					</Route>
					<Route
						// exact
						path={[
							`/${lng}/direct_speech/:id`,
							`/direct_speech/:id`,
							`/${lng}/direct_speech/:id/`,
							`/direct_speech/:id/`,
						]}
						render={({ match }) => (
							<>
								{contentDirectSpeech.articles.find(
									item =>
										item.preview.link ===
										'/direct_speech/' +
											match.params.id
								) ? (
									getMeetaTags(
										contentDirectSpeech.articles.filter(
											item =>
												item.preview.link ===
												'/direct_speech/' +
													match.params.id
										)[0]?.preview
									)
								) : (
									<Redirect
										to={`/${lng}/direct_speech`}
									/>
								)}

								<ArticlePage
									content={
										contentDirectSpeech.articles.filter(
											item =>
												item.preview.link ===
												'/direct_speech/' +
													match.params.id
										)[0].content
									}
									mode={media_mode}
								/>
								<Footer
									setIndex={setIndex}
									content={footer}
									mode={media_mode}
								/>
							</>
						)}
					/>
					{/* <Route>
						<Redirect to={`/${lng}/`} />
					</Route> */}
				</>
			) : (
				<>
					<Header
						menuButtons={header}
						pathname={location.pathname}
						mode={media_mode}
						width={mode2.px}
						setIndex={setIndex}
						withPlaceholder
					/>
					<MobileLanscapePlaceholder
						content={mobileLandscapePlaceholder}
						t={t}
					/>
				</>
			)}
		</div>
	)
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    mode: getWindowMode(),
    isMobileLandscape: isMobileLandscape(),
  })

  let inh = window.window.innerHeight / 665;
  let inhm=window.window.innerHeight / 812;
  document.documentElement.style.setProperty("--inh", `${inh}`);
  document.documentElement.style.setProperty("--inhm", `${inhm}`);

  function isMobileLandscape() {
    if (!window) return false

    return window?.screen?.orientation?.angle !== 0 && window?.innerWidth < 1000
  }

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        mode: getWindowMode(),
        isMobileLandscape: isMobileLandscape(),
      })
    }

    // Add event listener

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, []) // Empty array ensures that effect is only run on mount

  return windowSize
}

function useWindowSizev2() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowDimension, setWindowDimension] = useState(getWindowSize)

  useEffect(() => {
    // Handler to call on window resize
    function handleResize2() {
      // alert('trigger')
      // Set window width/height to state
      setWindowDimension(getWindowSize)
    }

    // Add event listener
    window.addEventListener("resize", handleResize2)

    // Call handler right away so state gets updated with initial window size
    handleResize2()
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize2)
    }
  }, []) // Empty array ensures that effect is only run on mount

  return windowDimension
}

export default translate("translation")(App);
