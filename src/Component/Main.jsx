/* eslint-disable*/
import {Button} from 'react-bootstrap'
import React, {useState} from 'react';
import ItemList from './ItemList'
import axios from 'axios'

let ajaxCall = 0
function Main({props,setProps}) {
  let [isLoading,set_isLoading] = useState(false)
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

  return (
    <>
      <Jumbotron></Jumbotron>
      <div className="container">
        <div className="row">
          <ItemList props={props}/>
        </div>
        {isLoading ? <div>Loading중</div> : null}
        <button className="btn btn-primary" onClick={axiosCall}>더보기</button>
      </div>
    </>
  );
}

export default Main;
