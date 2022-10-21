import React, { Component } from 'react';
import {Link,withRouter} from "react-router-dom";
import styles from './MainWrapper.module.css';
import { withNamespaces } from 'react-i18next';
import Author from '../author/Author';
import AuthorActions from '../authorActions/AuthorActions';
import ArticlesWrapper from '../articlesWrapper/ArticlesWrapper'
import FormWrapper from '../formWrapper/FormWrapper'


const swipeTimeout=150;
const scrollDiscret=50;


class MainWrapper extends Component {
  constructor(props) {
    super(props)

    this._timeout = null
    this.scrollStatus = "scroll stopped";
    this.handleScrollUp = this.handleScrollUp.bind(this)
    this.handleScrollDown = this.handleScrollDown.bind(this)
    this.scroller = this.scroller.bind(this)
    this.swiper = this.swiper.bind(this)
    // this.setIndex = this.props.index.setIndex.bind(this)
  }

  componentDidMount() {

  }

  /*handleScrollUp() {
    if (this._timeout) {
      //if there is already a timeout in process cancel it
      clearTimeout(this._timeout)
    }
    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.scrollStatus = "scroll stopped";
      this.changeActive(
        this.props.index.index - 1 >= 0
          ? this.props.index.index - 1
          : this.props.content.length - 1
      )
    }, swipeTimeout);
    if (this.scrollStatus !== "scrolling") {
      this.scrollStatus = "scrolling";
    }
  }
*/
  handleScrollUp() {

    if(this.scrollStatus === "scroll stopped"){
      this.changeActive(
          this.props.index.index - 1 >= 0
              ? this.props.index.index - 1
              : this.props.content.length - 1
      )
      this.scrollStatus = "scrolling";
    }
    if (this._timeout) {
      //if there is already a timeout in process cancel it
      clearTimeout(this._timeout)
    }
    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.scrollStatus = "scroll stopped";
    }, swipeTimeout);
    /*if (this.scrollStatus !== "scrolling") {
      this.scrollStatus = "scrolling";
    }*/
  }

  /*handleScrollDown() {
    if (this._timeout) {
      //if there is already a timeout in process cancel it
      clearTimeout(this._timeout)
    }
    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.scrollStatus = "scroll stopped";
      this.changeActive(
        this.props.index.index + 1 <= this.props.content.length - 1
          ? this.props.index.index + 1
          : 0
      )
    }, swipeTimeout);
    if (this.scrollStatus !== "scrolling") {
      this.scrollStatus = "scrolling";
    }
  }
*/
  handleScrollDown() {
    if(this.scrollStatus === "scroll stopped"){
      this.changeActive(
          this.props.index.index + 1 <= this.props.content.length - 1
              ? this.props.index.index + 1
              : 0
      )
      this.scrollStatus = "scrolling";
    }
    if (this._timeout) {
      //if there is already a timeout in process cancel it
      clearTimeout(this._timeout)
    }
    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.scrollStatus = "scroll stopped";
    }, swipeTimeout);
  }
  changeActive(i) {
    // if (i !== this.props.index.index) {
    // }
    this.props.index.setIndex(i)
  }
  getPagination(amount) {
    const items = []

    for (let i = 0; i < amount; i++) {
      let name = styles.round
      if (i === this.props.index.index) {
        name = styles.round_active
      }
      if (i < this.props.index.index) {
        name = styles.round_past_active
      }
      items.push(
        <div
          key={i}
          className={name}
          onClick={() => {
            this.changeActive(i)
          }}></div>
      )
    }
    return items
  }
  componentFactory(item, key) {
    let tempClass = styles.module_wrapper
    if (key === this.props.index.index) {
      tempClass = styles.module_wrapper_active
    }
    switch (item.type) {
      case "presentation":
        return (
          <div key={key} className={tempClass}>
            <Author mode={this.props.mode} content={item} />
          </div>
        )
      case "content":
        return (
          <div key={key} className={tempClass}>
            <AuthorActions mode={this.props.mode} content={item} />
          </div>
        )
      case "articles":
        return (
          <div key={key} className={tempClass}>
            <ArticlesWrapper
              mode={this.props.mode}
              // content={item}
              content={{ ...item, articles: this.props.articles }}
            />
          </div>
        )
      case "form":
        return (
          <div key={key} className={tempClass}>
            <FormWrapper mode={this.props.mode} content={item} />
          </div>
        )
    }
  }

  scroller(e) {
    if (e.nativeEvent.wheelDelta > scrollDiscret) {
      this.handleScrollUp()
    } else if (e.nativeEvent.wheelDelta < -scrollDiscret) {
      this.handleScrollDown()
    }
  }

  swiper(e, start) {
    if (start) {
      this.setState({
        swipeStart: e.targetTouches?.[0].clientY,
      })
    } else
      this.state.swipeStart - e.targetTouches?.[0].clientY > 0
        ? this.handleScrollDown()
        : this.handleScrollUp()
  }
  render() {
    return (
      <div className={styles.main_wrapper}>
        <div className={styles.pagination_wrapper}>
          {this.getPagination(this.props.content.length)}
        </div>
        <div
          className={styles.content_wrapper}
          onWheel={(e) => {
            this.scroller(e)
          }}
          {...this.swipableUtils}
          onTouchMove={(e) => this.swiper(e)}
          onTouchStart={(e) => this.swiper(e, true)}>
          {this.props.content.map((item, key) => {
            return this.componentFactory(item, key)
          })}
        </div>
      </div>
    )
  }
}

export default withRouter(withNamespaces()(MainWrapper));
