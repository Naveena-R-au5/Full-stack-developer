import React,{useState,useEffect,useContext} from 'react';
import ReactTimeAgo from 'react-time-ago'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {useParams} from 'react-router-dom'
import Navbar from './navbar'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {UserContext} from '../App'

JavascriptTimeAgo.addLocale(en)
const Jobdetails=()=>{
    const {state,dispatch} =useContext(UserContext)
    const [data,setJob] = useState(null)
    const [app,setData] = useState([])
    const {jobid} = useParams()
    useEffect(()=>{
        fetch(`http://localhost:4000/job/${jobid}`,{
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
    const applyjob = (id)=>{
        fetch("http://localhost:4000/applyjob",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                jobId:id
            })
        }).then(res=>res.json())
        .then(result=>{
             // console.log(result)
            //  const newData = app.map(app=>{
            //     if(app._id == result._id){
            //         return result
            //     }
            //     else{
            //         return app
            //     }
            // })
            setData(result)
            console.log("d",result)
        }).catch(err=>{
            console.log(err)
        })
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
                   <h3>{data.posts.title}</h3>
                   <h4 style={{color:"grey",fontSize:"25px"}}>{data.posts.jcompany}</h4>
                   <h5 className="salary"><i className="picon fa fa-briefcase" aria-hidden="true"></i>{data.posts.jminexperience}-{data.posts.jmaxexperience} years </h5>
                   <h5 className="salary"><i className="picons fa fa-user" aria-hidden="true"></i>{data.posts.vacancy} vacancies</h5>
                   <h5 className="salary"><i className="picons fa fa-usd" aria-hidden="true"></i>{data.posts.salary}-{data.posts.maxsalary} LPA</h5>
                   <h5 className="salary"><i className="picon fa fa-cog" aria-hidden="true"></i>{data.posts.tskills}</h5>
                   <label><i className="picon fa fa-clock-o" aria-hidden="true"></i>posted  <ReactTimeAgo style={{color:"grey",fontWeight:"bold"}} date={data.posts.createdAt}/></label>
                   </div>
                   </Card>
                   
                   <Card className="cardpost2">
                   <Card.Header><h2>Job Description</h2></Card.Header>
                   <div className="postii">
                   <h5 className="salary"><li>{data.posts.description}</li></h5>
                   <h5 className="salary"><li>Interview date - {data.posts.lastdate.split('T')[0]}</li></h5>
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
                    <h5 className="salary">{data.posts.postedBy.position}</h5>
                    <h5 className="salary">{data.posts.postedBy.company}</h5>
                    </div>
                   </div>
                   </Card>

                   <Card className="cardpost2" style={{height:"240px"}}>
                   <Card.Header><h2>About Company</h2></Card.Header>
                    <div style={{marginTop:"20px",marginLeft:"30px"}}>
                    <h4 className="salary"><strong>Company name -</strong>{data.posts.jcompany}</h4>
                    <h4 className="salary"><strong>Company location -</strong> {data.posts.location}</h4>
                    </div>
                   </Card>
                   </div>
                   {data.posts.applied.includes(state._id)
                            ?<div >
                            <Button variant="primary" size="lg" className="bb">
                               Applied!
                            </Button>
                          </div>
                            :<Button variant="primary" size="lg" className="bb" onClick={()=>applyjob(data.posts._id)}>
                            Apply now
                         </Button>}
                  
            </div>
            :""} 
        </div>
    )
}
export default Jobdetails;