/* eslint-disable*/
import { Button,Container,Navbar,Nav,Form,FormControl,NavDropdown, NavItem } from 'react-bootstrap';
import '../Css/App.css';
import {Link} from 'react-router-dom'
import DummyData from '../dummydata/data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
{/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
function NavBar(){

    function Category(){
            return (
                Object.keys(DummyData).map((item,index) => {
                return(
                    <NavDropdown className="ms-3" key={`drop${index}`} title={item} autoClose={true} id="basic-nav-dropdown">
                        {Object.keys(DummyData[item]).map((category,idx) => {
                            return(
                                <NavDropdown.Item key={`${item}-link-${idx}}`} as={Link} to={`/list/${item}/${category}`}>
                                    {category}
                                </NavDropdown.Item>
                            )
                        })}
                    </NavDropdown>
                )
            }))
        }
    function search(){
        return console.log('search')
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
            <Navbar.Brand href="/">
                <img alt="notImg" src="https://image.fmkorea.com/files/attach/new/20190919/494354581/54500371/2198823684/0cee42387d64b82673c4fcbee00b2bc6.jpg" width="25px"/>
                Um-Market
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                {/* /* <Nav.Link as={Link} to="/">Home</Nav.Link> */}
                {/*
                <Nav.Link><Link to="/path">content</Link></Nav.Link>
                이런형식으로 하니 컴파일을 거쳣을때 <a><a></a></a>이런 형태로 반환되서 경고가나왔다.
                react-rbootstrap공식문서에 as라는 키워드를 써서 에러해결(stackoverflow)
                as는 해당 컴포넌트를 as뒤에오는 컴포넌트로 커스텀해서 쓸수있다는 의미인것같다.
                Nav.Link탭에서 확인가능
                */}
                <Category />
                </Nav>
                <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="search"
                    className="me-3"
                    aria-label="Search"
                    />
                    <Button variant="outline-secondary" onClick={search}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                </Form>
            </Navbar.Collapse>
            </Container>
        </Navbar> 
    )
}

export default NavBar