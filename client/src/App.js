import React,{useEffect,createContext,useReducer,useContext, useState} from 'react';
import './App.css';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Signup from './components/signup'
import AdminLogin from './components/adminLogin'
import AdminSignup from './components/adminsignup'
import UserDashboard from './components/userdashboard'
import AdminDashboard from './components/admindashboard'
import Jobdetails from './components/jobdetails'
import AdminJobs  from './components/adminjobs'
import Adminjobdetails from './components/adminjobdetail'
import {reducer,initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  const [User,setUsers] = useState([])
  const [Admin,setAdmins] = useState([])
  console.log("st",User)
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    setUsers(user)
    if(user){
      dispatch({type:"USER",payload:user})
    }
    const admin = JSON.parse(localStorage.getItem("admin"))
    setAdmins(admin)
    if(admin){
      dispatch({type:"ADMIN",payload:admin})
    }
    else{
      if(!history.location.pathname.startsWith('/reset'))
      history.push('/')
    }
  },[])
  return(
    <Switch>
       <Route exact path="/">
        <Home />
      </Route>
      <Route path="/user/login">
        <Login />
      </Route>
      <Route  path="/user/signup">
        <Signup />
      </Route>
      <Route  path="/AdminSignup">
        <AdminSignup />
      </Route>
      <Route  path="/AdminLogin">
        <AdminLogin />
      </Route>
      <Route  path="/UserDashboard">
        <UserDashboard />
      </Route>
      <Route  path="/AdminDashboard">
        <AdminDashboard />
      </Route>
      <Route path="/job/:jobid">
        <Jobdetails/>
      </Route>
      <Route path="/Adminjobs">
        <AdminJobs/>
      </Route>
      <Route path="/admin/job/:jobid">
        <Adminjobdetails/>
      </Route>
   
   </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
     <BrowserRouter>
      <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
 }

export default App;
