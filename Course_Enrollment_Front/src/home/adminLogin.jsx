import React from "react";
import Head from "./head";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function AdminLogin(){

   const emailValidate = () =>{
    let email = document.getElementById("email").value;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if(!email.match(emailPattern)){
       document.getElementById("email-message").innerHTML="Enter Valid Email Address ";
       return ;
    }else{
        document.getElementById("email-message").innerHTML="";
        
    }
      
   }

    const navigate = useNavigate();

    const AdminLoginaction = e =>{
        e.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if(email.length==0){
            document.getElementById("email-message").innerHTML="Enter Email Address";
            e.preventDefault();
            return
        }
        
        let loigndata = {
            "email":email,
            "password":password
          }
        var httpReq = new XMLHttpRequest();
        let url = "http://localhost:2023/adminLoginaction";
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
                    Cookies.set("role","Admin");
                    navigate("/adminHome")
    
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
         
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card p-4 mb-3" style={{background:"#dddd",borderRadius:"30px"}}>
                    <div className="text-center h5" style={{fontStyle:"italic"}}>Admin Login</div>

                        <div className="text-center">
                        <img src="https://i.pinimg.com/474x/d0/93/2b/d0932b3ed34581f4f811626a242c4ce3.jpg" style={{height:"100px",maxWidth:"100px",borderRadius:"40px"}}></img>
                        </div>
                        <form id="" onSubmit={AdminLoginaction}>
                             <div className="form-group">
                               <label htmlFor="email">Email</label>
                               <input type="email" id="email" onKeyUp={emailValidate} className="form-control p-2 mt-1" placeholder="Enter Email" ></input>
                               <div className="mt-1 text-danger" id="email-message"></div>
                             </div>
                             <div className="form-group">
                               <label htmlFor="password">Password</label>
                               <input type="password" id="password" className="form-control mt-1 p-2" placeholder="Enter Password" ></input>
                             </div>
                             <div className="text-center">
                               <input type="submit" value={"Login"} className="btn btn-primary w-50 t mt-3  p-2" ></input>
                             </div>
                        </form>
                        <div id="error-msg" className="mt-3 text-danger text-center h5"></div>
                    </div>
                    
                </div>
            </div>
           
         </div>
         
         </div>
        </>
    )
}
export default AdminLogin;