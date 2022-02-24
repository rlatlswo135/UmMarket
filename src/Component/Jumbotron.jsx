import styled from 'styled-components'
import {Button} from 'react-bootstrap'

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
const ImgContainer = styled.div`
  width: 100vw;
  height: 80vh;
`
const ImgContent = styled.div`
  position: absolute;
`
function Jumbotron({image}){
    return (
      <>
        <ImgContainer>
        <ImageDiv image={image.image.image} color='white'>
          <ImgContent>
            <h1>{image.image.content.title}</h1>
            <p>{image.image.content.content}</p>
          </ImgContent>
        </ImageDiv>
        </ImgContainer>
      </>
    )
  }

  export default Jumbotron