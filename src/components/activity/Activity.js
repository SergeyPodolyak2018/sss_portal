import React, { Component } from 'react';
import styles from './Activity.module.css';
import { withNamespaces } from 'react-i18next';
import LinkButton from "../linkButton/LinkButton";

class Activity extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    componentWillUnmount(){

    }


    getImg(img){
        let source;
        switch (this.props.mode) {
            case 'desktop':
                source=img.desktop;
                break;
            case 'tablet':
                source=img.tablet;
                break;
            case 'mobile':
                source=img.mobile
        }


        return source;
    }


    render(){
        let contentBody;
        if(this.props.mode!=='tablet'){
            contentBody=<span className={styles.activity_content_body}>{this.props.t(this.props.content.content.body1)}{this.props.t(this.props.content.content.body2)}</span>
        }else{
            contentBody=<>
                <span className={styles.activity_content_body}>{this.props.t(this.props.content.content.body1)}{}</span>
                <span className={styles.activity_content_body1}>{this.props.t(this.props.content.content.body2)}</span>
            </>
        }
        return <div className={styles.activity_wrapper}>
            <div className={styles.activity__header}>{this.props.t(this.props.content.header)}</div>
            <div className={styles.activity__subheader}>{this.props.t(this.props.content.subheader)}</div>
            <img className={styles.activity__bgimg} src={this.getImg(this.props.content.bgimg)} />
            <div className={styles.activity_content}>
                <span id={styles.content_header} className={styles.activity_content_header}>{this.props.t(this.props.content.content.header)}</span>
                <img id={styles.content_img} className={styles.activity_content_img} src={this.getImg(this.props.content.content.img)} />
                <div id={styles.content_wrapper} className={styles.activity_content_body_wrapper}>
                    {contentBody}
                    {/*<span className={styles.linkWrapper}><span className={styles.arrow} style={{backgroundImage: "url(img/arrow.svg)"}}></span><a className={styles.activity_content_link} href={this.props.content.content.link}>{this.props.t(this.props.content.content.linkText)}</a></span>*/}
                    <span className={styles.linkWrapper}>
                        <LinkButton link={this.props.content.content.link} linkText={this.props.content.content.linkText} mode={this.props.mode}/>
                    </span>

                </div>
            </div>

        </div>
    }
}

export default withNamespaces()(Activity);
