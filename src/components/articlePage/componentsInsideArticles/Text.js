import React, { Component } from "react"
import { withNamespaces } from "react-i18next"
import styles from "../ArticlePage.module.css"

class Text extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
			<div
				className={styles.text}
				style={{
					marginBottom:
						this.props.content.marginBottom,
				}}
				dangerouslySetInnerHTML={{
					__html: this.props.content.text,
				}}
			>
				{/* {this.props.content.text} */}
			</div>
		)
  }
}

export default withNamespaces()(Text)
