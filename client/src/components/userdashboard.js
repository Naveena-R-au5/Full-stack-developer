import React,{useState,useEffect,useContext} from 'react';
import ReactTimeAgo from 'react-time-ago'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {Link} from 'react-router-dom'
import Navbar from './navbar'
import Card from 'react-bootstrap/Card'
import {UserContext} from '../App'

JavascriptTimeAgo.addLocale(en)
const Userdashboard=()=>{
    const [data,setData] = useState([])
    const {state,dispatch} =useContext(UserContext)
    useEffect(()=>{
        fetch("http://localhost:4000/allposts",{
            methos:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res =>res.json())
        .then(result=>{
            console.log("post",result)
            setData(result.posts)
        })
     },[])
    return(
        <div>
            <Navbar/>
            <div className="p">
                {data?data.map(data=> {return(
                    <Link style={{color:"black",textDecoration: 'none',}} to={data._id?"/job/"+ data._id:"/UserDashboard"}>
            <Card className="cardpost">
                <div className="post">
                   
                   <div className="detailspost">
                   <h3>{data.title}</h3>
                   <h4 style={{color:"grey",fontSize:"25px"}}>{data.jcompany}</h4>
                   <h5 className="salary"><i className="picon fa fa-cog" aria-hidden="true"></i>{data.tskills}</h5>
                   <h5 className="salary"><i className="picon fa fa-briefcase" aria-hidden="true"></i>{data.jminexperience}-{data.jmaxexperience} years </h5>
                   <label><i className="picon fa fa-clock-o" aria-hidden="true"></i>posted  <ReactTimeAgo style={{color:"grey",fontWeight:"bold"}} date={data.createdAt}/></label>
                   </div>
                   <div className="po">
                   <img src={data.photo} alt="img" style={{width:"150px",height:"150px"}}></img><br/>
                   <h3 style={{marginTop:"25px"}}>{data.applied.includes(state._id)?<h3 style={{color:"green"}}>applied!!!</h3>:<h3 style={{color:"blue"}}>apply now</h3>}</h3>
                   </div>

                </div>
            </Card>
            </Link>
            )}):"no data found"}
            </div>
        </div>
    )
}
export default Userdashboard;