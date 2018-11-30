import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import './main.scss'

class Footer extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <React.Fragment>
                <footer className="footer">
                    <ul className="footerList">主要功能
                        <li className="footerItem">找遊戲</li>
                        <li className="footerItem">找工作室</li>
                        <li className="footerItem">用地圖找</li>
                        <li className="footerItem">揪團一起玩</li>
                        <li className="footerItem">線上玩遊戲</li>
                    </ul>
                    <ul className="footerList">關於密室逃脫
                        <li className="footerItem">什麼是密室逃脫</li>
                        <li className="footerItem">福委活動與教育訓練</li>
                        <li className="footerItem">密室逃脫的二三事</li>
                    </ul>
                    <ul className="footerList">關於逃脫吧
                        <li className="footerItem">關於我們</li>
                        <li className="footerItem">如何使用</li>
                        <li className="footerItem">網站地圖</li>
                        <li className="footerItem">會員條款與隱私政策</li>
                    </ul>
                    <ul className="footerList">與我們聯繫
                        <li className="footerItem">資料誤植與補遺</li>
                        <li className="footerItem">團體活動諮詢</li>
                        <li className="footerItem">合作洽詢</li>
                    </ul>
                    <div className="footerList">接收第一手消息！
                        <div className="my-2">
                            <input className="subscribeInput px-2 mr-2" placeholder="輸入您的Email"></input>
                            <Button color="success">訂閱</Button>
                        </div>
                        <div className="my-2">
                            <img className="socialIcon mr-2" src="/img/facebook.png"></img>
                            <img className="socialIcon mx-2" src="/img/line.png"></img>
                        </div>
                    </div>
                </footer>
                <div className="copyright">
                    <h6>Copyright© 2018 逃脫吧 Escape Bar</h6>
                </div>
            </React.Fragment>
        );
    }
}
export default Footer;