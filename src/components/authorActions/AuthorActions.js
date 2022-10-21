import React, { Component } from 'react';

import LinkButton from '../linkButton/LinkButton'
import getLng from '../../utils/getLanguage'
import styles from './AuthorActions.module.css';
import { withNamespaces } from 'react-i18next'

class AuthorActions extends Component {
	constructor(props) {
		super(props)
				this.state = {

					lng: getLng(),
				}
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
				alt={`${this.props.t(
					this.props.content.img_alt
				)}`}
				className={styles.author_image}
				src={source}
			/>
		)
	}

	render() {
		// const language = getLng()

		// console.trace("%c 🎹: AuthorActions -> render -> language ",
		// 	"font-size:16px;background-color:#21a387;color:white;",
		// 	language)

		return (
			<div className={styles.author_wrapper}>
				<div className={styles.text_wrapper}>
					<div className={styles.author_header}>
						{this.props.t(
							this.props.content.header
						)}
					</div>
					{this.props.content.body?
					<div className={styles.author_content}>
						{this.props.t(
							this.props.content.body
						)}
					</div>:''}
					<div
						className={styles.link_button_wrapper}
					>
						<LinkButton
							link={
								'/' +
								getLng() +
								'/' +
								this.props.content.link
							}
							linkText={
								this.props.content.linkText
							}
							mode={this.props.mode}
						/>
					</div>
				</div>

				<div
					className={styles.author_img_wrapper}
				>
					{this.getImg(this.props.content.img)}
				</div>
			</div>
		)
	}
}

export default withNamespaces()(AuthorActions);
