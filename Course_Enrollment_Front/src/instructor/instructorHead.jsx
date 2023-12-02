import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import '../instructor/instructor.css';

function InstructorHead(){
  let token = Cookies.get("token");
  const [profile ,setProfile] = useState([])
  useEffect(()=>{
    let url3 = "http://localhost:2023/getInstructorProfile";
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
  })
 
    return (
        <>


        <body>
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"/>
 <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  <input type="checkbox" id="check" />
  <header>
    <label for="check">
      <i style={{left: "210px",marginTop: "11px"}} class="fas fa-bars" id="sidebar_btn"></i>
    </label>
    <div class="left_area">
      <h6>Course Enrollment</h6>
    </div>
    <div class="right_area">
      <Link to="/logout" className="logout_btn" style={{borderRadius:"0px"}}> Logout</Link>
    </div>
  </header>

  <div className="sidebar">
    <center>
      <img src={'data:image/jpeg;base64,'+profile['profielPicture2']} class="profile_image" alt="" />
      <h4>{profile['name']}</h4>
    </center>
     <Link to="/instructorHome"><i className="fas fa-tachometer-alt"></i><span>Dashboard</span></Link>
     <Link to="/addCategories"><i className="fa fa-list-alt"></i><span>Category</span></Link>
     <Link to="/subCategories"><i className="fa fa-list-alt"></i><span>SubCategory</span></Link>
    <Link to="/addCourse"><i className="fas fa-book"></i><span>Add Course</span></Link>
    <Link to="/viewCourses"><i className="fas fa-book"></i><span>Manage Courses</span></Link>
    <Link to="/enrolls"><img src="https://qrirancode.ir/wp-content/uploads/enrollment-icon-png-5.png" style={{height:"20px",marginRight:"5px"}}></img><span>Enrolls</span></Link>

    
    
  </div>
</body>
    
</>
    )
}
export default InstructorHead;

