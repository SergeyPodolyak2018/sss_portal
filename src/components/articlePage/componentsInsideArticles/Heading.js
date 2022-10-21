import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import styles from '../ArticlePage.module.css'

class Heading extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		return (
			<div>
				<p className={`${styles.heading}`}>
					{`${this.props.content.text}`}
				</p>
			</div>
		)
	}
}

export default withNamespaces()(Heading)
