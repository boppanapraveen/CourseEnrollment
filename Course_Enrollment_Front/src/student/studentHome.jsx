import React, { useEffect, useState } from "react";
import StudentHead from "./studentHead";
import Cookies from "js-cookie";
import "../student/student.css"
import { useNavigate } from "react-router-dom";

export default function StudentHome(){
    const navigate = useNavigate();
    const [profile ,setProfile] = useState([])
    const[status,setStatus] = useState([])
    let token = Cookies.get("token");
    useEffect(()=>{
        let url = "http://localhost:2023/getStudentStatus2";
            var httpReq = new XMLHttpRequest();
            httpReq.open("get", url,true);
            httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
            httpReq.onreadystatechange = function(){
                if(this.readyState == 4 && this.status== 200){
                    let data = this.responseText
                    if(data==='Not Authorized'){
                        Cookies.remove('token')
                        Cookies.remove("role")
                        navigate("/?message=Account Not Verified")
                        
                      }
                        
                }
                
            }
            httpReq.send();
      },[])
    useEffect(()=>{
    let url3 = "http://localhost:2023/getStudentProfile";
        var httpReq = new XMLHttpRequest();
        httpReq.open("get", url3,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                if(data.length!=0){
                  data = JSON.parse(data);
                    setProfile(data)
                }
                    
            }
            
        }
        httpReq.send();
  },[])

  function editProfile(studentId){
    navigate('/updateStudent?studentId='+studentId)
    // let url3 = "http://localhost:2023/getStudentProfile";
    //     var httpReq = new XMLHttpRequest();
    //     httpReq.open("get", url3,true);
    //     httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
    //     httpReq.onreadystatechange = function(){
    //         if(this.readyState == 4 && this.status== 200){
    //             let data = this.responseText
    //             if(data.length!=0){
    //               data = JSON.parse(data);
    //                 setProfile(data)
    //             }
                    
    //         }
            
    //     }
    //     httpReq.send();
    
  }
    return(
        <>
        <StudentHead/>
        <div className="container mt-5" style={{position:'absolute',top:'50px',left:"150px"}}>
        <div class="page-content page-container" id="page-content">
        <div class="padding">
        <div class="row container d-flex justify-content-center">
         <div class="col-xl-8 col-md-12">
            <div class="card user-card-full">
                <div class="row m-l-0 m-r-0">
                    <div class="col-sm-3 bg-c-lite-green user-profile">
                        <div class="card-block text-center text-white">
                            <div class="m-b-25">
                            <img src={'data:image/jpeg;base64,'+profile['profilePicture2']} className="profile_image"  style={{height:"100px",maxWidth:"100%"}}/>
                            </div>
                            <h6 class="f-w-600 h3">{profile['name']}</h6>
                            <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                        </div>
                    </div>
                    <div class="col-sm-9">
                        <div class="card-block">
                            <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                            <div class="row">
                                <div class="col-sm-6">
                                    <p class="m-b-10 f-w-600">Email</p>
                                    <h6 class="text-muted f-w-400">{profile['email']}</h6>
                                </div>
                                <div class="col-sm-6">
                                    <p class="m-b-10 f-w-600">Phone</p>
                                    <h6 class="text-muted f-w-400">{profile['phone']}</h6>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <p class="m-b-10 f-w-600">Wallet Amount</p>
                                    <h6 class="text-muted f-w-400">$ {profile['walletAmount']}</h6>
                                </div>
                                <div class="col-sm-6">
                                    <p class="m-b-10 f-w-600">Address</p>
                                    <h6 class="text-muted f-w-400">{profile['address']}</h6>
                                </div>
                                <div class="col-md-6 mt-2">
                                   <button onClick={()=>editProfile(profile['studentId'])} className="btn btn-primary w-100" style={{fontSize:"12px"}}>Edit</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}