/* eslint-disable*/
import {Button} from 'react-bootstrap'
import React, {useState} from 'react';
import data from '../data'
import ItemList from './ItemList'

function Main() {
  let [shopData ,setShopData] = useState(data)

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
          <ItemList props={shopData}/>
        </div>
      </div>
    </>
  );
}

export default Main;
