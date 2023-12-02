import { useEffect, useState } from "react";
import StudentHead from "./studentHead";
import Cookies from "js-cookie";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate } from "react-router-dom";

function AvailableCourses(){
    const navigate = useNavigate();
    let token = Cookies.get("token");
    const [courses ,setCourses] = useState([])
    const [keywords, setKeywords] = useState([])

    async function fetchData() {
        let url3 = "http://localhost:2023/getAvailableCourses?keywords="+keywords;
        var httpReq = new XMLHttpRequest();
        httpReq.open("get", url3,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                    data = JSON.parse(data);
                    console.log(data);
                    setCourses(data)
            }
            
        }
        httpReq.send();
    }
    useEffect(()=>{
        fetchData()
    },[])

  function SearchAction(e){
    e.preventDefault();
    fetchData()
  }

  function getCourseDetails(courseId){
    console.log(courseId);
    navigate("/getCourseDetails?courseId="+courseId)
  }
    return(
        <>
        <StudentHead/>
        <div className="container mt-3" style={{position:'absolute',top:'50px',left:'150px'}}>
         <div className="text-center h4 mt-2">AvailableCourses</div>
         <div className="mt-3">
            <form onSubmit={SearchAction}>
                <div className="row">
                    <div className="col-md-2"></div>
                   <div className="col-md-5">
                   <input type="text" id="keywords" placeholder="Search Course" onChange={e => setKeywords(e.target.value)} className="form-control"></input>
                   </div>
                   <div className="col-md-5">
                   <input type="submit" value={"Search"}  className="btn btn-primary w-50"></input>
                   </div>
                </div>
              
            </form>
         </div>
         <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-11" >
            
                <div className="row">
                
                {courses.map((course,index)=>
                
                <div className="col-md-4">
                    <div className="card  mt-3">
                       <div className="">
                        <button className="nav-link" onClick={()=>getCourseDetails(course['courseId'])}><img  className="" src={'data:image/jpeg;base64,'+course['image2']}  style={{height:'180px',maxWidth:"100%"}} /></button>
                        
                       </div>
                       <div className="h5 text-center "><b>{course['courseName']}</b>  </div>
                       <div className="card-body p-3">
                        <div className="h6 "><b>$ {course['coursePrice']}</b></div>
                        <div className="" style={{fontSize:"10px",}}>About</div>
                        <div className="h6 " style={{overflow:'auto',height:"30px",fontSize:'14px'}}>{course['courseDescription']}</div>
                        
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
export default AvailableCourses;