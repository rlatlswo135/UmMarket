let defaultStore = [
    {id:0,name:'redux-store-1',quan:2},
    {id:1,name:'redux-store-2',quan:3}
  ] 
function reducerImport1(store = defaultStore,action){
  //redux사용이유. 온갖 store=> state에서 setState함수를 계단식으로 내리는거필요없이 이것만보면된다
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
    }if(action.type === 'cartAdd'){
      let filter = copy.filter(item => item.name === action.payload.name)
      if(filter.length !== 0){
        console.log('해당제품 있음')
        let index = copy.indexOf(filter[0])
        copy[index]['quan']++
      }else{
        console.log('해당제품 없음')
        let lastId;
        if(copy.length === 0) lastId = 0
        else lastId = copy[copy.length-1]['id']+1
        copy.push({id:lastId,name:action.payload.name,quan:1})
      }
    }
    if(action.type === 'remove'){
      let filter = copy.filter(item => item.name === action.payload.name)
      let index = copy.indexOf(filter[0])
      copy.splice(index,1)
    }
    /*
    리덕스의 장점. store즉 state를 변경시키려면 컴포넌트가 많을시 setState함수도 전부다 계단식으로 전해줘야해서
    규모가 큰 프로젝트일수록 난감한데 이렇게 쓰면 변경로직 역시 reducer함수만 들여다보면되고,
    (아니라면 state가 전해진 순으로 타고타고타고올라가서 찾아야된다;)
    계단식으로 state,setState를 전달할 필요도없으니 엄청 좋다.
    */
  
    return copy
  }

  export default reducerImport1