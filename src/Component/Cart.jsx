import React,{useState} from 'react';
import {Table} from 'react-bootstrap'
import { connect , useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import  '../Css/App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


const Cart = (props) => {
    let history = useHistory();
    console.log('props')
    //받아온 인자안에 아까 product(맨밑)이라는 key로 store데이터가 들어온 모오습
    let cartItem = props.cartItem
    let product = props.product

    /*
    -------> useSelector useDispatch <-------
    let useSelector = useSelector((store) => store);
    console.log(useSelector.reducer1 , reducer2)

    reducer함수로 만든 store들이 나옴 인자로 콜백함수를 받는데 그 콜백함수의 인자에 만든 store들이 모여있다
    
    let disPatach = useDispatch() //마찬가지로 disPatch가 담겨있다

    장점? => 밑에서 따로 connect를 이용해서 store를 props화 할필요도없고, 그러니 참조할때 props.dispatch등 이럴필요도없이
    변수에 저장해놧으니 useSelector.name 등 간편하게 참조를할수있을거다
    */


    let [closeHover, setCloseHover] = useState([])
    function dispatch(action,index=false,payload){
        console.log(`action = ${action} index = ${index}`)
        return props.dispatch({type:action,index,payload})
        /*
        dispatch='보내다' 즉 내가 원하는 상태를 보내는의미인데 redux를 통해 가져온 store에 dispatch라는
        메소드를 이용하는데 dispatch는 인자로 reducer에 보낼 action을 받아서 보내는데 => index.html확인
        */
    }
    /*
    store에따라 dispatch가 갈리는게아니라 container안에 store가 여러개 담기고
    그 container에 dispatch함수가 걸리는듯 즉 store가 2개라고 각각의dispatch가 있는게 아니라는뜻.
    그러니, 밑에 dispatch2함수는 동작이안되는거다 이미 위에 dispatch함수에서 store.dispatch를 정의해놧기때문에
    */

    function dispatch2(action){ //의미없는함수
        return props.dispatch({alert:action})
    }

    return (
        <div className="mt-5">
            <Table responsive="sm">
                {/* 짜여진 뼈대를 보고 thead tbody tr th가 뭘의미하는지 파악해보자 */}
                <thead>
                <tr>
                    <th>No.</th>
                    <th>상품명</th>
                    <th>수량 (재고)</th>
                    <th>수량변경</th>
                </tr>
                </thead>
                {cartItem.length !== 0 ?
                cartItem.map((item,index) => {
                    let obj = {category:item.category,clothes:item.clothes,name:item.name}
                    return(
                        <tbody key={`key${index}`}>
                            <tr>
                                <td>{item.no}</td>
                                <td onMouseLeave={()=>{
                                    setCloseHover([])
                                }} onMouseOver={()=> setCloseHover([index])}>
                                    <span className="cart-item" onClick={()=>history.push(`/detail/${obj.category}/${obj.clothes}/${item.name}`)}>{item.name}</span>
                                    {closeHover[0] === index ? 
                                    <FontAwesomeIcon icon={faTrashCan} className="cart-item ms-5" onClick={()=>{
                                        console.log('remove');
                                        dispatch('cartRemove',index,{...obj,quan:item.quan,stock:item.stock})
                                    }}>x</FontAwesomeIcon> 
                                    : null}
                                </td>
                                <td>
                                    <span>{item.quan}({item.stock})</span>
                                    {item.stock < 0 ? <span>재고부족!</span> : null }
                                </td>
                                <td>
                                    <button onClick={()=>dispatch('+',index,obj)}>+</button>
                                    <button onClick={()=>dispatch('-',index,obj)}>-</button>
                                </td>
                            </tr>
                        </tbody>
                    )
                })
                : <tbody>
                    <tr>
                        <td>{null}</td>
                        <td>{null}</td>
                        <td>장바구니가 비었습니다</td>
                        <td>{null}</td>
                    </tr>
                </tbody>
                }
            </Table>
            {/* 이자리 */}
        </div>
    );
};

function reduxTest(store){
    /*
    redux에 있는 store데이터를 가져와서 props화 시켜주는 기능을가진 함수, 받아온 인자안에 store정보가 담겨있다
    */
    console.log('store')
    console.log(store)
    /*
    reducer함수가 단일(1개)일때는 받아온 인자가 그 reducer함수지만
    복수일경우에는 인자가 obj자료형으로 넘어오고 그안에 reducer들이 있기때문에
    인자.key로 해당 reducer를 참조해서 써야한다
    */

    return {
        // props화 해서 리턴 => 사용하는 컴포넌트쪽에선 받아온 인자에 product key에 value안에 store정보가 들어있겟지?
        product:store.reducerImport1,
        cartItem : store.reducerImport2
        // 그럼 Cart 컴포넌트 안에 받는 props는 2개가있겟지?
    }
}

//connect는 함수를 인자로받고 '함수를' 리턴한다. 그 리턴한 함수에,렌더시킬 컴포넌트를 넣어서 다시 호출하는 모오습
export default connect(reduxTest)(Cart)
/* 
export default connect((store)=>{return {product:store}})(Cart) => 같겟지?
즉 connect함수에 들어갈 인자함수는 store를 어떤 이름으로 내보낼건지 return하는 함수인거같다 
그리고 그 내보낸 store를 어떤 Component에 연결시킬지를 정하는 로직인듯보임
connect(어떤형태로 store를 props화 시킬건지 정하는 함수)(그렇게해서 내보낸 props를 받을 Component)
*/

/* --------------방법2---------------(useSelector,useDispatch사용법)*/

// export default Cart; => 위처럼 connect로 store를 props화시키는 함수는 필요없음

// props ?
//     <div className="scssV2">
//         <p>지금 구매시 신규할인 20%!</p>
//         {/* dispatch2로 하면 안먹히는데 그럼 dispatch함수는 1개여야하나? */}
//         <button onClick={()=>dispatch(false)} className="mt-3">close</button>
//     </div>
//     : null
    