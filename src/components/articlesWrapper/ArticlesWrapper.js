import React, { Component } from 'react';
import {Link,withRouter} from "react-router-dom";
import styles from './ArticlesWrapper.module.css';
import { withNamespaces } from 'react-i18next';
import Article from '../article/Article';
import LinkButton from "../linkButton/LinkButton"
import getLng from "../../utils/getLanguage"


class ArticlesWrapper extends Component {
    constructor(props) {
        super(props);
        const { t } = props;
        this.state = {

        };
    }

    componentDidMount() {

    }

    getLimitation(){
        let limit;
        switch (this.props.mode) {
            case 'desktop':
                limit=this.props.content.limit.desktop;
                break;
            case 'tablet':
                limit=this.props.content.limit.tablet;
                break;
            case 'mobile':
                limit=this.props.content.limit.mobile
        }


        return limit-1;
    }
  render() {

      
        return (
					<div className={styles.wrapper}>
						<div className={styles.header}>
							{this.props.t(
								this.props.content.header
							)}
						</div>
						<div
							className={styles.wrapper_helper}
						>
							{[...this.props.content.articles]
								.reverse()
								.map((item, key) => {
									if (
										key <
										this.props.content.limit[
											this.props.mode
										]
									)
										return (
											<Article
												classes={{
													wrapperClass:
														styles.wrapperClass,
													txtClass:
														styles.txtClass,
													imgClass:
														styles.imgClass,
													articleClass:
														styles.articleClass,
													headerClass:
														styles.headerClass,
													dateClass:
														styles.dateClass,
												}}
												key={key}
												content={item}
												mode={this.props.mode}
											/>
										)
								})}

							<LinkButton
								className={styles.linkButton}
								link={`/${getLng()}/${
									this.props.content.link
								}`}
								linkText={
									this.props.content.linkText
								}
								mode={this.props.mode}
							/>
						</div>
					</div>
				)
    }
}

export default withRouter(withNamespaces()(ArticlesWrapper));
