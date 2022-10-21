import React, { Component } from 'react';

import { ReactComponent as CrossButton } from "./cross.svg"
import { ReactComponent as ProjectsNetwork } from "./projects.svg"
import svgtwxt from "./projects.svg"
import { ReactComponent as ProjectsNetwork_mobile } from "./projects_mobile.svg"
import { ReactComponent as ProjectsNetwork_tablet } from "./projects_tablet.svg"
import styles from './Projects_conv.module.css';
import { withNamespaces } from 'react-i18next';
import  {NewSvgAllDevice} from './NewSvgAllDevice';
import { NewSvgTablet } from './NewSvgTablet';
import { NewSvgMobile } from './NewSvgMobile';



class Projects extends Component {
    constructor(props) {
      super(props)
      this.state = {
        active: "initial",
        inView: false,
      }
      this.interval = 0
      this.svgRef = React.createRef()
      this.wrapRef = React.createRef()
      this.changeActive = this.changeActive.bind(this)
      this.clearToInit = this.clearToInit.bind(this)
      console.log(this.props.content.projects)
    }

    componentDidMount() {
      this.initComponent()
      this.interval = setInterval(() => {
        if (this.wrapRef.current) {
          if (this.isInView(this.wrapRef.current)) {
            this.setState({ inView: true })
          } else {
            this.setState({ inView: false })
          }
        }
      }, 500)

    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    componentDidUpdate(prevProps) {
        if(this.props.mode!== prevProps.mode){
            this.initComponent()
        }

    }
    initComponent(){
        // let rounds = this.svgRef.current.getElementsByClassName('clickForShowProject');
        // for (let i=0; i<rounds.length; i++ ){
        // console.log("🚀 ~ file: Projects.js ~ line 53 ~ Projects ~ initComponent ~ this.svgRef", this.svgRef)
        //     rounds[i].addEventListener('click',this.changeActive, false)
        // }
    }

    isInView(el){
        let box = el.getBoundingClientRect();
        return box.top < window.innerHeight && box.bottom >= 0;
    }

    clearClass(){
        // let rounds = this.svgRef.current.getElementsByClassName('clickForShowProject');
        // let puls = this.svgRef.current.getElementsByClassName('pulsation');
        // let text = this.svgRef.current.getElementsByClassName('point_text');
        // for (let i=0; i<rounds.length; i++ ){
        //     rounds[i].classList.remove("activ_point");
        //     puls[i].classList.remove("pulsation_hide");
        //     text[i].classList.remove("active_text");
        // }

    }



    componentWillUnmount(){

    }


    clearToInit(){
        this.clearClass();
        this.setState({ active: 'initial' });
    }

    changeActive(e) {
        // console.log("🚀 ~ file: Projects.js ~ line 89 ~ Projects ~ changeActive ~ e", e.target.parentNode.id)
        const reg = /svg_/g
        let index=e.target.parentNode.id.replace(reg,"").replace('_puls_wrapper', '');
        console.log("🚀 ~ file: Projects.js ~ line 91 ~ Projects ~ changeActive ~ index", index)
        // this.clearClass();
        // e.target.classList.add("activ_point");
        // this.svgRef.current.getElementById(e.target.id+'_puls').classList.add("pulsation_hide");
        // this.svgRef.current.getElementById(e.target.id+'_text').classList.add("active_text");

        this.setState({ active: index });

        e.preventDefault();
        e.stopPropagation();
    }
    getImg(){
        if (this.props.mode2.size === 'desktop'){
            return <NewSvgAllDevice
                active={this.state.active}
                mode={this.props.mode}
                scalability={`${this.props.t(this.props.content.projects.food.header)}`}
                ecology={`${this.props.t(this.props.content.projects.energy.header)}`}
                ethnica={`${this.props.t(this.props.content.projects.digital.header)}`}
                changeActive={this.changeActive}
                alt={`${this.props.t(this.props.content.alt)}`}
            //  ref={this.svgRef}
        />
        }
        else if (this.props.mode2.size === 'tablet'){
            return <NewSvgTablet
                active={this.state.active}
                mode={this.props.mode}
                scalability={`${this.props.t(this.props.content.projects.food.header)}`}
                ecology={`${this.props.t(this.props.content.projects.energy.header)}`}
                ethnica={`${this.props.t(this.props.content.projects.digital.header)}`}
                changeActive={this.changeActive}
                alt={`${this.props.t(this.props.content.alt)}`}
            //  ref={this.svgRef}
        />
        }
        else{
           return  <NewSvgMobile
               active={this.state.active}
               mode={this.props.mode}
               scalability={`${this.props.t(this.props.content.projects.food.header)}`}
               ecology={`${this.props.t(this.props.content.projects.energy.header)}`}
               ethnica={`${this.props.t(this.props.content.projects.digital.header)}`}
               changeActive={this.changeActive}
               alt={`${this.props.t(this.props.content.alt)}`}
                  //  ref={this.svgRef}
                   />
        }



            // return    <NewSvgAllDevice
            //     // mode={this.props.mode}
            //     scalability={`${this.props.t(this.props.content.projects.food.header)}`}
            //     ecology={`${this.props.t(this.props.content.projects.energy.header)}`}
            //     ethnica={`${this.props.t(this.props.content.projects.digital.header)}`}
            //     changeActive={this.changeActive}

            //     alt={`${this.props.t(this.props.content.alt)}`}
            //     //  ref={this.svgRef}
            //      />
    }

    getContent(){
        if(this.state.active==='initial'){
            return <div className={`${styles.proj_body} ${styles.init_body}`}>{this.props.t(this.props.content.projects[this.state.active].body)}</div>
        }else{
            return <>
                <div className={styles.proj_header}>{this.props.t(this.props.content.projects[this.state.active].header)}</div>
                <div className={`
                ${styles.proj_body}
                `}>
                    {this.props.t(this.props.content.projects[this.state.active].body)}
                </div>
            </>
        }
    }




    render(){
        return<div className={styles.wrapper} ref={this.wrapRef} style={this.state.inView?{opacity:'1'}:{opacity:'0'}}>
            <div className={styles.header_wrapper}>
                <div className={styles.header}>
                    {this.props.t(this.props.content.header)}
                </div>

            </div>
            {this.state.active === 'initial'?
            <div className={styles.card_init}>{this.getContent()}</div>:
            <div className={styles.card}>
                <div className={styles.cross_button} onClick={this.clearToInit}><CrossButton/></div>
                {this.getContent()}

            </div>}

            <div className={styles.author_img_wrapper}>
                {this.getImg()}
            {/* <NewSvgAllDevice

                scalability={this.props.content.projects.food.header}
                ecology={this.props.content.projects.energy.header}
                ethnica={this.props.content.projects.digital.header}


                alt={`${this.props.t(this.props.content.alt)}`}
                 ref={this.svgRef}/> */}
                {/* <img src={'./projects.svg'} ref={this.svgRef} alt={`${this.props.t(this.props.content.alt)}`}/> */}
            </div>
        </div>;
    }
}

export default withNamespaces()(Projects);
