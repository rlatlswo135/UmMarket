/* eslint-disable*/
import {Button,Nav,Tabs,Tab} from 'react-bootstrap'
import React, {useEffect, useState, lazy, Suspense} from 'react';

let ItemList = lazy(()=>import('./ItemList'))

import axios from 'axios'
import {useParams,Link} from 'react-router-dom'

let ajaxCall = 0
function Main({props,setProps}) {
  // props에 더미데이터 넘어오니까 category파라미터로 찾아보는걸로 일단테스트
  let [isLoading,set_isLoading] = useState(false)
  let {category,clothes} = useParams();
  let clothesList = Object.keys(props[category])
  let clothIndex = props[category][clothes]

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
  function Jumbotron(){
    return (
      <div className="Jumbotron">
        <h1>Season Off</h1>
        <p>여름할인</p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </div>
    )
  }
  useEffect(()=>console.log('Main'))
  return (
    <>
      <Jumbotron></Jumbotron>

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
        <button className="btn btn-primary" onClick={axiosCall}>더보기</button>
      </div>
    </>
  );
}

export default Main;
