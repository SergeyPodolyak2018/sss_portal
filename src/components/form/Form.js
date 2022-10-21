import React, { Component } from 'react';

import LinkButton from "../linkButton/LinkButton";
import { ReactComponent as Search } from "./search.svg"
import { ReactComponent as StarBiege } from "./Star4.svg"
import { ReactComponent as StarGreay } from "./Star3.svg"
import { ReactComponent as StarOrange } from "./Star2.svg"
import { ReactComponent as StarRed } from "./Star1.svg"
import _ from 'lodash';
import country from './country.json'
import styles from './Form.module.css';
import { withNamespaces } from 'react-i18next';

class Form extends Component {
  constructor(props) {
    super(props)
    this.selectName='';
    this.selectName2='';
    this.state = { opened: false, valid: true }
    for (let i in props.content) {
      if (props.content[i].type === "select") {
        this.state[props.content[i].name] = {
          value: "",
          preview: "",
          active: false,
          valid: true,
          placeholder: props.content[i].placeholder,
        };
        this.selectName=props.content[i].name;
      }
      if (props.content[i].type === "phone") {
        this.state[props.content[i].name] = {
          value: "",
          code: props.content[i].startCode,
          countrySearch: false,
          preview: "",
          active: false,
          valid: true,
          placeholder: props.content[i].placeholder,
          search: "",
        }
        this.selectName2=props.content[i].name;
      } else {
        this.state[props.content[i].name] = {
          value: "",
          active: false,
          valid: true,
          placeholder: props.content[i].placeholder,
        }
      }
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeFocus = this.changeFocus.bind(this);
    this.changeBlure = this.changeBlure.bind(this);
    this.searchCountry = this.searchCountry.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
    this.closeSelect=this.closeSelect.bind(this);
    this.setShowDescription=this.props.setShowDescription.bind(this);
  }

  componentDidMount() {
    if(this.props.onRef){
      this.props.onRef(this);
    }
  }

  componentWillUnmount() {}

  onSubmit(event) {
    this.setState({ valid: true })
    //Check for empty objects
    let errorCount = 0;
    for (let i in this.state) {
      if (i === "opened" || i === "valid") continue;

      let check = false;
      let tempObj = _.find(this.props.content, { name: i });
      if (!tempObj.hasOwnProperty("relatedName")) {
        check = true
      } else if (
        this.state[tempObj.relatedName].value !== tempObj.relatedValue
      ) {
        check = false
      } else {
        check = true
      }
      if (check) {
        if (
          (tempObj.required && !this.state[i].value) ||
          !this.state[i].valid
        ) {
          errorCount++;
          this.setState((prevState) => ({
            [i]: {
              ...prevState[i],
              valid: false,
              placeholder: tempObj.errorPlaceholder,
            },
          }))
        }
      }
    }
    if (errorCount === 0) {
      let newObject = {};
      for (let i in this.state) {
        if (i === "opened" || i === "valid") continue;

        let tempObj = _.find(this.props.content, { name: i });
        if (
          !tempObj.hasOwnProperty("relatedName") ||
          (tempObj.hasOwnProperty("relatedName") &&
            this.state[tempObj.relatedName].value === tempObj.relatedValue)
        ) {
          if (tempObj.type === "phone") {
            newObject[i] =
              this.getDialCode(this.state[i].code) + this.state[i].value;
          } else {
            newObject[i] = this.state[i].value;
          }
        }
      }

      this.props.submit(newObject)
    }

    event.preventDefault()
  }

  handleChange(event, item) {
    let re
    let valid = true
    if (item.hasOwnProperty("pattern") && event.target.value) {
      re = new RegExp(item.pattern, "i")

      valid = re.test(event.target.value)
    }
    if (event.target.hasOwnProperty("preview")) {
      this.setState((prevState) => ({
        [event.target.name]: {
          // object that we want to update
          ...prevState[event.target.name], // keep all other key-value pairs
          value: event.target.value,
          valid: valid,
          preview: event.target.preview, // update the value of specific key
        },
      }))
    } else {
      this.setState(

        (prevState) => ({
            [event.target.name]: {
              // object that we want to update
              ...prevState[event.target.name], // keep all other key-value pairs
              value: event.target.value,
              valid: valid, // update the value of specific key
            },
          }),


      )
    }
  }

  checkForValid(){
    //Check for empty objects
    let errorCount = 0;
    for (let i in this.state) {
      if (i === "opened" || i === "valid") continue;

      let check = false;
      let tempObj = _.find(this.props.content, { name: i });
      if (!tempObj.hasOwnProperty("relatedName")) {
        check = true
      } else if (
          this.state[tempObj.relatedName].value !== tempObj.relatedValue
      ) {
        check = false
      } else {
        check = true
      }
      if (check) {
        if (
            (tempObj.required && !this.state[i].value) ||
            !this.state[i].valid
        ) {
          errorCount++;
        }
      }
    }

    return errorCount>0?false:true;
  }

  getFlags(code) {
    let obj = _.find(country, { code: code });
    return obj.flag
  }
  getDialCode(code) {
    let obj = _.find(country, { code: code });
    return obj.dial_code
  }

  getStar(state) {
    if (!state.valid) this.state.valid = false;

    if (state.valid && !state.active && state.value) {
      return <StarBiege />
    }
    if (state.valid && !state.active) {
      return <StarGreay />
    }
    if (!state.valid && !state.active) {
      return <StarRed />
    }
    if (state.active) {
      return <StarOrange />
    }
  }

  getClassName(state) {

    if (state.valid && !state.active && state.value) {
      return styles.haveValue
    }
    if (state.valid && !state.active && !state.value) {
      return styles.withoutValue
    }
    if (state.active) {
      return styles.active
    }
    if (!state.valid && !state.active) {
      return styles.notValid
    }

  }
  changeFocus(event) {
    this.setState((prevState) => ({
      [event.target.name]: {
        // object that we want to update
        ...prevState[event.target.name], // keep all other key-value pairs
        active: true, // update the value of specific key
      },
    }))
  }
  changeBlure(event) {
    this.setState((prevState) => ({
      [event.target.name]: {
        // object that we want to update
        ...prevState[event.target.name], // keep all other key-value pairs
        active: false, // update the value of specific key
      },
    }))
  }

  searchCountry(name, state) {
    this.setState((prevState) => ({
      [name]: {
        // object that we want to update
        ...prevState[name], // keep all other key-value pairs
        countrySearch: state, // update the value of specific key
      },
    }))
  }

  changeCountry(name, country) {

    this.setState((prevState) => ({
      [name]: {
        // object that we want to update
        ...prevState[name], // keep all other key-value pairs
        code: country,
        // update the value of specific key
      },
    }))
  }
  changeSearch(e, name) {
    this.setState((prevState) => ({
      [name]: {
        // object that we want to update
        ...prevState[name], // keep all other key-value pairs
        search: e.target.value, // update the value of specific key
      },
    }))
  }

  closeSelect(){
    if(this.selectName  && this.state[this.selectName]){
      if(this.state[this.selectName].active){
        this.changeBlure({
          target: { name: this.selectName },
        });
      }
    }
    if(this.selectName2  && this.state[this.selectName2]){
      if(this.state[this.selectName2].countrySearch){
        this.searchCountry(this.selectName2, false)
      }
    }
  }

  getSearchResult(name) {
    let regstring = "^" + this.state[name].search + ".*"
    let reg = new RegExp(regstring, 'i')
    let temparr = _.filter(country, function (o) {
      return reg.test(o.name)
    });
    return temparr.map((item, key) => {
      return (
        <div
          key={key}
          className={styles.search_res_wrapper}
          onClick={() => {
            this.changeCountry(name, item.code);
            this.searchCountry(name, false);
          }}
          onScroll={(e) => {
            e.preventDefault()
          }}>
          <div className={styles.flag}>
            <i>{item.flag}</i>
          </div>
          <div className={styles.search_content}>
            {item.name} {item.dial_code}
          </div>
        </div>
      )
    })
  }

  getFields(item, key) {
    switch (item.type) {
      case "text":
        return (
          <div key={key} className={styles.container}>
            <div className={styles.subcontainer}>
              {item.required ? (
                <span className={styles.star_container}>
                  {this.getStar(this.state[item.name])}
                </span>
              ) : (
                ""
              )}
              {/*<span className={styles.star_container}>{this.getStar(this.state[item.name])}</span>*/}
              <span className={styles.tooltip_text}>
                {this.props.t(item.label)}
              </span>
            </div>

            <input
              className={this.getClassName(this.state[item.name])}
              type="text"
              name={item.name}
              placeholder={this.props.t(this.state[item.name].placeholder)}
              value={this.state[item.name].value}
              onChange={(e) => {
                this.handleChange(e, item)
              }}
              onFocus={this.changeFocus}
              onBlur={this.changeBlure}
            />
          </div>
        )
      case "email":
        return (
          <div key={key} className={styles.container}>
            <div className={styles.subcontainer}>
              {item.required ? (
                <span className={styles.star_container}>
                  {this.getStar(this.state[item.name])}
                </span>
              ) : (
                ""
              )}
              {/*<span className={styles.star_container}>{this.getStar(this.state[item.name])}</span>*/}
              <span className={styles.tooltip_text}>
                {this.props.t(item.label)}
              </span>
            </div>

            <input
              className={this.getClassName(this.state[item.name])}
              type="email"
              name={item.name}
              placeholder={this.props.t(this.state[item.name].placeholder)}
              value={this.state[item.name].value}
              onChange={(e) => {
                this.handleChange(e, item)
              }}
              onFocus={this.changeFocus}
              onBlur={this.changeBlure}
            />
          </div>
        )
      case "select":
        return (
          <div key={key} className={styles.container_select}>
            <div className={styles.subcontainer}>
              {item.required ? (
                <span className={styles.star_container}>
                  {this.getStar(this.state[item.name])}
                </span>
              ) : (
                ""
              )}
              <span className={styles.tooltip_text}>
                {this.props.t(item.label)}
              </span>
            </div>
            <div
              className={styles.select_wrapper}

              onClick={() => {

                if (!this.state.opened) {
                  this.changeFocus({
                    target: { name: item.name },
                  })
                }
                this.setState({
                  opened: !this.state.opened,
                })
                // this.state.opened = !this.state.opened
              }}>
              {!this.state[item.name].active ? (
                <div className={styles.select_init_row}>
                  {this.state[item.name].value
                    ? this.props.t(this.state[item.name].preview)
                    : this.props.t(this.state[item.name].placeholder)}
                  <div
                    className={styles.select_close_button}
                    onClick={() => {

                      this.changeFocus({ target: { name: item.name } })
                    }}></div>
                </div>
              ) : (
                <div className={styles.select_open_list}>
                  {item.option.map((itemint, key) => {
                    if (itemint.disabled) {
                      return (
                        <div key={key} className={styles.select_first}>
                          {this.props.t(itemint.preview)}
                          <div className={styles.select_open_button}></div>
                        </div>
                      )
                    }
                    return (
                      <div
                        key={key}
                        className={styles.select_regular}
                        value={itemint.value}
                        onClick={() => {
                          if (
                            itemint.preview === "option5" &&
                            this.props.mode === "mobile"
                          ) {
                            this.props.setShowDescription(false)
                          } else {
                            this.props.setShowDescription(true)
                          }

                          this.handleChange(
                            {
                              target: {
                                name: item.name,
                                value: itemint.value,
                                preview: itemint.preview,
                              },
                            },
                            item
                          )
                          this.changeBlure({
                            target: { name: item.name },
                          })
                        }}>
                        {this.props.t(itemint.preview)}
                      </div>
                    )
                  })}
                  {/*<div className={styles.select_open_button} onClick={()=>{this.changeBlure({target:{name:item.name}})}}></div>*/}
                </div>
              )}
            </div>

            {/*<input className={this.getClassName(this.state[item.name])} type="email" name={item.name} placeholder={this.props.t(this.state[item.name].placeholder)} value={this.state[item.name].value} onChange={(e)=>{this.handleChange(e,item)}} onFocus={this.changeFocus} onBlur={this.changeBlure}/>
             */}
          </div>
        )
      case "textarea":
        if (this.state[item.relatedName].value === item.relatedValue) {
          return (
            <div key={key} className={styles.container}>
              <div className={styles.subcontainer}>
                {item.required ? (
                  <span className={styles.star_container}>
                    {this.getStar(this.state[item.name])}
                  </span>
                ) : (
                  ""
                )}
                {/*<span className={styles.star_container}>{this.getStar(this.state[item.name])}</span>*/}
                <span className={styles.tooltip_text}>
                  {this.props.t(item.label)}
                </span>
              </div>
              {!this.state[item.name].active ? (
                <input
                  className={this.getClassName(this.state[item.name])}
                  type="text"
                  readOnly="readonly"
                  wrap="soft"
                  cols="33"
                  rows="3"
                  name={item.name}
                  placeholder={this.props.t(this.state[item.name].placeholder)}
                  value={this.state[item.name].value}
                  onFocus={this.changeFocus}
                />
              ) : (
                <textarea
                  className={this.getClassName(this.state[item.name])}
                  wrap="soft"
                  cols="33"
                  rows="3"
                  name={item.name}
                  placeholder={this.props.t(this.state[item.name].placeholder)}
                  value={this.state[item.name].value}
                  onChange={(e) => {
                    this.handleChange(e, item)
                  }}
                  onFocus={this.changeFocus}
                  onBlur={this.changeBlure}
                />
              )}
            </div>
          )
        } else {
          return ""
        }
      case "phone":
        return (
          <div key={key} className={styles.container}>
            <div className={styles.subcontainer}>
              {item.required ? (
                <span className={styles.star_container}>
                  {this.getStar(this.state[item.name])}
                </span>
              ) : (
                <span className={styles.star_container}></span>
              )}
              {/*<span className={styles.star_container}>{this.getStar(this.state[item.name])}</span>*/}
              <span className={styles.tooltip_text}>
                {this.props.t(item.label)}
              </span>
            </div>

            <div className={styles.select_wrapper_phone}>
              {this.state[item.name].countrySearch ? (
                <div className={styles.country_search_wrapper}>
                  <div className={styles.search_field} onClick={(e) => {
                    e.stopPropagation()
                  }}>
                    <div className={styles.search_icon}>
                      <Search />
                    </div>
                    <input
                      className={styles.search_input}
                      type="phone"
                      value={this.state[item.name].search}
                      placeholder={this.props.t(
                        this.state[item.name].placeholder
                      )}

                      onChange={(e) => {
                        this.changeSearch(e, item.name)
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    />
                  </div>
                  <div
                    className={styles.search_result}
                    onWheel={(e) => {
                      e.stopPropagation()
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation()
                    }}
                    onTouchMove={(e) => {
                      e.stopPropagation()
                    }}>
                    {this.getSearchResult(item.name)}
                  </div>
                </div>
              ) : (
                <div
                  className={`${styles.select_wrapper_phone} ${
                    this.state[item.name].active
                      ? styles.select_wrapper_phone_active
                      : ""
                  }`}>
                  <div
                    className={styles.flag_wrapper}
                    onClick={() => {
                      this.searchCountry(item.name, true)
                    }}>
                    <div className={styles.flag}>
                      {this.getFlags(this.state[item.name].code)}
                    </div>
                    <div className={styles.select_close_button_flag}></div>
                  </div>
                  <span
                    className={`${styles.code_dial} ${
                      this.state[item.name].active
                        ? styles.code_dial_active
                        : ""
                    }`}>
                    {this.getDialCode(this.state[item.name].code)}
                  </span>

                  <input
                    className={this.getClassName(this.state[item.name])}
                    type="tel"
                    maxLength={item.maxlength}
                    name={item.name}
                    value={this.state[item.name].value}
                    onChange={(e) => {
                      this.handleChange(e, item)
                    }}
                    onFocus={this.changeFocus}
                    onBlur={this.changeBlure}
                  />
                </div>
              )}
            </div>
          </div>
        )
    }
  }

  render() {
    this.state.valid = true;
    return (
      <div className={styles.wrapper}>
        {/*<form onSubmit={this.onSubmit} onChange={this.onSubmit}>*/}
        <form onSubmit={this.onSubmit}>
          {this.props.content.map((item, key) => {
            return this.getFields(item, key)
          })}
          <div className={styles.buttonWrapper}>
            <LinkButton
              onClick={this.onSubmit}
              link={"#"}
              linkText={this.props.button}
              disabled={!this.state.valid}
              mode={""}
            />
            {!this.state.valid && (
              <span className={styles.buttonHint}>
                {this.props.t(this.props.buttonHint1)}
                <StarBiege className={styles.starInText} />
                {this.props.t(this.props.buttonHint2)}
              </span>
            )}
          </div>
        </form>
      </div>
    )
  }
}

export default withNamespaces()(Form);
