import React, { Component } from "react"

import { Link } from 'react-router-dom'
import getLng from '../../utils/getLanguage'
import styles from "./Article.module.css"
import { withNamespaces } from 'react-i18next'

//+history

class Article extends Component {
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
			<Link
				className={this.props.classes.imgClass}
				to={
					this.props.content.link
						? `/${getLng()}${
								this.props.content.link
						  }`
						: '#'
				}
			>
				<img
					alt={`${this.props.content.alt}`}
					className={` ${styles.imgClass} ${this.props.classes.imgClass}`}
					src={source}
				/>
			</Link>
		)
  }

  render() {
    const {
      wrapperClass,
      txtClass,
      headerClass,
      articleClass,
      dateClass,
      readClass,
    } = this.props.classes
    const t = this.props.t




    return (
			<div
				className={wrapperClass || styles.wrapper}
			>
				{this.getImg(this.props.content.img)}

				<div
					className={
						txtClass || styles.text_wrapper
					}
				>
					<Link
						className={headerClass}
						to={
							this.props.content.link
								? `/${getLng()}${
										this.props.content.link
								  }`
								: `/${getLng()}/`
						}
					>
						{this.props.content.header}
					</Link>

					<div
						className={
							articleClass || styles.content
						}
					>
						{this.props.content.body}
					</div>
					<div
						className={dateClass || styles.date}
					>
						{this.props.content.date}
					</div>
					{this.props.read &&
						document.body.offsetWidth >= 900 && (
							<Link
								to={
									// this.props.content.link +
									`/${getLng()}${
										this.props.content.link
									}`
								}
								className={readClass}
							>
								{this.props.content.linkRead}
							</Link>
						)}
				</div>
			</div>
		)
  }
}

export default withNamespaces()(Article)
