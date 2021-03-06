var React = require('react');
module.exports = React.createClass({
  propTypes:{
    title:React.PropTypes.string,
    message:React.PropTypes.string,
    bottomMessage:React.PropTypes.string,
    icon:React.PropTypes.string,
    firstBtnTitle:React.PropTypes.string,
    secondBtnTitle:React.PropTypes.string,
    firstBtnOnTouchEnd:React.PropTypes.func,
    secondBtnOnTouchEnd:React.PropTypes.func
  },
  getDefaultProps:function(){
    return {
      title:'',
      message:'',
      placeholder:'',
      icon:'',
      firstBtnTitle:'取消',
      secondBtnTitle:'完成',
      bottomMessage:''
    }
  },
  getInitialState:function(){
    return {
      text:''
    }
  },
  textChange:function(event){
      this.setState({
        text:text
      });
  },
  render:function(){
    var center={
      width:'76%',
      marginLeft:'10%',
      padding:'2%',
      paddingBottom:15,
      backgroundColor:'white',
      WebkitBorderRadius: 5
    }
    var td={
      textAlign:'center',
      verticalAlign:'middle'
    }
    var table={
      width:'100%',
      height:'100%',
      tableLayout:'fixed'
    }
    var title={
      width:'100%',
      color:'#2E2E2E',
      textAlign:'center',
      paddingTop:17,
      paddingBottom:3,
      fontWeight: 'bold'
    }
    var messageDiv={
      width:'100%',
      color:'#D1D1D1',
      textAlign:'center',
      wordWrap:'break-word',
      paddingTop:5,
      paddingBottom:15
    }
    var textStyle={
      WebkitAppearance:'none',
      border:'1px solid #BEBEBE',
      backgroundColor:'#FFFFFF',
      WebkitBorderRadius: 2,
      display:"inline-block",
      height:35,
      width:'96%',
      paddingLeft:5,
      fontSize:15
    }
    var cancleBtnStyle={
      marginRight:'10%',
      width:'44%',
      WebkitAppearance:'none',
      height:35,
      backgroundColor:'#E2E2E2',
      border:0,
      WebkitBorderRadius: 2,
      color:'#2E2E2E',
      fontSize:'15'
    }

    var nextButtonStyle={
      width:'44%',
      WebkitAppearance:'none',
      height:35,
      backgroundColor:this.props.disabled?'#969696':'#3FA9F5',
      border:0,
      WebkitBorderRadius: 2,
      color:'white',
      fontSize:'15'
    }
    var iconStyle={
      display:this.props.icon===''?'none':'inline-block',
      width:18,
      height:18
    }
    var messageStyle={
      color:'#2E2E2E',
      marginLeft:5,
      display:'inline'
    }
    var iconDiv={
      display:'inline-block'
    }
    var bottomMessageStyle={
      marginTop:5,
      display:this.props.icon===''?'none':'block',
      fontSize:12,
      color:'#FE0000'
    }
    var backStyle={opacity:1}
    var margin54={height:45}
    return (
      <div className={this.props.show ? "show" : "hide"}>
        <div style={backStyle} className="twobtnalert">
          <table style={table}>
            <tbody>
            <tr>
              <td style={td}>
                <div style={center}>
                  <div style={title} dangerouslySetInnerHTML={{__html: this.props.title}} />
                  <div style={messageDiv}>
                    <div  style={iconDiv}>
                      <img style={iconStyle} src={this.props.icon}></img>
                    </div>
                    <div style={messageStyle}>{this.props.message}</div>
                  </div>
                  <div>
                    <TapAble onTap={this.props.firstBtnOnTouchEnd}><input type="button" style={cancleBtnStyle} value={this.props.firstBtnTitle}></input></TapAble>
                    <TapAble onTap={this.props.secondBtnOnTouchEnd}><input type="button" style={nextButtonStyle} value={this.props.secondBtnTitle}></input></TapAble>
                    </div>
                  <div style={bottomMessageStyle}>
                    {this.props.bottomMessage}
                  </div>
                </div>
                <div style={margin54}></div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
});