import React, { useEffect, useState } from "react";
import InstructorHead from "./instructorHead";
import Cookies from "js-cookie";
import $ from 'jquery';
function AddCourse(){
    let token = Cookies.get("token");
    const [subCategories ,SetSubCategory] = useState([])

    useEffect(()=>{
        let url3 = "http://localhost:2023/getSubCategories";
        var httpReq = new XMLHttpRequest();
        httpReq.open("get", url3,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                    data = JSON.parse(data);
                    SetSubCategory(data)
            }
            
        }
        httpReq.send();
       
    })
    const [state, setState] = useState([])
    const fileSelectedHandler = (event) => {
      setState({
        selectedFile: event.target.files[0],
        filename: event.target.files
      })
    }


    const addCourseAction = e =>{
        e.preventDefault();
        let courseName = document.getElementById("courseName").value;
        let subCategoryId = document.getElementById("subCategoryId").value;
        let image = document.getElementById("image").value;
        let courseDescription = document.getElementById("courseDescription").value;
        let coursePrice = document.getElementById("coursePrice").value;
 


        let course = new FormData();
        course.append('courseName', courseName);
        course.append('subCategoryId', subCategoryId);
        course.append('courseDescription', courseDescription);
        course.append('coursePrice', coursePrice);
        course.append('image', state.selectedFile);
        let url = "http://localhost:2023/addCourseAction";
        var httpReq = new XMLHttpRequest();
        httpReq.open("Post", url,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                alert(data);
                document.getElementById("courseName").value="";
                document.getElementById("subCategoryId").value="";
                document.getElementById("image").value="";
                document.getElementById("courseDescription").value="";
                document.getElementById("coursePrice").value="";

            }
        
        }
        httpReq.send(course);
        
    }

    return(
        <>
        <InstructorHead/>
        <div className="container-fluid mt-5" style={{position:'absolute',top:'50px',left:"480px"}}>
             <div className="row">
                <div className="col-md-4">
                    <div className="card p-3 mt-2">
                        <form onSubmit={addCourseAction}>
                            <div className="text-center h4">Add New Course</div>
                            <div className="form-group">
                                <label><b>Course Name</b></label>
                                <input type="text" id="courseName" className="form-control" placeholder="Enter Course"></input>
                            </div>
                            <div className="form-group">
                                <label><b>Choose Image</b></label>
                                <input type="file" id="image" onChange={fileSelectedHandler} className="form-control mt-1" ></input>
                            </div>
                            <div className="form-group">
                                <label><b>Choose SubCategory</b></label>
                                <select id="subCategoryId" className="form-control mt-1">
                            {subCategories.map((subCategory,index)=>
                             <option key={subCategory['subCategoryId']} value={subCategory['subCategoryId']}>{subCategory['subCategoryName']}({subCategory['categoryModel']['categoryName']})</option>
                             )}   
                             </select>
                            </div>
                            <div className="form-group">
                                <label><b>Course Price</b></label>
                                <input type="number" id="coursePrice" className="form-control" placeholder="Enter Course Price"></input>
                            </div>
                            <div className="form-group">
                                <label>Course Description</label>
                                <textarea id="courseDescription" placeholder="Description" className="form-control mt-1"></textarea>
                            </div>
                            <input type="submit" value={"Add Course"} className="btn btn-success w-100 mt-3"></input>
                        </form>

                    </div>
                </div>
             </div>
        </div>
        </>
    )
}
export default AddCourse;