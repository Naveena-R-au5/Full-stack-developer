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
    const [User,setUsers] = useState(null)
    const [admin,setAdmins] = useState(null)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(()=>{
    if(state){
        const user = JSON.parse(localStorage.getItem("user"))
        setUsers(user)
        if(user){
          dispatch({type:"USER",payload:user})
        }
        else{
            const admin = JSON.parse(localStorage.getItem("admin"))
            setAdmins(admin)
           if(admin){
               dispatch({type:"ADMIN",payload:admin})
          }  
        }
    }
      },[])
      const List=()=>{
        if(state){
              return[
                <div>
                    <div>
                <Nav.Link className="nn nav"  onClick={handleShow} 
                     style={{
                             color:"white"}}>
                                 {/* {User?User:admin} */}
                                 <h5><i class="fa fa-user-o" style={{color:"white"}} aria-hidden="true"></i>&nbsp; {state?state.name:"logout?"}</h5>
                 </Nav.Link>
                  
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
       </div>
        </div>
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
     <section className="section1">
           <Jumbotron className="jumbol">
             <Nav className="Nav"
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
            {state?<div> <NavDropdown.Item eventKey="4.1">
               <Link to="/AdminDasboard">Dashboard</Link>
            </NavDropdown.Item>,
            <NavDropdown.Item eventKey="4.4">
               <Link to="/Adminjobs">My posts</Link>
            </NavDropdown.Item>, 
            <NavDropdown.Item eventKey="4.1">
                <Link  onClick={handleShow}  
                   style={{color:"white"}}>
                               {state?state.name:"logout?"}
                </Link>
            </NavDropdown.Item></div>
            :<div>
            <NavDropdown.Item eventKey="4.1">
                <Link to="/user/login">Login</Link>
            </NavDropdown.Item>, 
            <NavDropdown.Item eventKey="4.1" >
                <Link to="/user/signup">Signup</Link>
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.1" >
                <Link to="/AdminLogin">Employee?</Link>
            </NavDropdown.Item>
            </div>}
           
               {User?<div> <NavDropdown.Item eventKey="4.1">
               <Link to="/UserDashboard">Dashboard</Link>
            </NavDropdown.Item>, 
            <NavDropdown.Item eventKey="4.1">
                <Link  onClick={handleShow}  
                   style={{color:"white"}}>
                               {state?state.name:"logout?"}
                </Link>
            </NavDropdown.Item></div>
            :<div>
            <NavDropdown.Item eventKey="4.1">
                <Link to="/user/login">Login</Link>
            </NavDropdown.Item>, 
            <NavDropdown.Item eventKey="4.1" >
                <Link to="/user/signup">Signup</Link>
            </NavDropdown.Item>
            </div>}
        <NavDropdown.Divider />
     </NavDropdown>
    </Nav.Item>
    <Nav.Item className="offset-5">
        <Nav.Link as={Link} to="/"><h5 className="nn nav">Home</h5>
        </Nav.Link>
    </Nav.Item>
  
        {List()}
        <div style={{color:"white",marginTop:"17px",fontSize:"20px"}}>{admin?<Link style={{color:"white"}} to="/AdminDashboard">Admin dashboard</Link>:""},
        {User?<Link style={{color:"white"}} to ="/UserDashboard">User Dashboard</Link>:""}</div>
    </Nav>
        <div className="heading1">
           <div  style={{display:"flex",flexDirection:"column",
                         justifyContent:"space-around",marginLeft:"55%",
                         marginTop:"50px",opacity:".9"}}>
               <h3 className="motivation">Staying motivated will give your</h3><br/>
               <h3 className="motivation offset-3">Job search</h3><br/>
               <h3 className="motivation offset-2">a clear direction</h3>
           </div>
        </div>
   </Jumbotron>
   </section>

  
  <Card>
  <Card.Header> <h3 className="top">Top Hiring Companies</h3></Card.Header>
      <div className="img">
          <img className="i" src={Google} alt="img" />
          <img className="i" src={a} alt="img" />
          <img className="i" src={Helix} alt="img" />
          <img className="i" src={i} alt="img" />
          <img className="i" src={m} alt="img" />
      </div>
  </Card>
  <Card>
  <Card.Header> <h3 className="top">All Sectors</h3></Card.Header>
      <div className="sector">
          <ul className="l1">
          <h5><i className="hh fa fa-laptop" aria-hidden="true"></i>IT</h5>
          <h5><i className="hh fa fa-cogs" aria-hidden="true"></i>Mechanical</h5>
          <h5><i className="hh fa fa-flask" aria-hidden="true"></i>Chemical Engineer</h5>
          </ul>
          <ul className="l2">
          <h5><i className="hh fa fa-credit-card-alt" aria-hidden="true"></i>Finance/Insurance</h5>
          <h5><i className="hh fa fa-wifi" aria-hidden="true"></i>Dotcom/Internet/E-Commerce</h5>
          <h5><i className="hh fa fa-building" aria-hidden="true"></i>RealEstate/Constr.</h5>
          </ul>
          <ul className="l3">
          <h5><i className="hh fa fa-home" aria-hidden="true"></i>Interior Solutions/FMCG</h5>
          <h5><i className="hh fa fa-film" aria-hidden="true"></i>Film industry</h5>
          <h5><i className="hh fa fa-heartbeat" aria-hidden="true"></i>Healthcare/Pharma</h5>
          </ul>

         
      </div>
  </Card>
  <Footer/>
</>
 )
}

export default Navbar