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
    const [admin,setAdmins] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(()=>{
    if(state){
        const admin = JSON.parse(localStorage.getItem("admin"))
        setAdmins(admin.name)
        if(admin){
          dispatch({type:"ADMIN",payload:admin})
        }
    }
      },[])
      const List=()=>{
        if(state){
              return[
                <Link style={{marginTop:"20px",color:"white"}} to="/AdminDashboard"><h5>Dashboard</h5></Link>,
                <Link style={{marginTop:"20px",color:"white"}} to="/AdminDjobs"><h5>&nbsp;&nbsp;&nbsp;My posts</h5></Link>,
                   <Nav.Link className="nn nav"  onClick={handleShow} 
                        style={{color:"white"}}>
                                   <h5><i class="fa fa-user-o" style={{color:"white"}} aria-hidden="true"></i>&nbsp;{state?state.name:"logout"}</h5>
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
                         history.push('/')
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
                    <h2 className="main" >Job search</h2>
                </Nav.Link>
            </Nav.Item>
    <Nav.Item className="offset-4">
        <Nav.Link as={Link} to="/"><h5 className="nn nav">Home</h5>
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