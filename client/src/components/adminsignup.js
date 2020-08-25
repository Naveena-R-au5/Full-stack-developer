import React,{useState,useEffect,useContext} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link,useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Navbar from './navbar'
import {UserContext} from '../App'

const Signup =()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [company,setCompany] = useState("")
    const [position,setPosition] = useState("")
    const [adminemail,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    const [show,showPass] = useState("password")
    const [sub,submit] = useState(false)
    useEffect(()=>{
        if(url){
            uploadfields()
        }
    },[url])

const uploadPic = ()=>{
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","Appogram")
    data.append("cloud_name","dpad3bwv8")
    // cloudinay to save images used in application
    fetch("https://api.cloudinary.com/v1_1/dpad3bwv8/image/upload",{
        method:"POST",
        body:data
    }).then(res =>res.json())
    .then(data=>{
        // console.log(data)
        setUrl(data.url)
    }).catch(err=>{
        console.log(err)
    })
}
const uploadfields=()=>{
         // username validation
         if(!/^(?=.*[a-z][a-z\-0-9])(?=.)(?=.{4,})/.test(name)){
     
            toast.warn('username can contain mininum 4 characters,special characters,numbers,alphabets',{position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined})
            return
        }
        // email validation
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(adminemail)){
           
            toast.error('invalid email',{position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined})
            return
        }
        // password validation
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})/.test(password)){
            
            toast.warn('password must contain minimum 4 characters , special character ,Number and Capital letter',{position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined})
            return
        }
   
    // signup 
    fetch("http://localhost:4000/Adminsignup",{
        method:"post",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            adminemail,
            password,
            pic:url,
            company,
            position
        })
    }).then(res=>res.json())
    .then(data=>{
        if(data.errMessage){
            toast.warn('email already exist',{position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined})
           return
        }
        else{
            history.push('/AdminLogin')
            submit(true)
            toast.success('registered successfully!!!',{position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined})
            return
        }
       
    }).catch(err=>{
        console.log(err)
    })
} 
// function to submit data with image and without image
const PostData =()=>{
    if(image){
        uploadPic();
        
    }
    else{
        uploadfields()
        
    }
}
// for show password toggle 
const pass=()=>{
    showPass(!show)
}
  return(
        <>
          <Navbar/>
          <div>
             <Card className="Card">
             <h1 style={{textAlign:"center",color:"red"}}>Employee Zone</h1>
             <Card.Header  className="card-header2"><h3>Welcome to job search</h3></Card.Header>
             <Card.Body className="card-body">
               <Form>
                  <div className="form">
                    <Form.Group controlId="formBasicName">
                         <Form.Label><h5>Name</h5></Form.Label>
                         <Form.Control type="text" placeholder="Enter firstname"
                            style={{width:"100%",height:"60px",fontSize:"20px"}} 
                            value ={name}
                            onChange = {(e)=>setName(e.target.value)}/>
                    </Form.Group>
                   
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label><h5>Email address</h5></Form.Label>
                           <Form.Control type="email" placeholder="Enter email"
                               style={{width:"100%",height:"60px",fontSize:"20px"}} 
                               value ={adminemail}
                               onChange = {(e)=>setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                       <Form.Label><h5>Password</h5></Form.Label>
                           <Form.Control type={show?"password":"text"} 
                                placeholder="Password"  value ={password}
                                style={{width:"100%",height:"60px",fontSize:"20px"}}
                                value={password} 
                                onChange = {(e)=>setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" 
                             onClick={()=>pass()} style={{fontSize:"16px"}} 
                             label="show password"/>
                    </Form.Group>
                    <Form.Group controlId="formBasiccompany">
                        <Form.Label><h5>Company name</h5></Form.Label>
                           <Form.Control type="text" placeholder="Enter company name"
                               style={{width:"100%",height:"60px",fontSize:"20px"}} 
                               value ={company}
                               onChange = {(e)=>setCompany(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicposition">
                        <Form.Label><h5>Position</h5></Form.Label>
                           <Form.Control type="text" placeholder="Enter position"
                               style={{width:"100%",height:"60px",fontSize:"20px"}} 
                               value ={position}
                               onChange = {(e)=>setPosition(e.target.value)}/>
                    </Form.Group>
                   
                    <div className="signup file-field input-field">
                       <div className="btn waves-effect waves-light #26a69a teal lighten-1">
                          <label><h5>Upload profile pic</h5></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <input type="file" style={{backgroundColor:"black",color:"white"}} onChange={(e)=>setImage(e.target.files[0])}/>
                       </div>
                    </div>
                    <Button className="submit" type="button"  
                         onClick = {()=>PostData()} disabled={!adminemail || !name || !password }>
                        Submit
                    </Button>
               </div>
               <ToastContainer position="top-center"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover/>
               <div className="link">
               <div>
                <i className="fa fa-user" style={{fontSize:"70px",marginTop:"20px"}} 
                   aria-hidden="true">
                </i>
               </div>&nbsp;&nbsp;&nbsp;&nbsp;
               <div style={{display:"flex",flexDirection:"column"}}>
                  <p> Already a member?&nbsp;&nbsp;
                      <Link to="/AdminLogin">Login</Link>
                   <br/>
                   <label style={{fontSize:"19px",marginTop:0,color:"grey"}} >
                        Sign in to submit tickets,<br/> browse articles and engage in our community.
                   </label>
                  </p>
                </div>
               </div>
            </Form>
        </Card.Body>
    </Card>
  </div>
 </>
 )
}

export default Signup