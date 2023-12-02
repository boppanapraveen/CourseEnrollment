import Cookies from "js-cookie";
import AdminHead from "./adminHead";
import { useState } from "react";
import { useEffect } from "react";

function ViewStudents(){
    let token = Cookies.get("token");
    const [students ,setStudents] = useState([])
    const[count,setCount] = useState(0)
    useEffect(()=>{
    let url3 = "http://localhost:2023/getStudentDetails2";
        var httpReq = new XMLHttpRequest();
        httpReq.open("get", url3,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                console.log(data);
                    if(data.length!=0){
                      data = JSON.parse(data);
                      setStudents(data)
                    }
            }
            
        }
        httpReq.send();
  },[count])
  const studentStatusAction = e =>{
    e.preventDefault();
    let studentId = e.target[0].value;
    let url = "http://localhost:2023/updateStudent2?studentId="+studentId;
        var httpReq = new XMLHttpRequest();
        httpReq.open("get", url,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                setCount(count+1)
                    
            }
            
        }
        httpReq.send();


  }
    return (
        <>
        <AdminHead/>
        <div className="container mt-3" style={{position:'absolute',top:'50px',left:"150px"}}>
        <div class="page-content page-container" id="page-content">
        <div class="padding">
        <div class="row container d-flex justify-content-center">
            {students.map((student,index)=>
         <div class="col-md-12">
            <div class="card user-card-full">
                <div class="row">
                    <div class="col-sm-3 bg-c-lite-green user-profile">
                        <div class="card-block text-center text-white">
                            <div class="m-b-25">
                            <img src={'data:image/jpeg;base64,'+student['profilePicture2']} className="profile_image"  style={{height:"100px",maxWidth:"110%"}}/>
                            </div>
                            <h6 class="f-w-600 h3">{student['name']}</h6>
                            <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                        </div>
                    </div>
                    <div class="col-sm-9">
                        <div class="card-block">
                            <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                            <div class="row">
                                <div class="col-sm-6">
                                    <p class="m-b-10 f-w-600" >Email</p>
                                    <h6 class="text-muted f-w-400">{student['email']}</h6>
                                </div>
                                <div class="col-sm-6">
                                    <p class="m-b-10 f-w-600">Phone</p>
                                    <h6 class="text-muted f-w-400">{student['phone']}</h6>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <p class="m-b-10 f-w-600">Address</p>
                                    <h6 class="text-muted f-w-400">{student['address']}</h6>
                                </div>
                                <div class="col-sm-6">
                                    <p class="m-b-10 f-w-600">Status</p>
                                    <h6 class="text-muted f-w-400">{student['status']}</h6>
                                </div>
                                {student['status']==='Not Authorized'?<>
                                <form onSubmit={studentStatusAction}>
                                    <input type="hidden" id="studentId" value={student['studentId']}></input>
                                    <input type="submit" value={"Authorize"} className="btn btn-primary mt-1"></input>
                                </form>
                               </>:<>
                               <form onSubmit={studentStatusAction}>
                                    <input type="hidden" id="studentId" value={student['studentId']}></input>
                                    <input type="submit" value={"Un Authorize"} className="btn btn-danger"></input>
                                </form>
                               </>}
                            </div>
                            
                        </div>
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
export default ViewStudents;