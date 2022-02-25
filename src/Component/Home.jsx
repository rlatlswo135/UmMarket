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
                content:{
                    title:`Style is`,
                    content:`a man's life`
                },
                image:props.image.home
            }
        }}/>
        <Jumbotron image={{
            image:{
                content:{
                    title:`The style`,
                    content:`I'll give you`
                },
                image:props.image.home2
            }
        }}/>
        <div>신상품</div>
        </>
    )
}

export default Home