import BasePage from '../components/BasePage.js';
import NextButton from '../components/nextbutton';
import CheckBox from '../components/checkbox';
import ApiAction from '../actions/apiaction';
import UrlConfig from '../config/urlconfig'
import Loading from '../helper/loading';
import Reward from '../helper/reward';
import Total from '../helper/total';
import Toast from '../helper/toast';
import Cookie from '../helper/cookie';
var ans={};
export default class extends BasePage {
  state={
    showLoading: false,
    rewardShow: false,
    totalShow: false,
    ans:{},
    data:{
      no: '1',
      subject: "题目"
    },
    answers:[]
  };
  componentDidMount(){
    super.componentDidMount();
    var token = getCookie("token");
    this.setState({
      questionUrl: UrlConfig.questions + "?token=" + token + "&level=" + this.props.level || 1
    })
    ApiAction.post(UrlConfig.questions + "?token=" + token + "&level=" + this.props.level || 1)
  }

  handleOSAnswer(item){
    this.state.ans[item] = true;
    for(var key in this.state.ans){
      if(key != item){
        this.state.ans[key] = false;
      }
    }
    this.setState({
      ans: this.state.ans
    })
  }

  handleOMAnswer(item){
    this.state.ans[item] = !this.state.ans[item];
    this.setState({
      ans: this.state.ans
    })
  }

  handleSuAnswer(event){
    this.setState({
      key_answer: event.target.value 
    })
  }

  renderAnswers(){
    if(this.state.data.questionType==="OBJECTIVE_S"){
      return this.state.answers.map(function(item,i){
        return (
          <div key={i} className="answerItem" onTouchEnd={this.handleOSAnswer.bind(this, item)}>
            <input type="radio" checked={this.state.ans[item] ? "checked" : ""} />{item}
          </div>
        )
      }.bind(this))
    }else if(this.state.data.questionType==="OBJECTIVE_M"){
      return this.state.answers.map(function(item,i){
        return (
          <div key={i} className="answerItem" onTouchEnd={this.handleOMAnswer.bind(this, item)}>
            <input type="checkbox" checked={this.state.ans[item] ? "checked" : ""} />{item}
          </div>
        )
      }.bind(this))
    }else if(this.state.data.questionType==="SUBJECTIVE"){
      return (
        <div className="answerItem" style={{paddingLeft: '0px', height: '100px'}}>
          <textarea  onChange={this.handleSuAnswer.bind(this)} style={{width:'100%', height:'100px'}} rows="10" cols="20" />
        </div>
      )
    }
  }

  apiSuccess(url,body){
    this.showLoading(false);
    switch(url){
      case this.state.questionUrl:
        // debugger;
        this.setState({
          data: body && body.data && body.data.length > 0 ? body.data[0] : {},
          answers: body && body.data && body.data.length > 0  &&  body.data[0].items ? body.data[0].items.split(';') : []
        })
        break;
      case this.state.uploadScoreUrl:
        Cookie.setCookie("guard"+this.props.level, true, 1);
        if(body.data=="updated"){
          Toast.show("更新成功");
          window.to("/guanka");
        }else{
          var signed = Cookie.getCookie("signed") == "true";
          var guard1 = Cookie.getCookie("guard1") == "true";
          var guard2 = Cookie.getCookie("guard2") == "true";
          var guard3 = Cookie.getCookie("guard3") == "true";
          var guard4 = Cookie.getCookie("guard4") == "true";
          if(signed && guard1 && guard2 && guard3 && guard4){
            this.setState({
              totalShow: true
            })
          }else{
            this.setState({
              rewardShow: true
            })
          }
        }
        break;
    }
  }

  nextBtnPress(){
    this.showLoading(true);
    var upans="未知";
    if(this.state.data.questionType==="OBJECTIVE_S"){
      for(var key in this.state.ans){
        if(this.state.ans[key]){
          upans = key;
        }
      }
    }else if(this.state.data.questionType==="OBJECTIVE_M"){
      for(var key in this.state.ans){
        if(this.state.ans[key]){
          upans += key + ";";
        }
      }
    }else if(this.state.data.questionType==="SUBJECTIVE"){
      upans = this.state.key_answer;
    }
    if(upans == "未知"){
      this.showLoading(false);
      Toast.show("请选择或者输入答案！")
      return;
    }
    var url = UrlConfig.uploadScore + "?token=" + getCookie("token") + "&questionId=" + this.state.data.id + "&score=" + this.state.data.score + "&answer=" + upans;
    this.setState({
      uploadScoreUrl: url
    })
    ApiAction.post(url);
  }

  handleTotal(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
      WeixinJSBridge.call('closeWindow')
    }else{
      window.close();
    }
  }

  handleReward(){
    Toast.show("请继续完成所有关卡～");
    window.to("/guanka");
  }

  handleBack(){
    window.history.back();
  }

  render() {
    var tit = "第一关(需求调研表)";
    switch(this.state.data.level){
      case 1:
        tit = "第一关(需求调研表)";
        break;
      case 2:
        tit = "第二关(需求调研表)";
        break;
      case 3:
        tit = "第三关(现场投票)";
        break;
      case 4:
        tit = "第四关(满意度调查)";
        break;
    }
    return (
      <div className="question">
        <Loading showLoading={this.state.showLoading}/>
        <Reward show={this.state.rewardShow} num={this.state.data.score || 0} onTouchEnd={this.handleReward.bind(this)} />
        <Total show={this.state.totalShow} onTouchEnd={this.handleTotal}/>
        <div className="header">
          营销大咖秀
        </div>
        <div className="title" onTouchEnd={this.handleBack}>
          <span className="back">{"<"}</span><span>{tit}</span>
        </div>
        <div className="content">
          {this.state.data.no + "." + this.state.data.subject}
        </div>
        {this.renderAnswers()}
        <div className="button">
          <NextButton title="提交" onTouchEnd={this.nextBtnPress.bind(this)}></NextButton>
        </div>
      </div>
    )
  }
}