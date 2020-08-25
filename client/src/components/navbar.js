import React,{useState,useContext, useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import {Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Modal from 'react-bootstrap/Modal'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Helix from '../h.png'
import Google from '../g.png'
import a from '../a.png'
import i from '../i.png'
import m from '../m.jpg'
import Card from 'react-bootstrap/Card'
import Footer from './footer'

const Navbar =()=>{
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const [User,setUsers] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // useEffect(()=>{
    // if(state){
    //     const user = JSON.parse(localStorage.getItem("user"))
    //     setUsers(user.name.slice(0,2).toUpperCase())
    //     if(user){
    //       dispatch({type:"USER",payload:user})
    //     }
    // }
    //   },[])
      const List=()=>{
        if(state){
              return[
                   <Nav.Link className="nn nav"  onClick={handleShow} 
                        style={{color:"white"}}>
                                    <h5><i class="fa fa-user-o" style={{color:"white"}} aria-hidden="true"></i>&nbsp; {state?state.name:"logout"}</h5>
                    </Nav.Link>,
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                   <Modal.Body>
                       <h5>{state?state.name:""},want to logout?</h5>
                   </Modal.Body>
               <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                       Close
                    </Button>
                    <Button variant="primary" onClick={()=>{localStorage.clear()
                         dispatch({type:"CLEAR"})
                         history.push('/user/login')
                    }}>
                     Logout
                    </Button>
              </Modal.Footer>
        </Modal>
        ]
    }
        else{
              return[
                   
                <Nav.Link as={Link} to="/user/login" >
                    <h5 className="nn nav">Log in</h5>
                </Nav.Link>,
                <Nav.Link as={Link} to="/user/signup">
                    <h5 className="nn nav">Sign up</h5>
                </Nav.Link> ,
                <Nav.Link as={Link} to="/AdminLogin">
                <h5 className="nn nav">Employee?</h5>
                </Nav.Link> ,
              ]
        }
    
    }
    return(
    <>
     <section className="section2">
         <Jumbotron className="jumbol2">
             <Nav className="Nav1"
                //  variant="tabs"
                 defaultActiveKey="/"  fixed="top">
             <Nav.Item className="">
                <Nav.Link as={Link} to="/">
                    <h1 className="main" >Job search</h1>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <NavDropdown className="ff" title="Menu" id="nav-dropdown">
            <NavDropdown.Item eventKey="4.1">
                <Link to="/">Home</Link>
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">
                <Link to={state?"/myArea" :"/login"}>My Area</Link>
            </NavDropdown.Item>
               {state?<div> , 
            <NavDropdown.Item eventKey="4.1">
                <Link  onClick={handleShow}  
                   style={{width:"55px",height:"45px",borderRadius:"160px",
                           color:"black",backgroundColor:"white",textAlign:"center",
                           fontSize:"20px",fontWeight:"bold"}}>
                               {User}
                </Link>
            </NavDropdown.Item></div>
            :<div>
            <NavDropdown.Item eventKey="4.1">
                <Link to="/login">Login</Link>
            </NavDropdown.Item>, 
            <NavDropdown.Item eventKey="4.1" >
                <Link to="/signup">Signup</Link>
            </NavDropdown.Item>
            </div>}
        <NavDropdown.Divider />
     </NavDropdown>
    </Nav.Item>
    <Nav.Item className="offset-5">
        <Nav.Link as={Link} to="/"><h4 className="nn nav">Home</h4>
        </Nav.Link>
    </Nav.Item>
  
        {List()}
    </Nav>
    </Jumbotron>
  </section>
  </>
 )
}

export default Navbar