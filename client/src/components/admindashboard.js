import React,{useState,useEffect} from "react"
import {useHistory,Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Navbar from './adminNav'

const CreatePost =()=>{
    const history = useHistory()
    const[title,setTitle] = useState("")
    const[description,setDescription] = useState("")
    const[jcompany,setJcompany] = useState("")
    const[jminexperience,setJminexperience] = useState("")
    const[jmaxexperience,setJmaxexperience] = useState("")
    const[tskills,setTskills] = useState("")
    const[vacancy,setVacancy] = useState("")
    const[salary,setSalary] = useState("")
    const[maxsalary,setMaxsalary] = useState("")
    const[location,setLocation] = useState("")
    const[lastdate,setLastdate] = useState("")
    const[image,setImage] = useState("")
    const[url,setUrl] = useState(undefined)
    //callback
    useEffect(()=>{
        if(url){
            uploadfields()
        }
    },[url])
    const uploadfields=()=>{           
        fetch("http://localhost:4000/createpost",{
            method:"post",
            headers:{
                "content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               title,
               description,
               tskills,
               jcompany,
               jminexperience,
               jmaxexperience,
               vacancy,
               salary,
               maxsalary,
               location,
               lastdate,
               photo:url
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
               alert( 'error in creation')
            }
            else{
                alert("post created successfully")
                // history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
        }
    

    const uploadPic = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","Appogram")
        data.append("cloud_name","dpad3bwv8")

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
    const postDetails =()=>{
        if(image){
            uploadPic();
            
        }
        else{
            uploadfields()
            
        }
    }
    
    return(
        <div>
            <Navbar/>
             <Card className="Card3">
             <Card.Header  className="card-header2"><h2>Create Job Post</h2></Card.Header>
             <Card.Body className="card-body">
               <Form>
                  <div className="form">
                    <Form.Group controlId="formBasicName">
                         <Form.Label><h6>Job Title</h6></Form.Label>
                         <Form.Control type="text" placeholder="Enter Title"
                            style={{width:"100%",height:"40px",fontSize:"15px"}} 
                            value ={title}
                            onChange={(e)=>setTitle(e.target.value)}/>
                    </Form.Group>
                   
                    <Form.Group controlId="formBasicDescription">
                        <Form.Label><h6>Job description</h6></Form.Label>
                           <Form.Control type="textarea" placeholder="Enter job description"
                               style={{width:"100%",height:"100px",fontSize:"15px"}} 
                               value ={description}
                               onChange={(e)=>setDescription(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicCompany">
                        <Form.Label><h6>Min experience required</h6></Form.Label>
                           <Form.Control type="number" placeholder="Enter min experience required"
                               style={{width:"100%",height:"40px",fontSize:"15px"}} 
                               value ={jminexperience}
                               onChange={(e)=>setJminexperience(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicCompany">
                        <Form.Label><h6>Max. experience</h6></Form.Label>
                           <Form.Control type="number" placeholder="Enter maximum experience required"
                               style={{width:"100%",height:"40px",fontSize:"15px"}} 
                               value ={jmaxexperience}
                               onChange={(e)=>setJmaxexperience(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicCompany">
                        <Form.Label><h6>Skills</h6></Form.Label>
                           <Form.Control type="text" placeholder="Enter skills"
                               style={{width:"100%",height:"40px",fontSize:"15px"}} 
                               value ={tskills}
                               onChange={(e)=>setTskills(e.target.value)}/>
                               
                    </Form.Group>

                    <Form.Group controlId="formBasicCompany">
                        <Form.Label><h6>Job expire date</h6></Form.Label>
                           <Form.Control type="date" placeholder="Enter job expire date"
                               style={{width:"100%",height:"40px",fontSize:"15px"}} 
                               value ={lastdate}
                               onChange={(e)=>setLastdate(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicCompany">
                        <Form.Label><h6>Vacancy</h6></Form.Label>
                        <Form.Control type="number" placeholder="Enter vacancies"
                               style={{width:"100%",height:"40px",fontSize:"15px"}} 
                               value ={vacancy}
                               onChange={(e)=>setVacancy(e.target.value)}/>
                    </Form.Group>

                    
                    <Form.Group controlId="formBasicCompany">
                        <Form.Label><h6>Min. salary</h6></Form.Label>
                           <Form.Control type="number" placeholder="Enter min.salary"
                               style={{width:"100%",height:"40px",fontSize:"15px"}} 
                               value ={salary}
                               onChange={(e)=>setSalary(e.target.value)}/>
                    </Form.Group>

                                        
                    <Form.Group controlId="formBasicCompany">
                        <Form.Label><h6>Max. salary</h6></Form.Label>
                           <Form.Control type="number" placeholder="Enter max.salary"
                               style={{width:"100%",height:"40px",fontSize:"15px"}} 
                               value ={maxsalary}
                               onChange={(e)=>setMaxsalary(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCompany">
                        <Form.Label><h6>Company name</h6></Form.Label>
                           <Form.Control type="text" placeholder="Enter job description"
                               style={{width:"100%",height:"40px",fontSize:"15px"}} 
                               value ={jcompany}
                               onChange={(e)=>setJcompany(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCompany">
                        <Form.Label><h6>Company location</h6></Form.Label>
                           <Form.Control type="text" placeholder="Enter max.salary"
                               style={{width:"100%",height:"40px",fontSize:"15px"}} 
                               value ={location}
                               onChange={(e)=>setLocation(e.target.value)}/>
                    </Form.Group>

                    <div className="signup file-field input-field">
                       <div className="btn waves-effect waves-light #26a69a teal lighten-1">
                       <div className="btn waves-effect waves-light #26a69a teal lighten-1">
                          <label><h6>Upload Company pic</h6></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <input type="file" style={{backgroundColor:"black",color:"white"}} onChange={(e)=>setImage(e.target.files[0])}/>
                       </div>
                       </div>
                    </div>
                    <Button className="submit" type="button"  
                         onClick={()=>postDetails()} disabled={!title}>
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
                        <Link style={{marinRight:"30px"}} to="/Adminjobs">My posts</Link>
                     </Form>
                </Card.Body>
            </Card>
        </div>
    )

}
export default CreatePost