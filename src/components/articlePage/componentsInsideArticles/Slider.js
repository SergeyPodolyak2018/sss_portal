import React, { Component } from 'react'

import arrowLeft from './ArrowLeft.svg'
import arrowRight from './ArrowRight.svg'
import styles from '../ArticlePage.module.css'

class SliderImage extends Component {
	constructor(props) {
		super(props)

		this.state = { active: 0 }
	}

	componentDidMount() {}
	componentWillUnmount() {}
	loopImageInc() {
		if (
			this.props.content.img.length ==
			this.state.active + 1
		) {
			this.setState({
				active: (this.state.active = 0),
			})
		}
	}
	loopImageDec() {
		if (this.state.active == 0) {
			this.setState({
				active: (this.state.active =
					this.props.content.img.length - 1),
			})
		}
	}
	getImg(img) {
		let source
		switch (this.props.mode) {
			case 'desktop':
				source = img.desktop
				break
			case 'tablet':
				source = img.tablet
				break
			case 'mobile':
				source = img.mobile
		}
		return source
	}
	content(item, key) {
		let opacity = 0
		if (key === this.state.active) {
			opacity = 1
		}
		return (
			<div
				key={key}
				alt={`${item.alt}`}
				className={styles.backgroundImage}
				style={{
					backgroundSize: 'contain',

					backgroundImage: `url(${this.getImg(
						item
					)})`,
					opacity: opacity,
				}}
			></div>
		)
	}

	next() {
		this.setState({
			active: this.state.active + 1,
		})
		this.loopImageInc()
	}
	prev() {
		this.setState({
			active: this.state.active - 1,
		})
		this.loopImageDec()
	}
	render() {
		return (
			<div className={styles.containerSlider}>
				<div className={styles.sliderWrapper}>
					{this.props.content.img.map(
						(item, key) => {
							return this.content(item, key)
						}
					)}
				</div>
				<div className={styles.controlSlider}>
					<span>
						{this.state.active + 1} /{' '}
						{this.props.content.img.length}
					</span>
					<div className={styles.sliderArrows}>
						<div
							className={styles.buttonArrow}
							onClick={this.prev.bind(this)}
						>
							{' '}
							<img src={arrowLeft} />
						</div>
						<div
							className={styles.buttonArrow}
							onClick={this.next.bind(this)}
						>
							{' '}
							<img src={arrowRight} />{' '}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default SliderImage
