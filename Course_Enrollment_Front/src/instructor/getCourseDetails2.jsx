import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import InstructorHead from "./instructorHead";
import AdminHead from "../admin/adminHead";
import Rating from 'react-rating-stars-component';
import { useEffect, useState } from "react";

function GetCourseDetails2(){
    const navigate = useNavigate();
    let token = Cookies.get("token");
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let courseId = params.get('courseId');
    const [course ,setCourse] = useState(null)
    const[reviews,setReviews] = useState([])
    function viewEnrolls(e){
        e.preventDefault();
        let courseId = document.getElementById("courseId").value;
        navigate("/getCourseEnrolls?courseId="+courseId)

    }
    useEffect(()=>{
        let url3 = "http://localhost:2023/GetCourseDetails?courseId="+courseId;
        var httpReq = new XMLHttpRequest();
        httpReq.open("get", url3,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                    data = JSON.parse(data);
                    setCourse(data)
            }
            
        }
        httpReq.send();
    },[])
    useEffect(()=>{
        let url3 = "http://localhost:2023/getCourseReviews?courseId="+courseId;
        var httpReq = new XMLHttpRequest();
        httpReq.open("get", url3,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                    data = JSON.parse(data);
                    setReviews(data)
            }
            
        }
        httpReq.send();
    },[])
    
    return (
        <>
          {Cookies.get("role")==="Instructor"?<div><InstructorHead/></div>:<></>}
          {Cookies.get("role")==="Admin"?<div><AdminHead/></div>:<></>}
        <div className="container mt-5" style={{position:'absolute',top:'50px',left:'150px'}}>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-11 mt-2">
                    {course!=null?<div>
                        <div className="row">
                            <div className="col-md-6">
                            <img  className="" src={'data:image/jpeg;base64,'+course['image2']}  style={{height:'400px',maxWidth:"80%"}} />
                            <div className="row">
                            {Cookies.get("role")!="Student"?<>
                                    <div className="col-md-6">
                                    <form onSubmit={viewEnrolls}>
                                        <input type="hidden" id="courseId" value={course['courseId']}></input>
                                        <input type="submit" value={"View Enrolls"} className="btn btn-primary w-50 mt-3"></input>
                                    </form>
                                </div>
                            </>:<></>}
                                <div className="col-md-6"></div>
                            </div>
                            <div className="text-center h6">Reviews</div>
                              {reviews!=null?<>
                               {reviews.map((review,index)=>
                               <div className="card p-3 mt-1">
                                <div className="row">
                                    <div className="col-md-6">
                                    <div className="text-secondary" style={{fontSize:"13px"}}>Review By</div>
                                    <div className="h6"><b>{review['enrollsModel']['studentModel']['name']}</b></div>
                                    <div className="h6">
                                    <Rating value={review['rating']} size={24} edit={false}/> 
                                    </div>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="text-secondary" style={{fontSize:"13px"}}>Review On</div>
                                    <div className="h6"><b>{review['date'].split(".")[0].replace("T", " ").substring(0, 16)}</b></div>
                                    </div>
                                </div>
                                <div className="text-secondary"style={{fontSize:"13px"}} >Comment</div>
                                <div className="" style={{overflow:"auto",height:"30px"}}>{review['review']}</div>
                               </div>
                               )}
                              </>:null}
                            </div>

                            <div className="col-md-6">
                                <div className="h6">Course :  {course['courseName']}</div>
                                <div className="h6 mt-3">Price  : $ {course['coursePrice']}</div>
                                {course['rating']===0?<>
                                <b>No Ratings</b>
                                </>:<>
                                <Rating value={course['rating']} size={24} edit={false}/></>}
                                
                                <div className="h6  mt-3">SubCategory  : {course['subCategoryModel']['subCategoryName']}</div>
                                <div className="h6 mt-3">Catgeory  : {course['subCategoryModel']['categoryModel']['categoryName']}</div>
                                <div className="text-secondary mt-2" style={{fontSize:"12px"}}>About</div>
                                <div className="" style={{overflow:"auto",height:"100px"}}>{course['courseDescription']}</div>
                            </div>
                        </div>
                    </div>:null}
                </div>
            </div>
         </div>
        </>
    )
}
export default GetCourseDetails2;