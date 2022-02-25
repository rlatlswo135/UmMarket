/* eslint-disable*/
import {Button,Nav,Tabs,Tab} from 'react-bootstrap'
import React, {useEffect, useState, lazy, Suspense} from 'react';

let ItemList = lazy(()=>import('./ItemList'))
import '../Css/App.css'
import styled from 'styled-components'
import axios from 'axios'
import {useParams,Link, useHistory} from 'react-router-dom'

let ajaxCall = 0

const AlertImg=styled.div`
  width:100%;
  height:100%;
  color:white;
  padding:50px 0px;
  background-image:url('https://p4.wallpaperbetter.com/wallpaper/172/356/933/summer-sea-wallpaper-hd-2560%C3%971600-wallpaper-preview.jpg');
  background-size: cover;
  background-position: center;
`
function Main({props,setProps}) {
  // props에 더미데이터 넘어오니까 category파라미터로 찾아보는걸로 일단테스트
  let [isLoading,set_isLoading] = useState(false)
  let {category,clothes} = useParams();
  let clothesList = Object.keys(props[category])
  let clothIndex = props[category][clothes]
  let jumbPayload = {
    title:'타이틀-main',
    content:'내용-main'
  }
  async function axiosCall(){
    try{
      //axios.post('URL',{key:value}) => axios사용법 참고 = HEADER설정 등
      set_isLoading(true)
      ajaxCall++;
      let res = await axios.get(`https://codingapple1.github.io/shop/data${ajaxCall+1}.json`)
      let copyArray = [...props,...res.data]
      setProps(copyArray)
      set_isLoading(false)
    }catch(e){
      console.log(e)
    }
  }
  function Alert(){
    return(
      <AlertImg>
        <h1 className="alertTitle">Summer Sale</h1>
        <p className="alertContent">up to 50 percent</p>
      </AlertImg>
    )
  }
  useEffect(()=>console.log('Main'))
  return (
    <>
      <Alert/>
      <Nav className="mt-5" variant="tabs" >
        {clothesList.map((item,index) =>{
          return(
            <Nav.Link key={`Navlink-${item}`} active={false} as={Link} eventKey={`link-${item}`} to={`/list/${category}/${item}`}>{item}</Nav.Link>
          )
        })}
      </Nav>
      <div className="container">
        <div className="row mt-5">
          <Suspense fallback={()=><div>Loading</div>}>
            <ItemList props={props[category][clothes]} category={category} clothes={clothes}/>
          </Suspense>
        </div>
        {isLoading ? <div>Loading중</div> : null}
        {/* <button className="btn btn-primary" onClick={axiosCall}>더보기</button> */}
      </div>
    </>
  );
}

export default Main;
