import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './charlie.scss';

class startActivity extends Component {
  constructor(props){
    super(props);
    this.state={
      activities: [],
      game_title:'',
      s_name:'',
      sel_time:'',
      current_people:'',
      need_people:'',
      t_created_at:'',
      t_deadline:'',
      searchValue: [],
      keywordOpen: '',
      text: '',
      sid: '',
      text_keyDown: '',
      selectOption: [],
      PRO_SEQ: '',
    }
  }

  changeGameHandler = (evt)=>{
    let text = evt.target.value;
    if(text === ""){
      this.setState({
        text: text,
        keywordOpen: 'close'
      });
    }else{
      this.setState({
        text: text,
        keywordOpen: ''
      });

      fetch('http://localhost:3000/startActivity/game/' + text)
      .then(res=>res.json())
      .then(searchValue => this.setState({
        searchValue: searchValue
      }))
    }
  }

  keywordDown = (evt) => {
    let text = evt.target.dataset.text;
    this.setState({
      text: text,
      keywordOpen : 'close',
      text_keyDown: text
    });
  }

  changeHandler = (evt) =>{
    const inputName = evt.target.name;
    const inputValue = evt.target.value;
    this.setState({
      [inputName]:inputValue,
    })
  }

  NOW = () => {
    var date = new Date();
    var yyyy = date.getFullYear();
    var dd = date.getDate();
    var mm = (date.getMonth() + 1);

    if (dd < 10)
        dd = "0" + dd;
    if (mm < 10)
        mm = "0" + mm;

    var cur_day = yyyy + "-" + mm + "-" + dd;

    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds();

    if (hours < 10)
        hours = "0" + hours;
    if (minutes < 10)
        minutes = "0" + minutes;
    if (seconds < 10)
        seconds = "0" + seconds;

    return cur_day + " " + hours + ":" + minutes + ":" + seconds;
  }

