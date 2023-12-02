import Cookies from "js-cookie";
import StudentHead from "./studentHead";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InstructorHead from "../instructor/instructorHead";
import AdminHead from "../admin/adminHead";
function Enrolls(){
    const navigate = useNavigate();
    let token = Cookies.get("token");
    const[enrolls,setEnrolls] = useState([])
    const[count,setCount] = useState(0)
    useEffect(()=>{
        let url3 = "http://localhost:2023/enrolls";
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
    },[count])

    function getPayments(enrolId){
     navigate("/getPayments?enrolId="+enrolId)
    }
    const CourseCompleted = e =>{
        e.preventDefault();
        let enrolId = e.target[0].value;
        let url6 = "http://localhost:2023/completeEnrollment?enrolId="+enrolId;
        var httpReq = new XMLHttpRequest();
        httpReq.open("get", url6,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                     alert(data)
                     setCount(count+1)
            }
            
        }
        httpReq.send();

    }

    function dropCourse(enrolId){
        console.log(enrolId);
        let url3 = "http://localhost:2023/dropEnrollment?enrolId="+enrolId;
        var httpReq = new XMLHttpRequest();
        httpReq.open("get", url3,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                     alert(data)
                     navigate("/AvailableCourses")
            }
            
        }
        httpReq.send();
    }
    function giveRating(enrolId){
        navigate("/giveRating?enrolId="+enrolId)
    }
    function getVideos(courseId){
        navigate("/ViewSections?courseId="+courseId)
    }
    return(
        <>
          {Cookies.get("role")==="Student"?<div><StudentHead/></div>:<></>}
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
                            <div className="card p-1 mt-2">
                              <div className="row">
                                <div className="col-md-6">
                                <img  className="" src={'data:image/jpeg;base64,'+enroll['courseModel']['image2']}  style={{height:'160px',maxWidth:"100%"}} />
                                <div className="row">
                                    <div className="col-md-6 mt-1">
                                        <button onClick={()=>getPayments(enroll['enrolId'])} className="btn btn-primary w-100" style={{fontSize:"13px"}}>
                                            Payments
                                    </button>
                                   </div>
                                   {Cookies.get("role")==="Student"?<>
                                   {enroll['status']==='Enrolled'?<>
                                   <div className="col-md-6 mt-1">
                                            <button onClick={()=>dropCourse(enroll['enrolId'])} className="btn btn-danger w-100" style={{fontSize:"13px"}}>
                                                Drop
                                        </button>
                                    </div>
                                   </>:<></>}
                                    {enroll['status']==='Enrolled' || enroll['status']==='Course Completed'?<>
                                    <div className="col-md-6 mt-1">
                                        <button onClick={()=>getVideos(enroll['courseModel']['courseId'])} className="btn btn-primary w-100" style={{fontSize:"13px"}}>
                                            View Videos
                                    </button>
                                   </div>
                                    </>:<></>}
                                    {enroll['status']==='Enrolled'?<>
                                       <form onSubmit={CourseCompleted}>
                                        <input type="hidden" id="enrolId" value={enroll['enrolId']}></input>
                                        <input type="submit" className="btn btn-primary mt-2" style={{fontSize:"13px"}} value={"Make As Course Completed"}></input>
                                       </form>
                                    </>:<></>}
                                    {enroll['status2']==='Course Completed'?<>
                                    <div className="col-md-6 mt-1">
                                        <button onClick={()=>giveRating(enroll['enrolId'])} className="btn btn-primary w-100" style={{fontSize:"13px"}}>
                                            Give Rating
                                    </button>
                                   </div>
                                    </>:<></>}
                                   </>:<></>}
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
export default Enrolls;