import React from "react";
import Head from "./head";
import {Link, useNavigate} from 'react-router-dom';
import $ from 'jquery';
import Cookies from 'js-cookie';

function StudentLogin(){
    const navigate = useNavigate();
    const studentLoginaction = e =>{
        e.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
       
        let loigndata = {
            "email":email,
            "password":password
          }
        var httpReq = new XMLHttpRequest();
        let url = "http://localhost:2023/studentLogin";
        httpReq.open("POST", url,true);
        httpReq.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        httpReq.onreadystatechange = function(){
            if(this.status == 401){
                document.getElementById("email").value="";
                document.getElementById("password").value="";
                document.getElementById("error-msg").innerHTML="Invalid Login Details";
                return
            }
            
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                if(data!="Invalid Login Details"){
                    Cookies.set('token',data);
                    Cookies.set("role","Student");
                    navigate("/studentHome")
    
                }else{
                    document.getElementById("email").value="";
                    document.getElementById("password").value="";
                    document.getElementById("error-msg").innerHTML="Invalid Login Details";
                }
               
            }
        }
        httpReq.send(JSON.stringify(loigndata));

    }
    return(
        <>
        <div className="pic">
        <Head/>
        <div className="container-fluid mt-5">
        <div id="error-msg" className="mt-3 text-danger text-center h5"></div>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card p-4 mb-2" style={{background:"#dddd",borderRadius:"30px"}}>
                    <div className="text-center h5" style={{fontStyle:"italic"}}>Student Login</div>
                    <div className="text-center">
                        <img src="https://i.pinimg.com/474x/d0/93/2b/d0932b3ed34581f4f811626a242c4ce3.jpg" style={{height:"100px",maxWidth:"100px",borderRadius:"40px"}}></img>
                    </div>
                        
                        <form  onSubmit={studentLoginaction}>
                             <div className="form-group">
                               <label htmlFor="email">Email</label>
                               <input type="email" id="email" className="form-control mt-1 p-2" placeholder="Enter Email" required></input>
                             </div>
                             <div className="form-group">
                               <label htmlFor="password">Password</label>
                               <input type="password" id="password" className="form-control p-2 mt-1" placeholder="Enter Password" required></input>
                             </div>
                             <div className="text-center">
                               <input type="submit" value={"Login"} className="btn btn-primary w-50 text-center mt-3 text-white p-2" ></input>
                             </div>
                             <div className="mt-3 text-center">
                             New Instructor?
                                 <Link to="/studentRegistration" >Register</Link>
                         </div>
                        </form>
                    </div>
                </div>
            </div>
         </div>
         </div>
        </>
    )
}
export default StudentLogin;