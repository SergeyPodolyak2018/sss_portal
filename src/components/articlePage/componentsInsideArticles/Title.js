import React, { Component } from "react"
import { withNamespaces } from "react-i18next"
import styles from "../ArticlePage.module.css"
import { Link } from 'react-router-dom'
import arrowBack from './ArrowLeftBack.svg'

class Title extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
			<div className={styles.titleWrapper}>
				<div
					className={styles.containerLinkArticles}
				>
					<Link
						to={`/${this.props.getLng()}/direct_speech`}
						className={styles.linkAllArticles}
					>
						{this.props.t(
							this.props.content.linkAllArticle
						)}
						<img
							className={styles.arrowBack}
							src={arrowBack}
						/>
					</Link>
				</div>
				<span className={styles.articleDate}>
					{this.props.content.date}
				</span>
				<p className={styles.title}>
					{this.props.content.dataTitle}
				</p>
				<p
					className={styles.subTitle}
					dangerouslySetInnerHTML={{
						__html:
							this.props.content.dataSubTitle,
					}}
				></p>
				<div className={styles.borderTitle} />
			</div>
		)
  }
}

export default withNamespaces()(Title)
