import React, { Component } from 'react'

import styles from '../ArticlePage.module.css'
import { withNamespaces } from 'react-i18next'

class UnsignedImage extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {}

	componentWillUnmount() {}

	getImg(img) {
		let source
		switch (this.props.mode) {
			case 'desktop':
				source = img.desktop
				break
			case 'tablet':
				source = img.tablet
				break
			case 'mobile':
				source = img.mobile
		}
		return (
			<img
				alt={`${this.props.content.alt}`}
				src={source}
			/>
		)
	}

	render() {
		return (
			<div className={styles.normalImage}>
				{this.getImg(this.props.content.img)}
			</div>
		)
	}
}

export default withNamespaces()(UnsignedImage)
