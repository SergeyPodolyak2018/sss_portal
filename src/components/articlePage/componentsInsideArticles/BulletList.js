import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import styles from '../ArticlePage.module.css'

class BulletList extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		return (
			<div
				className={`${styles.text} ${styles.bulletList}`}
				style={{
					marginBottom:
						this.props.content.marginBottom,
				}}
			>
				{this.props.content.intro && (
					<p
						className={styles.bulletListIntro}
						dangerouslySetInnerHTML={{
							__html: this.props.content.intro,
						}}
					></p>
				)}
				<ul>
					{this.props.content.texts.map(
						(item, key) => (
							<li
								key={key}
								dangerouslySetInnerHTML={{
									__html: item,
								}}
							></li>
						)
					)}
				</ul>
			</div>
		)
	}
}

export default withNamespaces()(BulletList)
