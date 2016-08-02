import BasePage from '../components/BasePage.js';
export default class extends BasePage {
  componentDidMount(){
    
  }

  gotoQ1(){
    window.to("/question?level=1")
  }

  gotoQ2(){
    window.to("/question?level=2")
  }

  render() {
    return (
      <div className="guard1">
        <img onTouchEnd={this.gotoQ1} className="ka1" src="/images/1.png" />
        <img onTouchEnd={this.gotoQ2} className="ka2" src="/images/2.png" />
      </div>
    )
  }
}