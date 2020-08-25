import React,{useState,useEffect,useContext} from 'react';
import ReactTimeAgo from 'react-time-ago'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {useParams} from 'react-router-dom'
import Navbar from './adminNav'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {UserContext} from '../App'

JavascriptTimeAgo.addLocale(en)
const AdminJobdetails=()=>{
    const {state,dispatch} =useContext(UserContext)
    const [show,setShow] = useState(false)
    const [data,setJob] = useState("")
    const [follow,setShowFollow] = useState(true)
    const [app,setDatas] = useState([])
    const [apps,setDatass] = useState()
    const {jobid} = useParams()
    useEffect(()=>{
        fetch(`http://localhost:4000/admin/job/${jobid}`,{
           method:"GET",
           headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
        }).then(res=>res.json())
        .then(posts=>{
            console.log("result",posts)
            setJob(posts)
        }).catch(err=>{
        console.log(err)
        })
    },[])

    const applysjob = (id)=>{
        fetch("http://localhost:4000/shortlistjob",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                jobId:jobid,
                User:id
                
            })
        }).then(res=>res.json())
        .then(result=>{
            setDatas(result.posts)
            console.log("ddd",result)
            setShowFollow(false)
        }).catch(err=>{
            console.log(err)
        })
        // setShowFollow(true)
    }
    const rejectjob = (id)=>{
        fetch("http://localhost:4000/rejectedjob",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                jobId:jobid,
                User:id
                
            })
        }).then(res=>res.json())
        .then(result=>{
            setDatass(result.posts)
            console.log("ddd",result)
            // setShowFollow(false)
        }).catch(err=>{
            console.log(err)
        })
        // setShowFollow(true)
    }
    const toogle=()=>{
        setShow(!show)
    }
    return(
        <div>
            <Navbar/>
            {data?
            <div className="p">

                {/* // data.posts.map(data=>{return( */}
            <Card className="cardpost2">
                       <div><img src={data.posts.photo} alt="img" style={{width:"100%",height:"250px"}}></img></div>
                   </Card>
                   <div className="detailspost">
                   
                   <Card className="cardpost2">
                   <Card.Header><h2>About Job</h2></Card.Header>
                   <div className="postii">
                   <h4>{data.posts.title}</h4>
                   <h4 style={{color:"grey",fontSize:"20px"}}>{data.posts.jcompany}</h4>
                   <h6 className="salary"><i className="picon fa fa-briefcase" aria-hidden="true"></i>{data.posts.jminexperience}-{data.posts.jmaxexperience} years </h6>
                   <h6 className="salary"><i className="picons fa fa-user" aria-hidden="true"></i>{data.posts.vacancy} vacancies</h6>
                   <h6 className="salary"><i className="picons fa fa-usd" aria-hidden="true"></i>{data.posts.salary} - {data.posts.maxsalary} LPA</h6>
                   <h6 className="salary"><i className="picon fa fa-cog" aria-hidden="true"></i>{data.posts.tskills}</h6>
                   <label><i className="picon fa fa-clock-o" aria-hidden="true"></i>posted  <ReactTimeAgo style={{color:"grey",fontWeight:"bold"}} date={data.posts.createdAt}/></label>
                   </div>
                   </Card>
                   
                   <Card className="cardpost2">
                   <Card.Header><h2>Job Description</h2></Card.Header>
                   <div className="postii">
                   <h6 className="salary"><li>{data.posts.description}</li></h6>
                   <h6 className="salary"><li>Interview date - {data.posts.lastdate.split('T')[0]}</li></h6>
                   </div>
                   </Card>

                   <Card className="cardpost2" style={{height:"240px"}}>
                   <Card.Header><h2>About Recruiter</h2></Card.Header>
                   <div className="rec">
                    <div>
                    <img src={data.posts.postedBy.pics} style={{width:"90px",height:"90px",borderRadius:"160px",marginTop:"25px",marginLeft:"35px"}} alt="img"></img>
                    </div>
                    <div style={{marginTop:"20px",marginLeft:"30px"}}>
                    <h4>{data.posts.postedBy.name}</h4>
                    <h6 className="salary">{data.posts.postedBy.position}</h6>
                    <h6 className="salary">{data.posts.postedBy.company}</h6>
                    </div>
                   </div>
                   </Card>

                   <Card className="cardpost2" style={{height:"240px"}}>
                   <Card.Header><h2>About Company</h2></Card.Header>
                    <div style={{marginTop:"20px",marginLeft:"30px"}}>
                    <h5 className="salary"><strong>Company name -</strong>{data.posts.jcompany}</h5>
                    <h5 className="salary"><strong>Company location -</strong> {data.posts.location}</h5>
                    </div>
                   </Card>
                   </div>
                   <h2 style={{textAlign:"center"}}>List of Applications recieved</h2>
                   <div className="scroll">
                   <ol className="total">
                   {data?data.posts.applied.map(data=>{ return(
                   <Card className="cardpost3" style={{height:"auto"}}>
                       <div>
                           <img src={data.pic} alt="applicant" style={{width:"100%",height:"100%"}}/>
                       </div>
                       <div style={{marginTop:"20px",marginLeft:"30px"}}>
                       <li style={{fontSize:"20px"}}><h6 className="salary"><strong>Name -</strong>{data.name}</h6>
                       <h6 className="salary"><strong>Skills -</strong> {data.skills}</h6>
                       <h6 className="salary"><strong>Experience -</strong> {data.experience}</h6>
                       <h><b>Personal details</b></h><hr/>
                       <h6 className="salary"><strong>E-mail -</strong> {data.email}</h6>
                       <h6 className="salary"><strong>Education -</strong> {data.education}</h6>
                       </li>
                       <Button variant="primary" onClick={()=>applysjob(data._id)}>
                          Shortlist
                       </Button>
                       <Button variant="primary" onClick={()=>rejectjob(data._id)}>
                          Reject
                       </Button>
                    
                   </div>
                   
                        
                   </Card>
                   
                   )}):"no applications recieved"}
                   </ol>
                   </div>
            </div>
            :""} 
        </div>
    )
}
export default  AdminJobdetails;