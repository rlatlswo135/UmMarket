import DummyData from '../dummydata/data'
let defaultStore = {
  ...DummyData
} 
function reducerImport1(store = defaultStore,action={payload:''}){
  //redux사용이유. 온갖 store=> state에서 setState함수를 계단식으로 내리는거필요없이 이것만보면된다
    /*
    reducer함수 즉 createStore에 인자로 들어갈 함수는 리턴값이 store로 만들어지는데,
    2번째인자가 action이라는 dispatch함수가 보내는 리턴값이 들어오게된다 => Cart.jsx참조
    dispatch 로 보내진 action이 건너오고 이 action은 내맘대로 커스텀가능한 obj. 즉 그후 로직은 내맘이라는거
    */
   function editStock(type){
    let {category,clothes,name} = action.payload
    let clothesArray = copy[category][clothes]
    let filtered = clothesArray.filter(item => item.name === name)
    let index = clothesArray.indexOf(filtered[0])
    let target = copy[category][clothes][index].stock
    if(type === 'cartRemove'){
      copy[category][clothes][index].stock  = action.payload.quan + action.payload.stock
    }
    //cart쪽에서 재고부족알림까지 +하고 마이너스시 재고가 마이너스에 맞춰서움직여야하는데
    //0부터 시작한다 => 수정후 메인페이지에 추천아이템 이런거 떠주면 마무리될듯? 
    if(type === '+'){
      copy[category][clothes][index].stock ++;
    }
    if(type === '-'){
        copy[category][clothes][index].stock --;
    }
   }
    let copy = {...store}

    //setState와 마찬가지로 안정성을 위해 DeepCopy를 해서 데이터를수정한모오습

    if(action.type === 'cartAdd'){
      //재고목록에서 cartAdd => stock -1해야
      editStock('-')
    }
    if(action.type === 'cartRemove'){
      editStock('cartRemove')
    }
    if(action.type === '+'){
      console.log('장바구니 + 재고는 -')
      editStock('-')
    }
    if(action.type === '-'){
      console.log('장바구니 - 재고는 +')
      editStock('+')
    }

    // }
    /*
    리덕스의 장점. store즉 state를 변경시키려면 컴포넌트가 많을시 setState함수도 전부다 계단식으로 전해줘야해서
    규모가 큰 프로젝트일수록 난감한데 이렇게 쓰면 변경로직 역시 reducer함수만 들여다보면되고,
    (아니라면 state가 전해진 순으로 타고타고타고올라가서 찾아야된다;)
    계단식으로 state,setState를 전달할 필요도없으니 엄청 좋다.
    */
    return copy
  }

  export default reducerImport1