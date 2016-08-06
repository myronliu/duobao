import Layout from '../components/layout'

import Cookie from '../helper/cookie';
import Signed from '../helper/signed';
import Toast from '../helper/toast';
import Loading from '../helper/loading';
import NextButton from '../components/nextbutton';
import Input from '../components/Input';
import TitleInput from '../components/titleinput';
import ApiStore from '../stores/apistore';
import ApiAction from '../actions/apiaction';
import UrlConfig from '../config/urlconfig'
import BasePage from '../components/BasePage.js';
import TwoBtnAlert from '../components/twobtnalert'
export default class extends BasePage {
  state={
    disabled: false,
    showLoading: false,
    showSigned: false,
    srcBx1: "/images/bg.png",
    srcBx2: "/images/bg.png",
    srcBx3: "/images/bg.png",
    srcBx4: "/images/bg.png",
    srcBx5: "/images/bg.png",
  };

  apiSuccess(url,body){
    this.showLoading(false);
    switch(url){
      case this.state.signInUrl:
        Cookie.setCookie("signed", true, 1);
        this.setState({
          showSigned: true
        })
        break;
    }
  }

  componentDidMount(){
    super.componentDidMount();
    this.setState({
      srcBx1: Cookie.getCookie("signed") == "true" ? "/images/bk.png" : "/images/bg.png",
      srcBx2: Cookie.getCookie("guard1") == "true" ? "/images/bk.png" : "/images/bg.png",
      srcBx3: Cookie.getCookie("guard2") == "true" ? "/images/bk.png" : "/images/bg.png",
      srcBx4: Cookie.getCookie("guard3") == "true" ? "/images/bk.png" : "/images/bg.png",
      srcBx5: Cookie.getCookie("guard4") == "true" ? "/images/bk.png" : "/images/bg.png",
    })
  }

  handleTouch(value){
    switch(value){
      case 0:
        this.setState({
          signInUrl: UrlConfig.signIn+"?token=" + Cookie.getCookie("token"),
          showLoading: true
        })
        ApiAction.post(UrlConfig.signIn+"?token=" + Cookie.getCookie("token"));
        break;
      case 1:
        window.to("/question?level=1")
        break;
      case 2:
        window.to("/question?level=2")
        break;
      case 3:
        window.to("/question?level=3")
        break;
      case 4:
        window.to("/question?level=4")
        break;
    }
    
  }

  hideSigned(){
    this.setState({
      showSigned: false,
      srcBx1: '/images/bk.png'
    })
  }

  render() {
    return (
      <div className="guanka">
        <Loading showLoading={this.state.showLoading}/>
        <Signed show={this.state.showSigned} onTouchEnd={this.hideSigned.bind(this)}/>
        <img className="guan1" src="/images/guan1.png" onTouchEnd={this.handleTouch.bind(this, 0)}/>
        <img className="guan2" src="/images/guan2.png" onTouchEnd={this.handleTouch.bind(this, 1)}/>
        <img className="guan3" src="/images/guan3.png" onTouchEnd={this.handleTouch.bind(this, 2)}/>
        <img className="guan4" src="/images/guan4.png" onTouchEnd={this.handleTouch.bind(this, 3)}/>
        <img className="guan5" src="/images/guan5.png" onTouchEnd={this.handleTouch.bind(this, 4)}/>
        <img className="bx bx1" src={this.state.srcBx1} />
        <img className="bx bx2" src={this.state.srcBx2} />
        <img className="bx bx3" src={this.state.srcBx3} />
        <img className="bx bx4" src={this.state.srcBx4} />
        <img className="bx bx5" src={this.state.srcBx5} />
        <span className="title title1">大咖登场</span>
        <span className="title title2">大咖采访</span>
        <span className="title title3">大咖的自我修养</span>
        <span className="title title4">终极大咖</span>
        <span className="title title5">大咖说了算</span>
      </div>
    )
  }
}