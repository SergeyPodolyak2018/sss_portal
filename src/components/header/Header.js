import { Link, withRouter } from "react-router-dom"
import React, { Component } from "react"

import { ReactComponent as ArroBlack } from "./ArrowBlack.svg"
import { ReactComponent as ArrowWhite } from "./ArrowWhite.svg"
import { ReactComponent as Logo } from "./logo.svg"
import { ReactComponent as LogoM } from "./logo_mobile.svg"
import { ReactComponent as LogoT } from "./logo_tablet.svg"
import getLng from "../../utils/getLanguage"
import i18n from "../../i18n"
import styles from "./Header.module.css"
import urlCompare from "../../utils/urlCompare"
import { withNamespaces } from "react-i18next"

class Header extends Component {
	constructor(props) {
		super(props)
		const { t } = props
		this.scrollState = {
			previous: 0,
			current: 0,
		}

		this.wrapperRef = React.createRef()

		this.state = {
			menuOpen: false,
			headerFixed: false,
			lng: getLng(),
			lngMenu: false,
			backgroundHeader: false,
		};
		this.iosClass=this.isIos();
		this.toglemenu = this.toglemenu.bind(this)
		this.togleLanguage =
			this.togleLanguage.bind(this)
		this.changeLanguage =
			this.changeLanguage.bind(this)
		this.scrollToTop = this.scrollToTop.bind(this)
		this.handleClickOutside =
			this.handleClickOutside.bind(this)
		this.scrollHandler = e => {
			this.scrollState.current = window.scrollY
			// if(this.scrollState.current>this.scrollState.previous){
			//     if(this.state.headerFixed){
			//         this.toglHeader(false);
			//     }
			// }else{}
			if (
				!this.state.headerFixed &&
				this.scrollState.current > 0
			) {
				this.toglHeader(true)
			} else if (this.scrollState.current === 0) {
				if (this.state.headerFixed) {
					this.toglHeader(false)
				}
			}

			this.scrollState.previous =
				this.scrollState.current
		}
	}
	componentDidMount() {
		document.addEventListener(
			'scroll',
			this.scrollHandler
		)
		document.addEventListener(
			'click',
			this.handleClickOutside
		)

	}
	scrollToTop() {
		if (this.props.mode !== 'desktop') {
			this.setState({
				menuOpen: false,
			})
		}
		window.scrollTo(0, 0)
	}
	componentWillUnmount() {
		document.removeEventListener(
			'scroll',
			this.scrollHandler
		)
		document.removeEventListener(
			'click',
			this.handleClickOutside
		)
	}
	isIos(){
		/*let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
		if (isIOS) {
			return styles.Ios
		} else {
			return ''
		}*/
		return ''
	}
	getButtons(item, key) {
		//urlCompare(this.props.pathname,item.url);
		return (
			<div
				key={key}
				className={`${styles.links_button} 
        ${
					this.props.pathname.includes(item.url)
						? styles.active_linck
						: ''
					// urlCompare(
					// 	this.props.pathname,
					// 	item.url
					// )
					// 	? styles.active_linck
					// 	: ''
				}
        ${
					!urlCompare(this.props.pathname, '/') &&
					this.props.mode != 'mobile'
						? styles.links_inactive
						: ''
				}

        `}
			>
				<Link
					to={
						'/' + this.state.lng + '/' + item.url
					}
					onClick={this.scrollToTop}
				>
					{this.props.t(item.name)}
				</Link>
			</div>
		)
	}

	handleClickOutside(event) {
		if (
			this.wrapperRef &&
			!this.wrapperRef.current.contains(
				event.target
			)
		) {
			this.setState({
				menuOpen: false,
			})
		}
	}

	toglemenu() {
		this.setState({
			menuOpen: !this.state.menuOpen,
		})
	}

