import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

function StudentHead(){
    let token = Cookies.get("token");
    const [profile ,setProfile] = useState([])
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
    return (
        <>
 <body>
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"/>
 <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  <input type="checkbox" id="check" />
  <header>
    <label htmlFor="check">
      <i style={{left: "210px",marginTop: "11px"}} className="fas fa-bars" id="sidebar_btn"></i>
    </label>
    <div className="left_area">
      <h6>Course Enrollment</h6>
    </div>
    <div className="right_area">
      <Link to="/logout" className="logout_btn" style={{borderRadius:"0px"}}> Logout</Link>
    </div>
  </header>
  <div className="sidebar">
  <center>
      <img src={'data:image/jpeg;base64,'+profile['profilePicture2']} className="profile_image" />
      <h4>{profile['name']}</h4>
    </center>
     <Link to="/studentHome"><i className="fas fa-tachometer-alt"></i><span>Dashboard</span></Link>
     <Link to="/AvailableCourses"><i className="fas fa-book"></i><span>Courses</span></Link>
     <Link to="/enrolls"><img src="https://qrirancode.ir/wp-content/uploads/enrollment-icon-png-5.png" style={{height:"20px",marginRight:"5px"}}></img><span>Enrolls</span></Link>
  </div>
  <div className="content">
    <br/><br/><br/><br/>

  </div>
</body>
</>
    )
}
export default StudentHead;





        
