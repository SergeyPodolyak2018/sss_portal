import React, { Component } from "react"

import styles from '../ArticlePage.module.css'
import { withNamespaces } from 'react-i18next'

class BigImage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  componentWillUnmount() {}

  getImg(img) {
    let source
    switch (this.props.mode) {
      case "desktop":
        source = img.desktop
        break
      case "tablet":
        source = img.tablet
        break
      case "mobile":
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
			<div className={styles.bigImage}>
				{this.getImg(this.props.content.img)}
				<p>{this.props.content.description}</p>
			</div>
		)
  }
}

export default withNamespaces()(BigImage)
