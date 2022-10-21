import React, { Component } from 'react';

import { ReactComponent as Arrow_left } from "./Arrow_left.svg"
import { ReactComponent as Arrow_right } from "./Arrow_right.svg"
import styles from './Biography_conv.module.css'
import { withNamespaces } from 'react-i18next'

const dateMobile = [
  {
    active: {
      date_wrapper: {
        width: "calc(100% - 16px)",
        height: "28.649vw",
        marginLeft: "auto",
        marginTop: "0vw",
      },
      text: {
        left: "6.216vw",
        top: "23.784vw",
        width: "86.216vw",
        height: "33.514vw",
      },
    },
    notActive: {
      date_wrapper: {
        width: "130px",
        height: "78px",
        marginLeft: "16px",
        marginRight: "auto",
        marginTop: "0",
      },
    },
  },
  {
    active: {
      date_wrapper: {
        width: "68.919vw",
        height: "28.649vw",
        marginLeft: "35px",
        marginRight: "auto",
        marginTop: "11.892vw",
      },
      text: {
        left: "22.162vw",
        top: "14.324vw",
        width: "86.757vw",
        height: "14.595vw",
      },
    },
    notActive: {
      date_wrapper: {
        width: "167px",
        height: "78px",
        marginLeft: "28.108vw",
        marginRight: "auto",
        marginTop: "51.892vw",
      },
    },
  },
  {
    active: {
      date_wrapper: {
        width: "68.919vw",
        height: "28.649vw",
        marginLeft: "28.108vw",
        marginRight: "auto",
        marginTop: "8.108vw",
      },
      text: {
        left: "22.162vw",
        top: "14.324vw",
        width: "46.757vw",
        height: "14.595vw",
      },
    },
    notActive: {
      date_wrapper: {
        width: "34.324vw",
        height: "11.892vw",
        marginLeft: "52.162vw",
        marginRight: "auto",
        marginTop: "8.108vw",
      },
    },
  },
  {
    active: {
      date_wrapper: {
        width: "44.865vw",
        height: "28.649vw",
        marginLeft: "auto",
        marginRight: "4.324vw",
        marginTop: "8.108vw",
      },
      text: {
        left: "6.216vw",
        top: "23.784vw",
        width: "38.649vw",
        height: "34.324vw",
      },
    },
    notActive: {
      date_wrapper: {
        width: "15.676vw",
        height: "11.892vw",
        marginLeft: "auto",
        marginRight: "9.459vw",
        marginTop: "8.108vw",
      },
    },
  },
]


class Biography extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
    }
    this.swipeStart = 0
    this.swipe = 0
    this.changeActive = this.changeActive.bind(this)
    this.setIndex = this.setIndex.bind(this)
    this.swiper = this.swiper.bind(this)
  }

  componentDidMount() {}

  componentWillUnmount() {}

  changeActive(e, i) {
    let index = this.state.active + i
    if (
      !(this.state.active + i < 0) &&
      !(this.state.active + i > this.props.content.dates.length - 1)
    ) {
      if (index !== this.state.active) {
        this.setState({ active: index })
      }
    }

    e.stopPropagation()
  }

  setIndex(index) {
    this.setState({ active: index })
  }

  getImg(img) {
    let source
    // switch (this.props.mode) {
    //   case "desktop":
    //     source = img.desktop
    //     break
    //   case "tablet":
    //     source = img.tablet
    //     break
    //   case "mobile":
    //     source = img.mobile
    // }
    { window.innerWidth >= 1199 ?
      source = img.desktop :
      window.innerWidth >= 768 ?
      source = img.tablet :
      source = img.mobile
    }
    return (
			<img
				alt={`${this.props.t(this.props.content.alt)}`}
				className={styles.author_image}
				src={source}
			/>
		)
  }

  getStyles(index, active, className) {
    if (dateMobile?.[index]?.[active]?.[className] && this.props.width < 420) {
      return dateMobile[index][active][className]
    } else {
      return {}
    }
  }

  getPagination(amount) {
    const items = []

    for (let i = 0; i < amount.length; i++) {
      let component
      if (i === this.state.active) {
        component = (
          <div
            key={i}
            className={styles.active_date_wrapper}
            style={this.getStyles(i, "active", "date_wrapper")}>
            <div className={styles.round_active}></div>
            <div className={styles.stick}></div>
            <div className={styles.active_date}>
              {this.props.width < 420
                ? this.props.t(amount[i].dateActiveSmall)
                : this.props.t(amount[i].dateActive)}
            </div>
            <div
              className={styles.text}
              style={this.getStyles(i, "active", "text")}>

              <ul className={styles.lists}>
                <li>{this.props.t(amount[i].text)}</li>
                <li>{this.props.t(amount[i].text1)}</li>
                {this.props.t(amount[i].text2) && <li>{this.props.t(amount[i].text2)}</li>}
                {this.props.t(amount[i].text3) && <li>{this.props.t(amount[i].text3)}</li>}
              </ul>
            </div>
          </div>
        )
      } else {
        component = (
          <div
            key={i}
            className={styles.date_wrapper}
            style={this.getStyles(i, "notActive", "date_wrapper")}
            onClick={() => {
              this.setIndex(i)
            }}>
            <div className={`${styles.round} ${styles.pulsation}`}>
              <button />

            </div>

            <div className={styles.date}>
              {this.props.mode !== "desktop"
                ? this.props.t(amount[i].dateSmall)
                : this.props.t(amount[i].date)}
            </div>
          </div>
        )
      }

      items.push(component)
    }
    return items
  }
  getButtons() {
    return (
      <>
        {this.state.active !== 0 ? (
          <div
            className={styles.button_left}
            onClick={(e) => {
              this.changeActive(e, -1)
            }}>
            <Arrow_left />
          </div>
        ) : (
          ""
        )}
        {this.state.active !== this.props.content.dates.length - 1 ? (
          <div
            className={styles.button_right}
            onClick={(e) => {
              this.changeActive(e, 1)
            }}>
            <Arrow_right />
          </div>
        ) : (
          ""
        )}
      </>
    )
  }

  swiper(e, start, end) {
    if (start) {
      this.swipeStart = e.targetTouches?.[0].clientX
    }
    if (end) {
      if (this.swipeStart - this.swipe > 0) {
        this.changeActive(e.nativeEvent, 1)
      }
      if (this.swipeStart - this.swipe < 0) {
        this.changeActive(e.nativeEvent, -1)
      }
    }
    if (!start && !end) {
      this.swipe = e.targetTouches[0].clientX
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.text_wrapper}>
          <div className={styles.author_header}>
            {this.props.t(this.props.content.header)}
          </div>
        </div>

        <div
          className={styles.pagination_wrapper}
          onTouchMove={(e) => this.swiper(e)}
          onTouchEnd={(e) => this.swiper(e, false, true)}
          onTouchStart={(e) => this.swiper(e, true)}>
          {this.getPagination(this.props.content.dates)}
        </div>
        <div className={styles.navigation}>{this.getButtons()}</div>
        <div className={styles.author_img_wrapper}>
          {this.getImg(this.props.content.dates[this.state.active].img)}
        </div>
      </div>
    )
  }
}

export default withNamespaces()(Biography);
