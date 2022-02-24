
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
import reducerImport2 from './Reducer/cartItem'

/*
store를 여러개만들려면어떨까? => 마찬가지로 reducer함수를 여러개만들고 create할때 묶어주면되는거!
reducer1,2모두 동일한 action이 들어온다 => reducer함수에 각각1번째 인자로넣는 store값을 바까주기위한 로직 2번째인자인 action을이용해서 짜주는거겟지
즉 action은 동일하게들어오지만 변경되는 store는 각함수에 1번째인자로받은 store라는거
*/

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
