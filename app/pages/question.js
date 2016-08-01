import BasePage from '../components/BasePage.js';
import NextButton from '../components/nextbutton';
export default class extends BasePage {
  componentDidMount(){
    
  }

  renderAnswers(key){
    return (
      <div key={key} className="answerItem">
        <input type="radio" value="A" />{"A.答案A"}
      </div>
    )
  }

  render() {
    return (
      <div className="question">
        <div className="header">
          营销大咖秀
        </div>
        <div className="title">
          <span className="back">{"<"}</span><span>第一关(需求调研表)</span>
        </div>
        <div className="content">
          1.题目
        </div>
        {this.renderAnswers("1")}
        {this.renderAnswers("2")}
        {this.renderAnswers("3")}
        {this.renderAnswers("4")}
        <div className="button">
          <NextButton title="提交"></NextButton>
        </div>
      </div>
    )
  }
}