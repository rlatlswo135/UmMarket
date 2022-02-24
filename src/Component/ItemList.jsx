import {Link} from 'react-router-dom'

function ItemList({props,category,clothes}){
    //bootstrap문법
    if(props.length === 0){
      return(
        <div>물건이 없음</div>
      )
    }
    function clickEvent(index){
      console.log(index)
    }
    console.log(`item list`)
    return(
      //그러니 얘도 Link를 /detail/item.id로 보내야겟지? 
      props.map((item,index) => {
        return ( 
          <Link key={`link-${item.name}`} to={`/detail/${category}/${clothes}/${item.name}`} className="col-md-4">
            <img src={`${item.img}`} width="100%" height="300px"></img>
            <h4 className="pt-4">{item.name}</h4>
            <h6>{item.price+'원'}</h6>
            <p>{item.content}</p>
          </Link>
        )})
      )}

export default ItemList

//여기서 클릭이벤트 넣어주면 될듯? => Link를 쓰던 detail로 넘어가게하고
//그 detail에 프롭스로 데이터를 넘겨주든지 하면될듯?]