	togleLanguage() {
		if (this.state.lng === 'ru') {
			this.changeLanguage('en')
		} else {
			this.changeLanguage('ru')
		}
		this.toglemenu()
	}
	toglHeader(data) {
		if (this.props.mode !== 'mobile') {
			this.setState({
				headerFixed: data,
			})
		}
	}
	changeLanguage(lang) {

			this.props.history.replace({
				pathname:
					'/' +
					lang +
					'/' +
					this.props.history.location.pathname
						.split('/')
						.splice(
							2,
							this.props.history.location.pathname
								.length
						)
						.join('/'),
				// state: null,
			})

		this.setState({
			lng: lang,
		})
	}

	getLangMenu() {
		if (this.state.lng === 'ru') {
			return 'EN'
		}
		return 'RU'
	}

	render() {
		let languageClose
		let languageOpen
		let logo
		const displayLang = this.getLangMenu()

		if (
			this.props.width > 599 ||
			this.props.withPlaceholder
		) {
			languageClose = (
				<div className={styles.langWrapper}>
					<div
						className={styles.lang}
						onClick={_ => {
							this.togleLanguage()
						}}
					>
						{displayLang}
					</div>
					<div className={styles.arrow_wrapper}>
						<ArrowWhite />
					</div>
				</div>
			)
		} else if (
			this.state.menuOpen &&
			this.props.width < 600
		) {
			languageOpen = (
				<div className={styles.langWrapper}>
					<div
						className={`${styles.langInMenu} ${styles.lang}`}
						onClick={this.togleLanguage}
					>
						{displayLang}
					</div>
					<div className={styles.arrow_wrapper}>
						<ArrowWhite />
					</div>
				</div>
			)
		}

		return (
			<div
				ref={this.wrapperRef}
				className={`
        ${
					this.props.withPlaceholder &&
					styles.withPlaceholder
				}
        ${styles.header} 
        ${
					this.state.headerFixed
						? styles.headerScrollUp
						: styles.headerNormal
				} 
        ${
					this.props.location.pathname.includes(
						'article'
					)
						? styles.backgroundHeaderUPD
						: ''
				}${this.iosClass}`}
				// style={this.state.backgroundHeader ? {background: '#2E3237'} : {background: 'none'}}
				// {this.state.backgroundHeader ? (style={{background: '#2E3237'}}) : false}
			>
				<div className={styles.header_wrapper}>
					<div
						className={styles.logo}
						onClick={() => {
							this.props.setIndex(0)
							this.scrollToTop()
						}}
					>
						<Link to={'/' + this.state.lng + '/'}>
							{this.props.withPlaceholder ? (
								<LogoM
									alt={`${this.props.t(
										'CommonHeaderLogo'
									)}`}
								/>
							) : this.props.mode ===
							  'desktop' ? (
								<Logo
									alt={`${this.props.t(
										'CommonHeaderLogo'
									)}`}
								/>
							) : this.props.mode === 'tablet' ? (
								<LogoT
									alt={`${this.props.t(
										'CommonHeaderLogo'
									)}`}
								/>
							) : (
								<LogoM
									alt={`${this.props.t(
										'CommonHeaderLogo'
									)}`}
								/>
							)}
						</Link>
					</div>
					<div
						className={`${styles.links} ${
							this.state.menuOpen
								? styles.open_links
								: ''
						}`}
					>
						{!this.props.withPlaceholder &&
							this.props.menuButtons.map(
								(item, key) => {
									return this.getButtons(
										item,
										key
									)
								}
							)}
						{languageOpen}
					</div>
					{languageClose}

					{this.props.width < 600 &&
					!this.props.withPlaceholder ? (
						<div
							className={`${styles.burger} ${
								this.state.menuOpen
									? styles.close
									: ''
							}`}
							onClick={this.toglemenu}
						>
							<div
								className={`${styles.middle} ${
									this.state.menuOpen
										? styles.close
										: ''
								}`}
							></div>
						</div>
					) : (
						''
					)}
					<div
						className={`${
							styles.header_baground
						} ${
							this.state.menuOpen
								? styles.baground_open
								: ''
						}`}
					></div>
				</div>
			</div>
		)
	}
}

export default withRouter(withNamespaces()(Header))
