/* eslint-disable*/
import {Button} from 'react-bootstrap'
import React, {useState} from 'react';
import ItemList from './ItemList'

function Main({props}) {
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
      </div>
    </>
  );
}

export default Main;
