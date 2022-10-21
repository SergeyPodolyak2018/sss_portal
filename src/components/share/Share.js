import React, { Component } from 'react';

import styles from './Share.module.css';
import { withNamespaces } from 'react-i18next';

class Share extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: true,
      tabletOpen: false,
      bottom: 110,
      prevLocation: this.props.pathname,
    }
    // this.position='';
    this.container = React.createRef()
    this.onScroll = this.onScroll.bind(this)
    this.togleMenu = this.togleMenu.bind(this)
    this.togleTabletMenu = this.togleTabletMenu.bind(this)
  }

    onScroll() {

        const height = document.documentElement.scrollHeight -
        document.documentElement.scrollTop - window.innerHeight;


           if(this.props.pathname!='/')
         (height < 150) ? (
          this.setState({
            bottom: 220 - height,
          })
         ) :
          (this.setState({
                        bottom: 110,
                      }))

  }

  componentDidMount() {

    document.addEventListener("scroll", this.onScroll)
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.onScroll)
  }

  componentDidUpdate(previousProps) {

      const location = this.props.pathname
      if (previousProps.pathname !== location) {




                    this.setState({
                      bottom: '110vh',
                    })



      if (!this.state.menuOpen) {
        this.setState({ menuOpen: true })
      }
    }
  }
  togleMenu() {
    this.setState({ menuOpen: false })
  }
  togleTabletMenu() {
    this.setState({ tabletOpen: !this.state.tabletOpen })
  }

  getButtons(item, key) {
      if(item.hasOwnProperty('type') && item.type === 'mail'){
          return (
						<a
							alt={this.props.t(item.alt)}
							className={styles.button}
							key={key}
							href={
								item.link +
								`subject=${encodeURIComponent(
									this.props.t(item.subject)
								)}&body=${encodeURIComponent(
									this.props.t(item.title) +
										this.props.t(item.description) +
										window.location.href
								)} `
							}
							style={{ backgroundImage: `url(${item.img})` }}
						/>
					)
      }else{
          return (
						<a
							alt={this.props.t(item.alt)}
							className={styles.button}
							key={key}
							href={
								item.link
									? item.link.replace('_URL_', window.location.href)
									: '#'
							}
							style={{ backgroundImage: `url(${item.img})` }}
						/>
					)
      }

  }

  render() {
    // let text = this.state.tabletOpen && this.props.mode==='tablet' ? <div className={styles.share_text}>{this.props.t(this.props.content.shareText)}</div> : ``;
    let shareButton = this.state.tabletOpen ? (
      <div
      alt={this.props.t(this.props.content.alt_open)}
        className={styles.main_button_open}
        style={{ backgroundImage: `url(${this.props.content.sublogo})` }}
        onClick={this.togleTabletMenu}></div>
    ) : (
      <div
      alt={this.props.t(this.props.content.alt)}
        className={styles.main_button}
        style={{ backgroundImage: `url(${this.props.content.logo})` }}
        onClick={this.togleTabletMenu}></div>
    )

    return (
      <div
        ref={this.container}
        className={`${styles.share_wrapper} ${
          this.state.tabletOpen && styles.share_open
        }`}
        style={
          this.props.mode.size === "mobile"
            ?
              {
                bottom: this.state.bottom,
              }
            : {}
        }>
        {shareButton}
        {this.state.tabletOpen &&
          this.props.content.links.map((item, key) =>
            this.getButtons(item, key)
          )}
      </div>
    )
  }
}

export default withNamespaces()(Share);
