import React from "react"
import { withNamespaces } from "react-i18next"
import LinkButton from "../linkButton/LinkButton"
import styles from "./SearchDiscoveries.module.scss"
import styled from "styled-components"
import { Parallax, ParallaxProvider } from "react-scroll-parallax"
// import { Parallax, Background } from "react-parallax"
function SearchDiscovery({ mode, content, t }) {
  const parallax_fast = [70, 0]
  const parallax_slow = [50, 0]
  const parallax_eslow = [10, 0]
  return (
    // <ParallaxProvider>
    <div className={styles.wrapper}>
      <div className={styles.card1}>
        <img
          src={content.img[mode].title}
          alt=""
          className={styles.titleImage}
        />
        <div className={styles.content}>
          <span className={styles.title}> {t(content.title)} </span>

          <div className={styles.paragraph}> {t(content.content)} </div>
        </div>
      </div>
      <div className={styles.card2}>
        <div className={styles.imageWrapperLeft}>
          {mode === "mobile" && <img src={content.img[mode].block1} alt="" />}

          {mode === "tablet" && (
            <>
              <img src={content.img[mode].block1_2} alt="" />
              <img src={content.img[mode].block1} alt="" />
            </>
          )}

          {mode === "desktop" && (
            <ParallaxProvider>
              <Parallax y={parallax_slow}>
                <img src={content.img[mode].block1} alt="" />
                <div className={styles.parallax_gap} />
                <img src={content.img[mode].block1_2} alt="" />
              </Parallax>
            </ParallaxProvider>
          )}
        </div>

        <div className={styles.imageWrapperRight}>
          {mode === "desktop" && (
            <>
              <ParallaxProvider>
                <Parallax y={parallax_fast}>
                  <img src={content.img[mode].block1_3} alt="" />
                  <div className={styles.parallax_gap} />
                  <img src={content.img[mode].block1_4} alt="" />
                </Parallax>
              </ParallaxProvider>
            </>
          )}
        </div>
        <div className={styles.content}>
          <ParallaxProvider>
            <Parallax
              className="custom-class"
              y={mode === "desktop" ? parallax_eslow : [0, 0]}>
              <div className={styles.blockTitle}>
                {" "}
                {t(content.block1Title)}{" "}
              </div>
              <div className={styles.paragraph}>
                {t(content.block1Content1)}
              </div>
            </Parallax>
          </ParallaxProvider>
        </div>
      </div>
      <div className={styles.card3}>
        <div className={styles.imageWrapperLeft}>
          {mode === "mobile" && <img src={content.img[mode].block2} alt="" />}

          {mode === "tablet" && (
            <>
              <img src={content.img[mode].block2} alt="" />
              <img src={content.img[mode].block2_2} alt="" />
            </>
          )}

          {mode === "desktop" && (
            <ParallaxProvider

            // scrollContainer={styles.imageWrapperLeft}
            >
              <Parallax y={parallax_slow}>
                <img src={content.img[mode].block2} alt="" />
                <div className={styles.parallax_gap} />

                <img src={content.img[mode].block2_2} alt="" />
              </Parallax>
            </ParallaxProvider>
          )}
        </div>
        <div className={styles.imageWrapperRight}>
          {mode === "desktop" && (
            <>
              <ParallaxProvider

              // scrollContainer={styles.imageWrapperRight}
              >
                <Parallax y={parallax_fast}>
                  <img src={content.img[mode].block2_3} alt="" />
                  <div className={styles.parallax_gap} />

                  <img src={content.img[mode].block2_4} alt="" />
                </Parallax>
              </ParallaxProvider>
            </>
          )}
        </div>

        <div className={styles.content}>
          <ParallaxProvider>
            <Parallax y={mode === "desktop" ? parallax_eslow : [0, 0]}>
              <div className={styles.blockTitle}>
                {" "}
                {t(content.block2Title)}{" "}
              </div>

              <div className={styles.paragraph}>{t(content.block2Content)}</div>
              <LinkButton
                onClick={(_) => {
                  window.open(t(content.ourSiteURL), "blank")
                }}
                className={styles.linkButton}
                linkText={t(content.ourSite)}
                underline
              />
            </Parallax>
          </ParallaxProvider>
        </div>
      </div>
      <div className={styles.buttonContainer}></div>
    </div>
  )
}

export default withNamespaces()(SearchDiscovery)
