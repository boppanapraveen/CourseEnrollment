import { useNavigate } from "react-router-dom";
import StudentHead from "./studentHead";
import Cookies from "js-cookie";
import $ from 'jquery';
import { useEffect, useState } from "react";

function ViewSections(){
    const navigate = useNavigate();
    const [sections,setSections] = useState([])
    let token = Cookies.get("token");
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let courseId = params.get('courseId');
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
        navigate("/ViewVideos?sectionId="+sectionId);
    }

    return(
        <>
        <StudentHead/>
        <div className="container mt-5" style={{position:'absolute',top:'50px',left:"150px"}}>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-11">
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
        </>
    )
}
export default ViewSections;