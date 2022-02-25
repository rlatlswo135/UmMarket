import { useState,useEffect } from 'react'
import styled from 'styled-components'
import {Button} from 'react-bootstrap'
import '../Css/App.css'
import { CSSTransition } from 'react-transition-group'

const ImgContainer = styled.div`
  width: 100vw;
  height: 80vh;
`
const ImageDiv = styled.div`
  width:100%;
  height:100%;
  margin: 0 auto;
  position:relative;
  color:${props=>props.color};
  background-image:url(${props=>props.image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  /* background-size: 100% 100%; */
`
const ImgContent = styled.div`
  position: absolute;
  top:200px;
  left:80px;
  font-family: Arial, Helvetica, sans-serif;
`
const Title = styled.h1`
  font-size:5em;
`
const Content = styled.p`
  margin-top:3em;
  font-size:3em;
`
function Jumbotron({image}){
  function TestFun({props}){
    return(
      <ImgContent>
        <Title>{props.title}</Title>
        <Content>{props.content}</Content>
      </ImgContent>
    )
  }

    return (
      <>
        <ImgContainer>
            <ImageDiv image={image.image.image} color='white'>
              <TestFun props={ {
                title:image.image.content.title,
                content:image.image.content.content
              } }/>
            </ImageDiv>
        </ImgContainer>
      </>
    )
  }

  export default Jumbotron