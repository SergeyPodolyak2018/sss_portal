import React, { Component } from "react"
import { withNamespaces } from "react-i18next"
import styles from "./DirectSpeech.module.scss"
import Article from "../article/Article"

// import TitleColletion from './componentsInSideNewArticles/TitleColletion';
// import NewArticle from "./Article"

class CollectionArticles extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { t, mode } = this.props
    const articleClasses = {
      wrapperClass: styles.wrapperClass,
      txtClass: styles.txtClass,
      imgClass: styles.imgClass,
      articleClass: styles.articleClass,
      headerClass: styles.headerClass,
      dateClass: styles.dateClass,
      readClass: styles.readClass,
      // descriptionClass: styles.descriptionClass,
    }


    return (
			<>
				<div className={styles.titleWrapper}>
					<div className={styles.title}>
						{t(this.props.content.title)}
					</div>
				</div>

				<div className={styles.mainWrapper}>
					<div className={styles.description}>
						{t(this.props.content.description)}
					</div>

					{[...this.props.content.articles]
						.reverse()
						.map((item, key) => {
							if (
								key <
									this.props.content.limit[
										this.props.mode
									] &&
								item.preview.shown
							) { 

								return (
									<Article
										content={item.preview}
										key={key}
										mode={this.props.mode}
										classes={articleClasses}
										read={key === 0}
									/>
								)
							}
						})}
				</div>
			</>
		)
  }
}

export default withNamespaces()(CollectionArticles)
