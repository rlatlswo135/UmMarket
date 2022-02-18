import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import '../Css/Detail.scss'
// scss란 무엇일까?

const Box = styled.div`
  padding:20px;
`
const Title = styled.h4`
  font-size:25px;
  color:${props => props.color};
`
// 하나의 청사진만있으면 원하는건 이렇게 props를 뚫어서 쓸수있겟네? 더다양한기능이있을까? => 공식문서참조

function ItemDetail({props}){
    let { id } = useParams();
    /*
    let obj = useParams();
    obj.id => 내가찾는거 즉 useParams()함수는 내 parmas가담긴 obj를 return하는듯
    */
    let history = useHistory();
    let [item] = props.filter(item => item.id === Number(id))
    /*
    filter를 쓴이유 => id를 parameter로 받아서 만약에 전체 data의 index로 detail페이지를 render한다면
    정렬기능이나 이런걸 추가했을때 index로하면 렌더되는 페이지가 id에따라 나와야하는데 정렬로인해 배열 순서가 바뀌어서
    결과가 다르게나올수있다 그러니. id params에 담긴 값에 매칭되는 데이터를 콕 찾아서 넣기위해서 필터썻음
    */ 

    return(
    <div className="container">
        <Box>
          {/* 속성에 js-code를 안쓸꺼면 그냥 string으로 해도되겟지? react짜봣자너 */}
          <Title color="blue">title</Title>
          <Title color="red">title</Title>
          <Title className="scss">title</Title>
          <div className="scssV2">Alert Content</div>
          <div className="scssV3">Extend Test</div>
          <div className="scssV4">@mixin - @include</div>
        </Box>
        <div className="row">
          <div className="col-md-6">
            <img alt="notImg" src={`https://codingapple1.github.io/shop/shoes${Number(id)+1}.jpg`} width="100%"/>
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{item.title}</h4>
            <p>{item.content}</p>
            <p>{item.price}</p>
            <button className="btn btn-danger">주문하기</button>
            <button className="btn btn-danger" onClick={()=>{
                history.goBack();
                //history hook의 사용법은 react-router-dom 공식문서참조! 
            }}>back</button>
          </div>
        </div>
      </div>
    )
}

export default ItemDetail