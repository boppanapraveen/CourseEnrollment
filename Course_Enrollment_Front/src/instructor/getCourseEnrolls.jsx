import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import InstructorHead from "./instructorHead";
import AdminHead from "../admin/adminHead";

function GetCourseEnrolls(){
    const navigate = useNavigate();
    let token = Cookies.get("token");
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let courseId = params.get('courseId');
    const[enrolls,setEnrolls] = useState([])
    useEffect(()=>{
        let url3 = "http://localhost:2023/getCourseEnrolls?courseId="+courseId;
        console.log(url3);
        var httpReq = new XMLHttpRequest();
        httpReq.open("get", url3,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                    data = JSON.parse(data);
                    console.log(data);
                    setEnrolls(data)
            }
            
        }
        httpReq.send();
    },[])
    
    function getPayments(enrolId){
        navigate("/getPayments?enrolId="+enrolId)
       }
    return(
        <>
          {Cookies.get("role")==="Instructor"?<div><InstructorHead/></div>:<></>}
          {Cookies.get("role")==="Admin"?<div><AdminHead/></div>:<></>}

        <div className="container mt-3" style={{position:'absolute',top:'50px',left:'150px'}}>
            <div className="text-center h4 mt-1">Enrolls</div>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-11 mt-3">
                    <div className="row">
                        {enrolls.map((enroll,index)=>
                        <div className="col-md-6">
                            <div className="card p-1">
                              <div className="row">
                                <div className="col-md-6">
                                <img  className="" src={'data:image/jpeg;base64,'+enroll['courseModel']['image2']}  style={{height:'160px',maxWidth:"100%"}} />
                                <div className="row">
                                    <div className="col-md-6 mt-1">
                                        <button onClick={()=>getPayments(enroll['enrolId'])} className="btn btn-primary w-100" style={{fontSize:"13px"}}>
                                            Payments
                                    </button>
                                   </div>
                                </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-secondary" style={{fontSize:"12px"}}>Enrolled On : </div>
                                    <div className="h6">  {enroll['date'].split(".")[0].replace("T", " ").substring(0, 16)}</div>
                                    <div className="" style={{fontSize:"14px"}}>Status : <b className="h6">{enroll['status']}</b></div>
                                    <div className="mt-1" style={{fontSize:"14px"}}>Course : <b>{enroll['courseModel']['courseName']}</b></div>
                                    <div className="mt-1" style={{fontSize:"14px"}}>Price : $ <b>{enroll['courseModel']['coursePrice']}</b></div>
                                    <div className="mt-1" style={{fontSize:"14px"}}>Enrolled By  : <b>{enroll['studentModel']['name']} ({enroll['studentModel']['phone']})</b></div>
                                <div className="text-secondary mt-1">Instructor: <b>{enroll['courseModel']['instructorModel']['name']}</b></div>
                                </div>
                              </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default GetCourseEnrolls;