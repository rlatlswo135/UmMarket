import styled from 'styled-components'
import {Button} from 'react-bootstrap'

const ImageDiv = styled.div`
  padding-top:40px;
  padding-bottom: 40px;
  color:${props=>props.color};
  background-image:url('https://p4.wallpaperbetter.com/wallpaper/172/356/933/summer-sea-wallpaper-hd-2560%C3%971600-wallpaper-preview.jpg');
  background-size: cover;
  
`
function Jumbotron(props){
  console.log(props.image)
    return (
      <ImageDiv image={props.image} color='white'>
        <h1>Season Off</h1>
        <p>여름할인</p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </ImageDiv>
    )
  }

  export default Jumbotron