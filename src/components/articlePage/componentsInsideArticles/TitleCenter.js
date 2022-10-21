import React, { Component } from "react"
import { withNamespaces } from "react-i18next"
import styles from "../ArticlePage.module.css"

class TitleCenter extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
			<div>
				<h2 className={styles.titleCenter}>
					{this.props.content.text}
				</h2>
			</div>
		)
  }
}

export default withNamespaces()(TitleCenter)
