import React, { Component } from "react"
import getLng from '../../utils/getLanguage'

// import ArticleDate from "./componentsInsideArticles/ArticleDate"
// import BigImage from "./componentsInsideArticles/BigImage"
// import NormalImage from "./componentsInsideArticles/NormalImage"
// import SliderImage from "./componentsInsideArticles/SliderImage"
// import Text from "./componentsInsideArticles/Text"
// import Title from "./componentsInsideArticles/Title"
// import TitleCenter from "./componentsInsideArticles/TitleCenter"
import styles from "./ArticlePage.module.css"
import { withNamespaces } from "react-i18next"

import {
	// @index(['./componentsInsideArticles/*.js','!./componentsInsideArticles/index.js'], f => `${f.name},`)
	BigImage,
	BulletList,
	BulletListHeading,
	Date,
	Heading,
	NormalImage,
	Slider,
	Text,
	Title,
	TitleCenter,
	UnsignedImage,
	// @endindex
} from './componentsInsideArticles'

const itemMap = {
	// @index(['./componentsInsideArticles/*.js','!./componentsInsideArticles/index.js'],(f,_) => `${_.camelCase(f.name)}: ${f.name},`)
	bigImage: BigImage,
	bulletList: BulletList,
	bulletListHeading: BulletListHeading,
	date: Date,
	heading: Heading,
	normalImage: NormalImage,
	slider: Slider,
	text: Text,
	title: Title,
	titleCenter: TitleCenter,
	unsignedImage: UnsignedImage,
	// @endindex
}

class ArticlePage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
	  return (
		
      <div className={styles.main}>
        <div className={styles.contentWrapper}>
          {this.props.content.map((sect,index) => {
			
            let Comp = itemMap[sect.type]
            return (
							<Comp
								key={index}
								content={sect}
								mode={this.props.mode}
								t={this.props.t}
								getLng={getLng}
							/>
						)
          })}
        </div>
      </div>
    )
  }
}

export default withNamespaces()(ArticlePage)
