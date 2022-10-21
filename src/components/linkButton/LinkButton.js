import React, { Component } from "react"
import styles from "./LinkButton.module.css"
import { withNamespaces } from "react-i18next"
import { Link } from "react-router-dom"
import getLng from "../../utils/getLanguage"
// import { ReactComponent as ArrowWhite } from "./arrowWhite.svg"
// import { ReactComponent as ArrowYellow } from "./arrowYellow.svg"
// import { ReactComponent as ArrowBlack } from "./arrowBlack.svg"

class LinkButton extends Component {
  // Requires mode prop
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Link
        className={`${styles.link} 
        ${this.props.underline && styles.linkUnderline} 
        ${this.props.disabled && styles.disabled} 
        ${this.props.className}`}
        to={this.props.link}
        onClick={this.props.onClick}>
        {this.props.t(this.props.linkText)}
      </Link>
    )
  }
}

export default withNamespaces()(LinkButton)
