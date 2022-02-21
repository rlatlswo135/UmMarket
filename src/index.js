
import React from 'react';
import ReactDOM from 'react-dom';
import './Css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
// redux는 상태관리라이브러리 react-redux는 redux를 react에서 사용가능하게한 라이브러리 그러니 2개가 모두 설치되어있어야
import { createStore } from 'redux'
import {Provider} from 'react-redux'

let defaultStore = [
  {id:0,name:'redux-store-1',quan:2},
  {id:1,name:'redux-store-2',quan:3}
] 

function reducer(store = defaultStore,action){
  /*
  reducer함수 즉 createStore에 인자로 들어갈 함수는 리턴값이 store로 만들어지는데,
  2번째인자가 action이라는 dispatch함수가 보내는 리턴값이 들어오게된다 => Cart.jsx참조
  dispatch 로 보내진 action이 건너오고 이 action은 내맘대로 커스텀가능한 obj. 즉 그후 로직은 내맘이라는거
  */
  let copy = [...store]
  //setState와 마찬가지로 안정성을 위해 DeepCopy를 해서 데이터를수정한모오습
  if(action.type === '+'){
    copy[action.index].quan++;
  }if(action.type === '-'){
    if(copy[action.index].quan !== 0){
      copy[action.index].quan--;
    }
  }
  /*
  리덕스의 장점. store즉 state를 변경시키려면 컴포넌트가 많을시 setState함수도 전부다 계단식으로 전해줘야해서
  규모가 큰 프로젝트일수록 난감한데 이렇게 쓰면 변경로직 역시 reducer함수만 들여다보면되고,
  (아니라면 state가 전해진 순으로 타고타고타고올라가서 찾아야된다;)
  계단식으로 state,setState를 전달할 필요도없으니 엄청 좋다.
  */

  return copy
}

//마찬가지로 인자로 함수를받고 그 인자가 리턴하는값을 store에 저장하는모습 createStore(()=>store)
let store = createStore(reducer)
//redux에서 state느낌  즉. 전역적으로 관리할 state는 redux를통해 여기서 해주는게 좋다는뜻이겟지?

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      {/* 이렇게 Provider 컴포넌트로 감싸진 컴포넌트늘은 모두 store를 공유할수 있게된다 */}
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
