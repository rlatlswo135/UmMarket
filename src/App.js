/* eslint-disable*/

import React, {useState , lazy , Suspense} from 'react'
import './Css/App.css';
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import Main from './Component/Main'
import NavBar from './Component/NavBar'
import Home from './Component/Home'
import DummyData from './dummydata/data'
import jumboImage from './dummydata/jumbotImage'
// import ItemDetail from './Component/ItemDetail';

let ItemDetail = lazy(()=>import('./Component/ItemDetail'))
let Cart = lazy(() => import('./Component/Cart'))
import data from './data'
//Context API
export let stock_context = React.createContext();
/*
이용하려는쪽에서 useContext(context)를 해줘야하기때문에 context를 export (default가 아니니 {}로 import해와야)
context를 여러개만들어서 각각 다른 state를 공유할 범위를 커스텀해서 짜줄수있다
*/

function App() {
  let [shopData ,setShopData] = useState(DummyData)
  let [stock, setStock] = useState(100)
  /*
  App => ItemDetail => StockInfo 순으로 state전달 계단식으로밖에안됨
  그럼 App에 state를 set하기위한 함수역시 저렇게 계단순으로 전송해야.
  그럼 Component가 많을수록 state도 많아지고 그러면 위에처럼 상태관리도 복잡하잖아?

  그래서 이용하는게 Context API or Redux (상태관리 라이브러리들)
  2.20 => redux배울차례
  */

  /* 
  오류 NavBar안에 Link컴포넌트가 쓰엿는데 NavBar컴포넌트를 Switch(Router)컴포넌트 밖에다쓰니
  url만 바뀌고(컴파일시 앵커태그로 나오니까) 컴포넌트는 렌더링하지않았다 그러니
  Switch(Router)컴포넌트안에 Link컴포넌트가 들어가게끔 NavBar컴포넌트도 안에 집어넣엇더니 해결
  => 잘못된생각 App컴포넌트를 이미 Broweser라우터가 덮고있기때문에 상관없음, 위에 import가 문제엿음
  */
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        {/* Context API */}
        <stock_context.Provider value={stock}>
          <Route exact path="/" render={()=><Home image={jumboImage}/>} />
          <Route path="/list/:category/:clothes" render={()=><Main props={shopData} setProps={setShopData}/>} />
          <Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/detail/:category/:clothes/:name" render={()=> <ItemDetail props={shopData} setStock={setStock} stock={stock}/>} />
          <Route path="/cart" render={() => <Cart />}/>
          </Suspense>
        </stock_context.Provider>
        {/* <Route path="/:id">
          <div>sdfds</div>
        </Route> */}
      </Switch>

      {/* <Route path="/path" component={Component}></Route> */}
      {/* 즉 html안에 content를 갈아치워서 페이지전환의 느낌을 주게하는 */}

      {/* 위처럼 url파라미터문법을 쓰게되면 path가 /detail인데도
      파라미터문법까지 깡그리 적용되서 Anything이라는 컴포넌트도 같이보인다
      그렇기때문에 Switch라는 기능으로 라우터들을 하나로 묶어서 한개씩만 켜질수있도록 만져주는건데
      맨위에있는것부터 순서대로 매칭되는게 켜진다. 그러니까 /detail이 path일때가 위니까
      저게켜지고 파라미터문법으로 path가된거는 꺼지겟지(스위치니까) 마찬가지로 그러면
      path = / 인것도 exact 속성을 안써주더라도 저게 맨위니까 Main컴포넌트만 보이겟지 */}
    </div>
  );
}

export default App;
