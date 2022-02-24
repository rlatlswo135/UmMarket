import Jumbotron from '../Component/Jumbotron'

function Home(props){
    let payload={
        title:'title',
        content:'content'
    }

    return(
        <>
        <Jumbotron image={{
            image:{
                content:payload,
                image:props.image.home
            }
        }}/>
        <Jumbotron image={{
            image:{
                content:payload,
                image:props.image.home2
            }
        }}/>
        <div>신상품</div>
        </>
    )
}

export default Home