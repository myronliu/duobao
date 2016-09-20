import Layout from '../components/layout'

import Cookie from '../helper/cookie';
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
    srcc: "/images/xiu.png"
  };

  apiSuccess(url,body){
    this.showLoading(false);
    switch(url){
      case this.state.loginurl:
        if(Cookie.getCookie("name")!=this.refs.name.value){
          Cookie.setCookie("name", this.refs.name.value, 1);
          Cookie.setCookie("signed", "", 1);
          Cookie.setCookie("guard1", "", 1);
          Cookie.setCookie("guard2", "", 1);
          Cookie.setCookie("guard3", "", 1);
          Cookie.setCookie("guard4", "", 1);
        }
        Cookie.setCookie("token", body.data, 1);
        window.to('/guanka');
        break;
    }
  }

  nextBtnPress() {
    var Name = this.refs.name.value;
    if (Name.length === 0) {
      Toast.show('请输入姓名', 1500);
    } else {
      this.setState({
        loginurl: UrlConfig.login+"?name=" + Name
      })
      this.showLoading(true);
      ApiAction.post(UrlConfig.login+"?name=" + Name);
    }
  }

  componentDidMount(){
    super.componentDidMount();
    // var socket = io();
    // socket.on('chat message', function(msg){
    //   this.setState({
    //     srcc: msg
    //   })
    // }.bind(this));
  }

  render() {
    return (
      <div className="home">
        <Loading showLoading={this.state.showLoading}/>
        <img className="header" src={this.state.srcc} />
        <img className="baozang" src="/images/baozang.png" />
        <div className="login">
          <span className="xingming">姓名</span>
          <span className="text"><input className="input" ref="name" type="text" /></span>
          <span className="button" onTouchEnd={this.nextBtnPress.bind(this)}><img src="/images/login.png" /></span>
        </div>
      </div>
    )
  }
}