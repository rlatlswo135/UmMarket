import React from 'react';
import {Table} from 'react-bootstrap'
import { connect } from 'react-redux';


const Cart = (props) => {
    console.log('props')
    //받아온 인자안에 아까 product(맨밑)이라는 key로 store데이터가 들어온 모오습
    console.log(props)

    function dispatch(action,index){
        return props.dispatch({type:action,index})
        /*
        dispatch='보내다' 즉 내가 원하는 상태를 보내는의미인데 redux를 통해 가져온 store에 dispatch라는
        메소드를 이용하는데 dispatch는 인자로 reducer에 보낼 action을 받아서 보내는데 => index.html확인
        */
    }

    return (
        <div className="mt-5">
            <Table responsive="sm">
                {/* 짜여진 뼈대를 보고 thead tbody tr th가 뭘의미하는지 파악해보자 */}
                <thead>
                <tr>
                    <th>Id</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경</th>
                </tr>
                </thead>
                {props.product.map((item,index) => {
                    return(
                        <tbody key={`key${index}`}>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.quan}</td>
                                <td>
                                    <button onClick={()=>dispatch('+',index)}>+</button>
                                    <button onClick={()=>dispatch('-',index)}>-</button>
                                </td>
                            </tr>
                        </tbody>
                    )
                })}
            </Table>
        </div>
    );
};

function reduxTest(store){
    /*
    redux에 있는 store데이터를 가져와서 props화 시켜주는 기능을가진 함수, 받아온 인자안에 store정보가 담겨있다
    */
    console.log('store')
    console.log(store)
    return {
        // props화 해서 리턴 => 사용하는 컴포넌트쪽에선 받아온 인자에 product key에 value안에 store정보가 들어있겟지?
        product:store
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
// export default Cart;