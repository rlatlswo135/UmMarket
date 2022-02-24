/* eslint-disable*/
import { Button,Container,Navbar,Nav,Form,FormControl,NavDropdown, NavItem } from 'react-bootstrap';
import '../Css/App.css';
import {Link,useHistory} from 'react-router-dom'
import DummyData from '../dummydata/data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
{/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
function NavBar(){
  let history = useHistory();
    function Category(){
            return (
                Object.keys(DummyData).map((item,index) => {
                return(
                    <NavDropdown className="nav-dropdown ms-4" key={`drop${index}`} title={item} autoClose={true}>
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
        <Container className="mw-100 p-0">
            <Navbar className="w-100" bg="light" expand="md">
                <Container className="w-100 m-0">
                    <Navbar.Brand href="/">
                        <img className="me-2" alt="notImg" src="https://image.fmkorea.com/files/attach/new/20190919/494354581/54500371/2198823684/0cee42387d64b82673c4fcbee00b2bc6.jpg" width="25px"/>Um-Market
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse className="container-fluid m-0">
                                <Category />
                                <Nav.Item className="shopCart" onClick={()=>{
                                    history.push('/cart')
                                }}>
                                    <FontAwesomeIcon className="ms-5" icon={faShoppingCart} />
                                </Nav.Item>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    )
}

export default NavBar

{/* <Form className="d-flex">
<FormControl type="search" placeholder="search" aria-label="Search"/>
<Button variant="outline-secondary" onClick={search}>
        <FontAwesomeIcon icon={faMagnifyingGlass}/>
    </Button>
</Form> */}

