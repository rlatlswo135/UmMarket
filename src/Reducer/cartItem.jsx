let array = []
function reducerImport2(store=array, action){
  let copy = [...store]
  function editCartQuan(type){
    let target = copy[action.index].stock
    if(type === '+'){
        copy[action.index].quan ++;
        copy[action.index].stock --;
    }
    if(type === '-'){
      if(copy[action.index].quan > 1){
        copy[action.index].stock ++;
        copy[action.index].quan --;
      }
    }
  }
  if(action.type === "cartAdd"){
    let {name,category,clothes,stock} = action.payload
    let filterd = copy.filter(item => item.name === name)
    let cart = {no:1,name,category,clothes,stock,quan:1}

    if(filterd.length !== 0){
      let findIndex = copy.indexOf(filterd[0])
      copy[findIndex].stock --;
      copy[findIndex].quan ++;
    }else{
      if(copy.length !== 0){
        let no = store[store.length-1]['no'] + 1
        cart['no'] = no
      }
      cart.stock --;
      copy.push(cart)
    }
  }
  if(action.type === 'cartRemove'){
    console.log(`cartItem remove`)
    copy.splice(action.index,1)
  }
  if(action.type === '+'){
    editCartQuan('+')
  }
  if(action.type === '-'){
    editCartQuan('-')
  }
  
    return copy
  }

  export default reducerImport2