  startHandler = (evt) =>{
    // 需先行判斷用戶是否有登入
    evt.preventDefault();
    const now = this.NOW();

    var hostActivity ={
      act_uid: 4, //＊記得修改：登入會員id由會員資料庫撈取資料
      pro_name: this.state.pro_name,
      s_name: this.state.s_name,
      sel_time: this.state.sel_time,
      default_people: this.state.default_people,
      ask_people: this.state.ask_people,
      current_people: this.state.default_people,
      // goal_people應由設定產生，需調整
      goal_people: this.state.default_people + this.state.ask_people,
      t_created_at: now,
      t_deadline: this.state.t_deadline
    }
    fetch("http://localhost:3000/startActivity/activity_list",{
          method: 'POST',
          body: JSON.stringify(hostActivity),
          headers: new Headers({'Content-Type':'application/json'})
    }).then(res=>res.json()) //(message:'新增成功')
    .then(data=>{
        alert(data.message);
        this.getActivities();
    })
  }

  
  render(){
    return(
      <React.Fragment>
        <div className="card d-flex align-items-center justify-content-center mb-4 bannerStartActivity">
          <img className="bannerStartActivityImg" src="images/banner_startActivity.jpg"/>
          <div className="z_Info d-flex flex-column justify-content-center align-items-center">
            <h2>找不到人一起玩密室逃脫嗎？</h2>
            <h2>快來試試揪團功能</h2>
            <button type="button" className="btn btn-primary mt-3" id="hostNewActivityBtn" data-toggle="modal" data-target="#exampleModalCenter" data-backdrop="static">
            開啟新的揪團
            </button>
          </div>
        </div>

        <div className="a_space"></div>
        <h4 id="a_center">火熱揪團中</h4>
        <hr id="a_hr"></hr>
        <div className="container">
          <div className="row">
            {this.state.activities.map(activities =>
            <div className="my-3 col-md-4" key={activities.tid}>
              <div className="card bg-light mx-2">
                <img className="card-img-top gameImg" src={`/images/${activities.IMG_NAME}`} alt="Card image cap"/>
                <div className="card-body">
                  <h5 className="removeMargin">{activities.PRO_NAME}</h5>
                  <span className="activityS_name">{activities.s_name}</span>
                  <div className="userInfoBox mt-1">
                      <img className="userImg" src={`/images/${activities.user_pic}`}/>
                      <p className="removeMargin p_center">{activities.nickname}</p>
                  </div>
                  <div className="row justify-content-around progressInfoBox mt-2">
                    <div className="col">
                      <p className="removeMargin p_center">尋找</p>
                      <h3 className="removeMargin p_center">{activities.goal_people}</h3>
                      <p className="p_center">名隊友</p>
                    </div>
                    <div className="col p_center">
                      <p className="removeMargin p_center">目前</p>
                      <h3 className="removeMargin p_center">{activities.current_people}</h3>
                      <p className="p_center">組隊</p>
                    </div>
                    <div className="col p_center">
                      <p className="removeMargin p_center">剩下</p>
                      <h3 className="removeMargin p_center activityAsk_people">{activities.ask_people}</h3>
                      <p className="p_center">名缺額</p>
                    </div>
                  </div>

                  <div className="progress" style={{height: 6 + "px"}}>
                    <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={{width: (activities.current_people / (activities.goal_people) * 100) + "%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <Link to={`${this.props.match.url}/activityInfo/${activities.tid}`} style={{textDecoration: "none"}}><button className="btn btn btn-outline-info btn-sm mt-3 center-block" id="detailInfoBtn">了解詳情</button></Link> 
                </div>
              </div>
            </div>)}
          </div>
        </div>
        <div className="a_space"></div>
        
      
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">發布揪團</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">遊戲名稱：</label>
                    <div className="col-sm-6">
                      <input type="text" className="form-control" name="game_title" onChange={this.changeGameHandler} value={this.state.text}/>
                      <div className="searchBox">
                        {this.state.searchValue.map(searchValue=>
                            <div key={searchValue.PRO_SEQ} className={"text_results" + " " + this.state.keywordOpen} onClick={this.keywordDown} data-text={searchValue.PRO_NAME}>{searchValue.PRO_NAME}</div>
                        )}
                      </div>
                    </div>
                    <select id="siteSelect" className="siteSelect" value={this.state.PRO_SEQ} onChange={this.selectedHandler}>
                      { 
                          this.state.selectOption.map(selectOption => 
                          <option
                              key={selectOption.PRO_SEQ}
                              name={selectOption.PRO_SEQ}   
                              value={selectOption.PRO_SEQ}>
                              {selectOption.s_name}
                          </option>
                      )}
                    </select>
                      
                  </div>

                    

                  {/* <div className="form-group row">
                    <label className="col-sm-2 col-form-label">揪團時間：</label>
                    <div className="col-sm-6">
                      <input type="text" className="form-control" name="sel_time" onChange={this.changeHandler}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">建議人數</label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" name="suggest_people" onChange={this.changeHandler}/>
                    </div>
                    <label className="col-sm-2 col-form-label">遊戲時長：</label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" name="game_time" onChange={this.changeHandler}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">目前人數：</label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" name="current_people" onChange={this.changeHandler}/>
                    </div>
                    <label className="col-sm-2 col-form-label">所需人數：</label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" name="ask_people" onChange={this.changeHandler}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">目標人數：</label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" name="goal_people" onChange={this.changeHandler}/>
                    </div>
                    <label className="col-sm-2 col-form-label">截止時間：</label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" name="t_deadline" onChange={this.changeHandler}/>
                    </div>
                  </div> */}
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.startHandler} data-dismiss="modal">發布揪團</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  selectedHandler = (evt) =>{
    let PRO_SEQ = evt.target.value;
    this.setState({
        PRO_SEQ: PRO_SEQ
    });
  }

  getSelectOption = () =>{
    fetch("http://localhost:3000/startActivity/site/selectOption/" + this.state.text_keyDown,{
        method: 'GET',
        }).then(res=>res.json())
        .then(data => {
            this.setState({
                selectOption: data
            })
        });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.text_keyDown !== this.state.text_keyDown){
      this.getSelectOption();
    }
  }

  componentDidMount = () =>{
    this.getActivities();
  }

  getActivities(){
    fetch('http://localhost:3000/startActivity/activity_list')
    .then(res=>res.json())
    .then(activities => this.setState({
      activities: activities
    }))
  }

  
}

export default startActivity;