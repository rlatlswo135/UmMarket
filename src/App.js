/* eslint-disable*/
import './App.css';
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import Main from './Component/Main'
import NavBar from './Component/NavBar'
import ItemDetail from './Component/ItemDetail';
function App() {
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
        <Route exact path="/" component={Main} />
        <Route path="/detail" component={ItemDetail} />
        <Route path="/:id">
          <div>sdfds</div>
        </Route>
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
