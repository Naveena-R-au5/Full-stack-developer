import React,{useState,useEffect,useContext} from 'react';
import ReactTimeAgo from 'react-time-ago'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {Link} from 'react-router-dom'
import Navbar from './adminNav'
import Card from 'react-bootstrap/Card'
import {UserContext} from '../App'

JavascriptTimeAgo.addLocale(en)
const Adminjobs=()=>{
    const [post,setPosts] = useState("")
    const {state,dispatch} =useContext(UserContext)
    useEffect(()=>{
    fetch('http://localhost:4000/myposts',{
    methos:"get",
    headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
    }
}).then(res=>res.json())
.then(result=>{
    console.log("mypics",result)
    setPosts(result.mypost)
})

},[])
    return(
        <div>
            <Navbar/>
            <div className="p">
                {post?post.map(data=> {return(
                    <Link style={{color:"black",textDecoration: 'none',}} to={data._id?"/admin/job/"+ data._id:"/AdminDashboard"}>
            <Card className="cardpost">
                <div className="post">
                   
                   <div className="detailspost">
                   <h4>{data.title}</h4>
                   <h6 style={{color:"grey",fontSize:"20px"}}>{data.jcompany}</h6>
                   <h6 className="salary"><i className="picon fa fa-cog" aria-hidden="true"></i>{data.tskills}</h6>
                   <h6 className="salary"><i className="picon fa fa-briefcase" aria-hidden="true"></i>{data.jminexperience}-{data.jmaxexperience} years </h6>
                   <label><i className="picon fa fa-clock-o" aria-hidden="true"></i>posted  <ReactTimeAgo style={{color:"grey",fontWeight:"normal"}} date={data.createdAt}/></label>
                   </div>
                   <div style={{marginRight:"50px"}}> <h5 style={{marginTop:"40%",color:"green"}}>{data.applied.length} application recieved</h5></div>
                   <div className="po">
                  <div><img src={data.photo} alt="img" style={{width:"150px",height:"150px"}}></img><br/></div> 
                  
                   </div>
                </div>
            </Card>
            </Link>
            )}):"no data found"}
            </div>
        </div>
    )
}
export default Adminjobs;