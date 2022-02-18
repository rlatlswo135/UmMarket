function ItemList({props}){
    //bootstrap문법
    return(
      //그러니 얘도 Link를 /detail/item.id로 보내야겟지? 
      props.map(item => {
        return ( 
          <div key={item.id} className="col-md-4">
            <img src={`${item.img}`} width="100%"></img>
            <h4>{item.title}</h4>
            <p>{item.content}</p>
            <span>{item.price}</span>
          </div>
        )})
      )}

export default ItemList

//여기서 클릭이벤트 넣어주면 될듯? => Link를 쓰던 detail로 넘어가게하고
//그 detail에 프롭스로 데이터를 넘겨주든지 하면될듯?]
