function reducerImport2(store=true, action){
    console.log(`reducer2 action =>`)
    console.log(action)
    let copy = store
    if(action.type === false){
      copy = false
    }
    //action에 따른 store 변경로직
  
    return copy
  }

  export default reducerImport2