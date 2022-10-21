import React, { Component } from 'react';
import {Link,withRouter} from "react-router-dom";
import styles from './FormWrapperProjects_conv.module.css';
import { withNamespaces } from 'react-i18next';
import Form from '../form/Form';
import emailSettings from '../../data/emailSettings.js'
import emailjs from 'emailjs-com';
import prepareMessage from '../../utils/prepareMessage'



class FormWrapperProjects extends Component {
  constructor(props) {
    super(props)
    const { t } = props
    this.state = {
      formSended: false,
      inView: false,
      showDescription: true,
    }
    this.interval = 0
    this.wrapRef = React.createRef()
    this.submitForm = this.submitForm.bind(this)
    this.clickOnMainWrapper = this.clickOnMainWrapper.bind(this)
    this.setShowDescription = this.setShowDescription.bind(this)
    this.child = null
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.wrapRef.current) {
        if (this.isInView(this.wrapRef.current)) {
          this.setState({ inView: true })
        } else {
          this.setState({ inView: false })
        }
      }
    }, 500)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  isInView(el) {
    let box = el.getBoundingClientRect()
    return box.top < window.innerHeight && box.bottom >= 0
  }

  submitForm(object) {
    const templateParams = {
      target_email:emailSettings.target_email,
      name: object.name,
      message: prepareMessage(object,this.props.content.form,this.props.t)
    };

    emailjs.send(emailSettings.serviceID,emailSettings.templateID, templateParams,emailSettings.userID)
        .then((response) => {
          console.log(templateParams);
          console.log('SUCCESS!', response.status, response.text);
          this.setState({ formSended: true })
        }, (err) => {
          console.log('FAILED...', err);
        });
    /*const requestOptions = {
      method: "POST",
      headers: sendgrid.headers,
      body: JSON.stringify(sendgrid.data),
    }
    fetch(sendgrid.url, requestOptions)
      .then((response) => {
        response.json()
      })
      .then((data) => {
        this.setState({ formSended: true })
      })
      .catch(function (res) {
        console.log(res)
      })*/
  }

  clickOnMainWrapper() {
    this.child.closeSelect()
  }
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

    return source /*<img className={styles.image} src={source} />*/
  }
  setShowDescription(set) {
    this.setState((state) => ({ ...state, showDescription: set }))
  }


    render() {


    return (
      <div
        className={styles.wrapper}
        ref={this.wrapRef}
        style={
          this.state.inView
            ? { backgroundColor: "rgba(46, 50, 55, 0)" }
            : { backgroundColor: "rgba(255, 255, 255, 1)" }
        }
        onClick={this.clickOnMainWrapper}>
        {!this.state.formSended ? (
          <div className={styles.header_wrapper}>
            <div className={styles.header}>
              {this.props.t(this.props.content.header)}
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.formSended ? (
          <div className={styles.formSended_wrapper}>
            <div className={styles.formSended}>
              {this.props.t(this.props.content.formSended)}
            </div>
          </div>
        ) : (
          <div className={styles.content_wrapper}>
            {this.state.showDescription && (
              <div className={styles.text_wrapper}>
                <div className={styles.body}>
                  {this.props.t(this.props.content.body)}
                </div>
              </div>
            )}

            <div
              className={styles.form_wrapper}
              style={this.state.inView ? { opacity: "1" } : { opacity: "0" }}>
              <Form
                onRef={(ref) => (this.child = ref)}
                submit={this.submitForm}
                content={this.props.content.form}
                button={this.props.content.button}
                buttonHint1={this.props.content.fieldsRequired1}
                buttonHint2={this.props.content.fieldsRequired2}
                setShowDescription={this.setShowDescription}
                mode={this.props.mode}
              />
            </div>
          </div>
        )}
        {this.state.formSended ? (
          <div
            className={`${styles.img_wrapper} ${
              this.state.formSended ? styles.img_wrapper_show : ""
            }`}
            style={{
              backgroundImage: `url("${this.getImg(this.props.content.img)}")`,
            }}>
            {/*{this.getImg(this.props.content.img)}*/}
          </div>
        ) : (
          ""
        )}
      </div>
    )
  }
}

export default withRouter(withNamespaces()(FormWrapperProjects));
