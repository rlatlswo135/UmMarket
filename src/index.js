
import React from 'react';
import ReactDOM from 'react-dom';
import './Css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
// redux는 상태관리라이브러리 react-redux는 redux를 react에서 사용가능하게한 라이브러리 그러니 2개가 모두 설치되어있어야
import { combineReducers, createStore } from 'redux'
import {Provider} from 'react-redux'

import reducerImport1 from './Reducer/product'
import reducerImport2 from './Reducer/alertState'

let defaultStore = [
  {id:0,name:'redux-store-1',quan:2},
  {id:1,name:'redux-store-2',quan:3}
] 

function reducer(store = defaultStore,action){
  console.log(`reducer1 action => `)
  console.log(action)
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

/*
store를 여러개만들려면어떨까? => 마찬가지로 reducer함수를 여러개만들고 create할때 묶어주면되는거!
reducer1,2모두 동일한 action이 들어온다 => reducer함수에 각각1번째 인자로넣는 store값을 바까주기위한 로직 2번째인자인 action을이용해서 짜주는거겟지
즉 action은 동일하게들어오지만 변경되는 store는 각함수에 1번째인자로받은 store라는거
*/
function reducer2(store=true, action){
  console.log(`reducer2 action =>`)
  console.log(action)
  let copy = store
  if(action.type === false){
    copy = false
  }
  //action에 따른 store 변경로직

  return copy
}

/*
마찬가지로 인자로 함수를받고 그 인자가 리턴하는값을 store에 저장하는모습 createStore(()=>store)
let store = createStore(reducer) //단일일때는 이렇게하지
redux에서 state느낌  즉. 전역적으로 관리할 state는 redux를통해 여기서 해주는게 좋다는뜻이겟지?
*/


//정삭적으로 import된 모습 쓰는 Component쪽에 store를 props로 바꾸는 함수부분에도 변경을 줘야겟지?
// => Cart컴포넌트 reduxTest 함수부분
let store = createStore(combineReducers({reducerImport1,reducerImport2}))
/*
reducer함수가 여러개 => 즉 store가 여러개일때는 combineReducers 함수를 인자로 넣어주는데
인자로 추가하고싶은 reducer를 obj자료형으로 받는다 => key value가 같으니 축약형으로 쓴 모오습
*/

/* 
해봐서 알겠지만 전역적으로 쓰는 state만 redux로 하는게 편하지
다른컴포넌트에서 쓰지않는 state는 그냥 useState,setState로 관리하는게 가장 편하다.
*/





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
