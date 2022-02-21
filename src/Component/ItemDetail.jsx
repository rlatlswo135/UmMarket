import { useContext } from 'react'
import { CSSTransition } from'react-transition-group'
//css에 transition 기능을 좀더 쉽게사용하게하는 라이브러리 => 그럼원래의 사용법도 중요하게 알아둬야겟지?
import {Nav} from 'react-bootstrap'
import { useState,useEffect } from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import '../Css/Detail.scss'
import {stock_context} from '../App'
// scss란 무엇일까?

const Box = styled.div`
  padding:20px;
`
const Title = styled.h4`
  font-size:25px;
  color:${props => props.color};
`
// 하나의 청사진만있으면 원하는건 이렇게 props를 뚫어서 쓸수있겟네? 더다양한기능이있을까? => 공식문서참조

function ItemDetail({props,stock,setStock}){
  /*
  Context API 전달하려는쪽에서 React.createContext()로 context를 만들고
  제공하려는 Component를 context.Provider를 해주면 컴포넌트가 툭튀어나오고 value={state}옵션을 주면
  해당 state를 공유하려는 컴포넌트들을 context.provider컴포넌트로 감싸게되면 모두다 그 state를 공유하게된다
  사용하려는쪽에서 useContext(context)를 해주면 해당 state가 나온다
   */
    let [tab_ani_switch,set_ani_switch] = useState(false)
    let [tab,setTab] = useState(0)
    let context_stock = useContext(stock_context);
    console.log(context_stock) // 잘받아온 모오습

    let [input_data,set_input_data] = useState();
    let [alert_switch,set_alert_switch] = useState(true)
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
   
    function StockInfo({props}){
      return(
        <p>재고 : ${props}</p>
      )
    }
    function tabClick(state){
      // if(state[])
    }
    /*
    LifeCycle-Hook? => class vs function

    class hooks extends React.Component{
      componentDidMount(){
        해석그대로, 컴포넌트가 마운트될때 실행할것 (등장)
      }
      componentWillUnmount(){
        해석그대로, 컴포넌트가 언마운트될때 실행할것 (퇴장)
      }
    }
    vs 
    useEffect(()=>{ 인자로 함수를받네?
      컴포넌트가 마운트될때(등장) + 컴포넌트가 update될때 실행됨
      => 지금은 ItemDetail 컴포넌트 내에 썻기때문에 해당 컴포넌트가 마운트,update될때마다 콘솔이 찍히겟지?
      console.log(111)
    })
    */
   useEffect(()=>{
     console.log('mount')
     /*
     보통 타이머함수는 나중에 제거(clearTimeout)하기 편하기위해 변수에담아둔다
      => 2초뒤에 state를 변경하는 코드인데 만약 user가 2초가안되서 페이지를 나가버리면 해당코드는 실행되면 안되는데, 쭉 실행된다
     그래서 unmount부분에 clearTimeout을 해서 setTimeout함수의 동작을 취소시키는거지
     ex)console.log('wake')가 2초뒤에 나오는데 2초가 안되서 페이지를 나가면 나간페이지에서 console 이 뜬다 clearTimeout하면 안뜬다.
     */
     let timer = setTimeout(()=>{set_alert_switch(false)},2000) //마운트시(등장)
     return function unmout(){ clearTimeout(timer) } //언마운트시(퇴장)
     //언마운트시 function을 리턴하는형태가 언마운트의 형태인듯 테스트한결과 일단은 둘다실행되긴함
   },[])
  //  useEffect(()=>{}) //중복으로 써도된다 하지만 실행순서는 알다시피 코드블럭순 => 2번째인자로 재렌더링의 조건을 넣어줄수있다

  function TabContent(props){
    /*
    렌더링이 될때 스위치를 true로 바꿈으로써 ani실행 false->true일때.
    useEffect를 안쓰면 경고창에 tabcontent를 렌더링하는동안 itemdetail컴포넌트를 렌더링할수 없다고나옴
    왤까? 그냥 안전하게 useEffect를 써주자
    */
    useEffect(()=>{
      props.set_ani_switch(true)
    },[])
    return(
      <div>{`${props.tab}번째 Content입니다`}</div>
    )
  }
    return(
    <div className="container">
        <Box>
          {/* 속성에 js-code를 안쓸꺼면 그냥 string으로 해도되겟지? react짜봣자너 */}
          <Title color="blue">title</Title>
          <Title color="red">title</Title>
          <Title className="scss">title</Title>
          {/* state값이 바뀌니 재렌더링이 되는 모오오습 */}
          {input_data}<input onKeyUp={(e)=>set_input_data(e.target.value)}/>
          {alert_switch ?<>
            <div className="scssV2">Alert Content</div>
            <div className="scssV3">Extend Test</div>
            <div className="scssV4">@mixin - @include</div>
            </>
           : null}

        </Box>
        <div className="row">
          <div className="col-md-6">
            <img alt="notImg" src={`https://codingapple1.github.io/shop/shoes${Number(id)+1}.jpg`} width="100%"/>
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{item.title}</h4>
            <p>{item.content}</p>
            <p>{item.price}</p>
            <StockInfo props={stock}/>
            <button className="btn btn-danger" onClick={()=>{
              // 항상 state를 다시 set할때는 사본을 만들어서 하는게 안전하고 중요.
              let copy = stock;
              setStock(copy-1)
            }}>주문하기</button>
            <button className="btn btn-danger" onClick={()=>{
                history.goBack();
                //history hook의 사용법은 react-router-dom 공식문서참조! 
            }}>back</button>
          </div>
        </div>
        {/* bootstraop문법 default? => 말그대로 방문시 어떤탭이눌린채로 보여줄꺼냐를 의미 */}
        <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link onClick={()=>{set_ani_switch(false); setTab(0);}} eventKey="link-0">Tap1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{set_ani_switch(false); setTab(1);}} eventKey="link-1">Tap2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{set_ani_switch(false); setTab(2);}} eventKey="link-2">Tap3</Nav.Link>
          </Nav.Item>
        </Nav>

        {/*
        CSStransition을 import해왓으면 컴포넌트를 import해온건데 효과를 주고싶은 컴포넌트를 감싸주면된다 컨텍스트마냥
        그러고 in className's' timeout속성을 주면되는데 in은 switch같은느낌이다 true일때만 효과를 주는 그런느낌.
         */}
        <CSSTransition in={tab_ani_switch} classNames="myTransition" timeout={500}>
          <TabContent tab={tab} set_ani_switch={set_ani_switch} />
        </CSSTransition>
      </div>
    )
}

export default ItemDetail