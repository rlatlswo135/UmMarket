import { useHistory } from 'react-router-dom'

function ItemDetail({props}){

    let history = useHistory();

    return(
        <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img alt="notImg" src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%"/>
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">상품명</h4>
            <p>상품 설명</p>
            <p>price</p>
            <button className="btn btn-danger">주문하기</button>
            <button className="btn btn-danger" onClick={()=>{
                history.goBack();
                //history hook의 사용법은 react-router-dom 공식문서참조! 
            }}>back</button>
          </div>
        </div>
      </div>
    )
}

export default ItemDetail