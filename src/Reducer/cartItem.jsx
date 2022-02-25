let array = {
  cartItem:[],
  finalPrice:[]
}
function reducerImport2(store=array, action){
  let copy = {...store}

  function totalPrice(array){
    if(array.length === 0) return 0;
    let ARRAY = []
    for(let item of array){
      let typeNumber = Number(item.price.split(',').join(''))
      ARRAY.push(typeNumber * item.quan)
    }
    let result = ARRAY.reduce((item,start) => start+=item,0)
    return result
  }

  function editCartQuan(type){
    let target = copy['cartItem'][action.index].stock
    if(type === '+'){
        copy['cartItem'][action.index].quan ++;
        copy['cartItem'][action.index].stock --;
    }
    if(type === '-'){
      if(copy['cartItem'][action.index].quan > 1){
        copy['cartItem'][action.index].stock ++;
        copy['cartItem'][action.index].quan --;
      }
    }
  }
  if(action.type === "cartAdd"){
    let {name,category,clothes,stock,price} = action.payload
    let filterd = copy['cartItem'].filter(item => item.name === name)
    let cart = {no:1,name,category,price,clothes,stock,quan:1}

    if(filterd.length !== 0){
      let findIndex = copy['cartItem'].indexOf(filterd[0])
      copy['cartItem'][findIndex].stock --;
      copy['cartItem'][findIndex].quan ++;
    }else{
      if(copy['cartItem'].length !== 0){
        let no = store['cartItem'][store['cartItem'].length-1]['no'] + 1
        cart['no'] = no
      }
      cart.stock --;
      copy['cartItem'].push(cart)
    }
  }
  if(action.type === 'cartRemove'){
    console.log(`cartItem remove`)
    copy['cartItem'].splice(action.index,1)
  }
  if(action.type === '+'){
    editCartQuan('+')
  }
  if(action.type === '-'){
    editCartQuan('-')
  }
  copy['finalPrice'] = totalPrice(copy['cartItem'])
    return copy
  }

  export default reducerImport2