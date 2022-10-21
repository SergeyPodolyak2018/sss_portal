import React, {Component} from 'react';
import styles from './MobileLanscapePlaceholder.module.css';
import phone from './phone.png'

function MobileLanscapePlaceholder({ content, t ,debug}) {

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>{debug || t(content.title) }</div>
      <img src={phone} className={styles.phone} alt="" />
    </div>
  )
}

export default MobileLanscapePlaceholder
