import { Parallax, ParallaxProvider } from "react-scroll-parallax"

import LazyLoad from 'react-lazyload';
import LinkButton from "../linkButton/LinkButton"
import React from "react"
import styled from "styled-components"
import styles from "./SearchDiscoveries.module.scss"
import { withNamespaces } from "react-i18next"

// import { Parallax, Background } from "react-parallax"
function SearchDiscovery({ mode, content, t, lng }) {
  const parallax_fast = ["-30px", "30px"]
  const parallax_slow = ["-70px", "70px"]
  const parallax_eslow = ["-50px", "50px"]

  //   const parallax_tablet = ['80px', '0px'];
  // const parallax_mobile = ['-40px', '0px'];
  const parallax_tablet = ["0px", "0px"]
  const parallax_mobile = ["0px", "0px"]
  return (
		<div className={styles.wrapper}>
			<div className={styles.card1}>
				<img
					src={content.img[mode].title}
					alt={`${t(content.alt.title)}`}
					className={styles.titleImage}
				/>
				<div className={styles.content}>
					<span className={styles.title}> {t(content.title)} </span>

					<div className={styles.paragraph}> {t(content.content)} </div>
				</div>
			</div>
			<LazyLoad offset={-100} height={100} once={true}>
				<div className={styles.card2}>
					<div className={styles.imageWrapperLeft}>
						{mode === 'mobile' && (
							<Parallax y={parallax_mobile}>
								<img
									alt={`${t(content.alt.block1)}`}
									src={content.img[mode].block1}
								/>
							</Parallax>
						)}

						{mode === 'tablet' && (
							<Parallax y={parallax_tablet}>
								<div className={styles.paralax_container}>
									<img
										src={content.img[mode].block1_2}
										alt={`${t(content.alt.block1_2)}`}
									/>
									<img
										src={content.img[mode].block1}
										alt={`${t(content.alt.block1)}`}
									/>
								</div>
							</Parallax>
						)}

						{mode === 'desktop' && (
							<Parallax y={parallax_slow}>
								<div className={styles.subwrapperLeft}>
									<img
										src={content.img[mode].block1}
										alt={`${t(content.alt.block1)}`}
									/>
									<div className={styles.parallax_gap} />
									<img
										src={content.img[mode].block1_2}
										alt={`${t(content.alt.block1_2)}`}
									/>
								</div>
							</Parallax>
						)}
					</div>

					<div className={styles.imageWrapperRight}>
						{mode === 'desktop' && (
							<>
								<Parallax y={parallax_fast}>
									<div className={styles.subwrapperRight}>
										<img
											src={content.img[mode].block1_3}
											alt={`${t(content.alt.block1_3)}`}
										/>
										<div className={styles.parallax_gap} />
										<img
											src={content.img[mode].block1_4}
											alt={`${t(content.alt.block1_4)}`}
										/>
									</div>
								</Parallax>
							</>
						)}
					</div>
					<div className={styles.content}>
						<Parallax
							className='custom-class'
							y={mode === 'desktop' ? parallax_eslow : [0, 0]}>
							<div className={styles.blockTitle}>
								{' '}
								{t(content.block1Title)}{' '}
							</div>
							<div className={styles.paragraph}>
								{t(content.block1Content1)}
							</div>
						</Parallax>
					</div>
				</div>
			</LazyLoad>
			<LazyLoad height={200} once={true}>
				<div className={styles.card3}>
					<div className={styles.imageWrapperLeft}>
						{mode === 'mobile' && (
							<Parallax y={parallax_mobile}>
								<img
									src={content.img[mode].block2}
									alt={`${t(content.alt.block2)}`}
								/>
							</Parallax>
						)}

						{mode === 'tablet' && (
							<Parallax y={parallax_tablet}>
								<div className={styles.paralax_container}>
									<img
										src={content.img[mode].block2}
										alt={`${t(content.alt.block2)}`}
									/>
									<img
										src={content.img[mode].block2_2}
										alt={`${t(content.alt.block2_2)}`}
									/>
								</div>
							</Parallax>
						)}

						{mode === 'desktop' && (
							<Parallax y={parallax_slow}>
								<div className={styles.subwrapperLeft}>
									<img
										src={content.img[mode].block2}
										alt={`${t(content.alt.block2)}`}
									/>
									<div className={styles.parallax_gap} />

									<img
										src={content.img[mode].block2_2}
										alt={`${t(content.alt.block2_2)}`}
									/>
								</div>
							</Parallax>
						)}
					</div>
					<div className={styles.imageWrapperRight}>
						{mode === 'desktop' && (
							<>
								<Parallax y={parallax_fast}>
									<div className={styles.subwrapperRight}>
										<img
											src={content.img[mode].block2_3}
											alt={`${t(content.alt.block2_3)}`}
										/>
										<div className={styles.parallax_gap} />

										<img
											src={content.img[mode].block2_4}
											alt={`${t(content.alt.block2_4)}`}
										/>
									</div>
								</Parallax>
							</>
						)}
					</div>

					<div className={styles.content}>
						<Parallax y={mode === 'desktop' ? parallax_eslow : [0, 0]}>
							<div className={styles.blockTitle}>
								{' '}
								{t(content.block2Title)}{' '}
							</div>

							<div className={styles.paragraph}>{t(content.block2Content)}</div>
							<LinkButton
								onClick={_ => {
									window.open(content.ourSiteURL + lng, '_blank')
								}}
								className={styles.linkButton}
								linkText={t(content.ourSite)}
								link={content.link}
								underline
							/>
						</Parallax>
					</div>
				</div>
			</LazyLoad>
			<div className={styles.buttonContainer}></div>
		</div>
	)
}

export default withNamespaces()(SearchDiscovery)
