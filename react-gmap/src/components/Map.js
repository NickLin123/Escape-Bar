/*global google getGeoLocation*/ 
import React, {Component} from "react"
import fetch from "isomorphic-fetch";
import MapBody from './MapBody.1'
import QueryBar from './QueryBar'
import CitySelect from './CitySelect'
import StoreInfo from './StoreInfo';
import GameInfo from './GameInfo'
import './map.scss'


class EscapeRoomMap extends React.Component {
  state = {
    currentLatLng:{},
    stores: [],
    name_kw: "",
    city_id: "",
    zoom: 7,
    center: {lat: 23.715, lng: 120.910},
    panTo: {},
    storeId: "",
    storeLogo: "",
    storeName: "",
    storeAdd: "",
    storeTel: "",
    storeOpHr: "",
    gamesInfo: [],

  }
  getStoreByMarker(data){
    this.setState({
      storeId: data.storeId,
      storeLogo: data.storeLogo,
      storeName: data.storeName,
      storeAdd: data.storeAdd,
      storeTel: data.storeTel,
      storeOpHr: data.storeOpHr,
      gamesInfo: data.gamesInfo
    })
    // console.log(data.gamesInfo)
    // console.log(data)

  }

  getCenterByCity(data){
    this.setState({
        city_id: data.city_id,
        zoom: data.city_zoom,
        center: data.city_center,
    })
    console.log(data)

  }

  // 瀏覽器取得經緯度 還要設定 state 的參數
  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          // this.setState({ currentLatLng: {lat: position.coords.latitude, lng: position.coords.longitude} })
          this.setState({ center: {lat: position.coords.latitude, lng: position.coords.longitude}, zoom: 14 })
          // alert(position.coords.latitude + ", " + position.coords.longitude)
          console.log("Current position at: " + position.coords.latitude + ", " + position.coords.longitude)
        }
      )
    } 
  }

  componentWillMount() {
    this.setState({ markers: [] })
    this.getGeoLocation() // 啟動抓取現在經緯度
  }

  componentDidMount() {
    this.setState({
      // zoom: 14, // 測試階段用
      // center: {lat: 25.0521, lng: 121.5440}, // 測試階段用 台灣中心 {lat: 23.715, lng: 120.910}
      storeLogo: "libao.jpg",
      storeName: "請點選地圖上的場館以顯示更多資訊",
      storeAdd: "",
      storeTel: "",
      storeOpHr: ""
    })

  }
  componentDidUpdate(){
    // console.log('Parent update');

  }

  render() {
    return (
      <React.Fragment>
        <div className="mapContainer">
          <div className="mapBody">
            <MapBody
              getStoreByMarker = {data => this.getStoreByMarker(data)}
              zoom = {this.state.zoom}
              center = {this.state.center}
            />
          </div>
          <div className="queryBar">
            <QueryBar/>
          </div>
          <div className="citySelect">
            <CitySelect
              getCenterByCity = {data => this.getCenterByCity(data)}
            />
          </div>
          <div className="mapSideInfo">
            <StoreInfo 
              storeLogo={this.state.storeLogo}
              storeName={this.state.storeName}
              storeAdd={this.state.storeAdd}
              storeTel={this.state.storeTel}
              storeOpHr={this.state.storeOpHr}
              />
            <GameInfo gamesInfo = {this.state.gamesInfo}/>
          </div>
        </div>
      </React.Fragment>
    )
  }
}


export default EscapeRoomMap;


