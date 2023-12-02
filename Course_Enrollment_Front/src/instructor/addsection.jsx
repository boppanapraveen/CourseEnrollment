import React, { useEffect, useState } from "react";
import InstructorHead from "./instructorHead";
import Cookies from "js-cookie";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";

function Addsection(){
    const navigate = useNavigate();
    const [sections,setSections] = useState([])
    let token = Cookies.get("token");
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let courseId = params.get('courseId');
    useEffect(()=>{
        document.getElementById("courseId").value=courseId;
    })


    const AddSectionAction = e=>{
        e.preventDefault();
        let courseId = document.getElementById("courseId").value;
        let sectionName = document.getElementById("sectionName").value;
        console.log(courseId);
        let section = {
            "sectionName":sectionName,
            "courseId":courseId
        }
        let url = "http://localhost:2023/addSection";
        $.ajax({
            type:"Post",
            url:url,
            data : JSON.stringify(section),
            headers:{'Authorization': 'Bearer '+token},
            contentType : "application/json; charset=utf-8",
            success : function(data,status){
                alert(data)
                document.getElementById("sectionName").value="";
                document.getElementById("courseId").value=courseId;

    
            }
            
        })



    }

    useEffect(()=>{
        let url = "http://localhost:2023/viewSections";
        $.get({
            type:"get",
            url:url+"?courseId="+courseId,
            headers:{'Authorization': 'Bearer '+token},
            contentType : "application/json; charset=utf-8",
            success : function(data,status){
                setSections(data)
            }
            
        })
    })

    const addVideos = (e)=>{
        e.preventDefault();
        let sectionId = e.target[0].value;
        console.log(sectionId);
        navigate("/addVideos?sectionId="+sectionId);
    }




    return(
        <>
        <InstructorHead/>
        <div className="container mt-5" style={{position:'absolute',top:'50px',left:"150px"}}>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-11">
                    <div className="row">
                    <div className="col-md-4 mt-5">
                    <div className="card p-3 mt-2">
                        <form onSubmit={AddSectionAction}>
                            <div className="text-center h4">Add New Section</div>
                            <div className="form-group">
                                <input type="hidden" id="courseId"></input>
                                <input type="text" id="sectionName" className="form-control" placeholder="Section Name"></input>
                            </div>
                            <input type="submit" value={"Add Section"} className="btn btn-primary w-100 mt-2"></input>
                        </form>
                    </div>
                    
                </div>
                <div className="col-md-8 mt-4">
                    <div className="text-center h5">Sections</div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Section Id</th>
                                <th>Name</th>
                                <th>Videos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sections.map((section,index)=>
                            <tr>
                                <td>{section['sectionId']}</td>
                                <td>{section['sectionName']}</td>
                                <td>
                                    <form onSubmit={addVideos}>
                                        <input type="hidden" id="sectionId" value={section['sectionId']}></input>
                                        <input type="submit"  value={"Videos"} className="btn btn-primary w-100"></input>
                                    </form>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                    </div>
                </div>
    
            </div>
        </div>
        </>
    )
}
export default Addsection;