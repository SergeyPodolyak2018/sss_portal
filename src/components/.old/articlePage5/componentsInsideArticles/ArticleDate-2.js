import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from '../ArticlePage.module.css';
import arrowBack from './ArrowLeftBack.svg';

class ArticleDate extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <div className={styles.linkAllArticle}>
          {this.props.t(this.props.content.linkAllArticle)}
          <img className={styles.arrowBack} src={arrowBack} />
        </div>
        <span className={styles.articleDate}>
          {this.props.t(this.props.content.date)}
        </span>
      </div>
    )
  }
}

export default withNamespaces()(ArticleDate);
