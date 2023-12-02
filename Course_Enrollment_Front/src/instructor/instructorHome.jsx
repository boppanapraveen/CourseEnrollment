import React, { useEffect, useState } from "react";
import InstructorHead from "./instructorHead";
import Cookies from "js-cookie";
import '../instructor/instructor.css';
import { useNavigate } from "react-router-dom";

export default function InstructorHome(){
    let token = Cookies.get("token");
    const [profile ,setProfile] = useState([])
    const [category ,setCategory] = useState([])
    const [subcategory ,setSubCategory] = useState([])
    const [course ,setCourse] = useState([])
    const [status ,setStatus] = useState("")

    useEffect(()=>{
        let url8 = "http://localhost:2023/getInstructorStatus2";
          var httpReq = new XMLHttpRequest();
          httpReq.open("get", url8,true);
          httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
          httpReq.onreadystatechange = function(){
              if(this.readyState == 4 && this.status== 200){
                  let data = this.responseText
                      console.log(data);
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
      let url3 = "http://localhost:2023/getInstructors";
          var httpReq = new XMLHttpRequest();
          httpReq.open("get", url3,true);
          httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
          httpReq.onreadystatechange = function(){
              if(this.readyState == 4 && this.status== 200){
                  let data = this.responseText
                      console.log(data);
                      setProfile(data)
                      
              }
              
          }
          httpReq.send();
          let url4 = "http://localhost:2023/getCategoriesCount";
          var httpReq = new XMLHttpRequest();
          httpReq.open("get", url4,true);
          httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
          httpReq.onreadystatechange = function(){
              if(this.readyState == 4 && this.status== 200){
                  let data = this.responseText
                      console.log(data);
                      setCategory(data)
                      
              }
              
          }
          httpReq.send();
          let url5 = "http://localhost:2023/getsubCategoriesCount";
          var httpReq = new XMLHttpRequest();
          httpReq.open("get", url5,true);
          httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
          httpReq.onreadystatechange = function(){
              if(this.readyState == 4 && this.status== 200){
                  let data = this.responseText
                      console.log(data);
                      setSubCategory(data)
                      
              }
              
          }
          httpReq.send();
          let url6 = "http://localhost:2023/getCourseCount";
          var httpReq = new XMLHttpRequest();
          httpReq.open("get", url6,true);
          httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
          httpReq.onreadystatechange = function(){
              if(this.readyState == 4 && this.status== 200){
                  let data = this.responseText
                      console.log(data);
                      setCourse(data)
                      
              }
              
          }
          httpReq.send();
    },[])
   
    const navigate = useNavigate();
    return(
        <>
        
        <InstructorHead/>
        <div className="container mt-5" style={{position:'absolute',top:'50px',left:"200px"}}>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-11 mt-4">
                <div className="row">
                    
                    <div className="col-md-3">
                        <div className="card ">
                        <div class="card-block p-3">
                            <h6 class="m-b-20  h6"></h6>
                            <div className="row">
                                <div className="col-md-6 mt-2">
                                <i class="fa fa-list-alt bg-white" style={{fontSize:"50px"}}></i>
                                </div>
                                <div className="col-md-6 mt-1">
                                <span style={{fontSize:"22px"}} className="text-center">{category}</span>
                                <div className="h6 text-secondary">Categories</div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card ">
                        <div class="card-block p-3">
                            <h6 class="m-b-20  h6"></h6>
                            <div className="row">
                                <div className="col-md-6 mt-2">
                                <i class="fa fa-list-alt bg-white" style={{fontSize:"50px"}}></i>
                                </div>
                                <div className="col-md-6 mt-1">
                                <span style={{fontSize:"24px"}} className="text-center">{subcategory}</span>
                                <div className="h6 text-secondary" style={{fontSize:"13px"}}>SubCategories</div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card ">
                        <div class="card-block p-3">
                            <h6 class="m-b-20  h6"></h6>
                            <div className="row">
                                <div className="col-md-6 mt-2">
                                <i class="fas fa-book bg-white" style={{fontSize:"50px"}}></i>
                                </div>
                                <div className="col-md-6 mt-1">
                                <span style={{fontSize:"24px"}} className="text-center">{course}</span>
                                <div className="h6 text-secondary" style={{fontSize:"13px"}}>Courses</div>
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