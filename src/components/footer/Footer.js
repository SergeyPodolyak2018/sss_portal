import React, { useEffect, useState } from 'react'

import ArrowSVG  from './Rectangle 67.svg'
import {ReactComponent as CopyVector} from './Vector.svg'
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from "./logo.svg"
import { ReactComponent as LogoMobile } from "./logo_mobile.svg"
import classes from './Footer.module.scss'
import getLng from "../../utils/getLanguage"
import styled from 'styled-components'
import { withNamespaces } from 'react-i18next';

function Footer({ content, t, mode, setIndex }) {
  const [scrollTop, setScrollTop] = useState(0)
  const [shareVisible, setShareVisible] = useState(true)
  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop)

      if (
        document.documentElement.scrollHeight -
          document.documentElement.scrollTop -
          window.innerHeight <
          90 &&
        mode === "mobile"
      ) {
        setShareVisible(false)

      } else {

      }
    }
    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [scrollTop])

  return (
		<div className={classes.container}>
			<Link
				className={classes.logo}
				onClick={() => {
					setIndex(0)
				}}
				to={'/' + getLng() + '/?index=0'}
			>
				{mode === 'desktop' ? (
					<Logo
						alt={`${t('CommonFooterLogo')}`}
					/>
				) : mode === 'tablet' ? (
					<Logo
						alt={`${t('CommonFooterLogo')}`}
					/>
				) : (
					<LogoMobile
						alt={`${t('CommonFooterLogo')}`}
					/>
				)}
			</Link>
			<Link
				className={classes.dialogStart}
				target={'_blank'}
				onClick={() => {
					setIndex(4)
				}}
				to={'/' + getLng() + '/?index=4'}
			>
				{' '}
				<span> {'начать \nдиалог'} </span>{' '}
			</Link>

			<span className={classes.copyrights}>
				<CopyVector
					width={mode === 'mobile' ? 9 : 19}
					height={mode === 'mobile' ? 9 : 19}
				/>
				&nbsp;&nbsp;
				{mode === 'mobile'
					? '2021'
					: '2021 Sardar S. Sardarov'}
			</span>
			<ul
				className={classes.footerNav}
				mode={mode}
			>
				{content.map(({ name, url }, index) => (
					<li key={index}>
						<Link to={'/' + getLng() + url}>
							{t(name)}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default withNamespaces()(Footer)
