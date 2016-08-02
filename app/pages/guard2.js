import BasePage from '../components/BasePage.js';
export default class extends BasePage {
  componentDidMount(){
    
  }

  gotoQ3(){
    window.to("/question?level=3")
  }

  gotoQ4(){
    window.to("/question?level=4")
  }

  render() {
    return (
      <div className="guard1">
        <img onTouchEnd={this.gotoQ3} className="ka1" src="/images/3.png" />
        <img onTouchEnd={this.gotoQ4} className="ka2" src="/images/4.png" />
      </div>
    )
  }
}