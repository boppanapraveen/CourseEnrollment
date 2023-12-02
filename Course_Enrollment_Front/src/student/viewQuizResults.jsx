import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';
import StudentHead from "./studentHead";
import InstructorHead from "../instructor/instructorHead";

function ViewQuizResults(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let videoId = params.get('videoId');
    
    let token = Cookies.get("token");
    const[results,setResults] = useState([])
     
     useEffect(()=>{
            let url = "http://localhost:2023/viewResults?videoId="+videoId;
            $.ajax({
                type:"get",
                url:url,
                headers:{'Authorization': 'Bearer '+token},
                contentType : "application/json; charset=utf-8",
                success : function(data,status){
                    console.log(data);
                    setResults(data)
                }
            })
        },[])
    return(
        <>
        
        {Cookies.get("role")==="Student"?<><StudentHead/></>:<></>}
        {Cookies.get("role")==="Instructor"?<><InstructorHead/></>:<></>}
        <div className="container" style={{position:'absolute',top:'50px',left:"150px"}}>
            <div className="text-center h3 mt-4">View Quiz Results</div>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-11">
                {results.map((result,index)=>
                 <div className="card mt-5">
                  <div className="card-header">{result['questionsModel']['question']}</div>
                  <div className="card-body">
                    <div className="text-muted" style={{fontSize:"13px"}}>Correct Answer</div>
                    <div className="h6">{result['questionsModel']['answer']}</div>
                    <div className="text-muted" style={{fontSize:"13px"}}>Student Answer</div>
                    <div className="h6">{result['answer']}</div>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                        <div className="col-md-6">
                        <div className="text-muted" style={{fontSize:"13px"}}>Option A</div>
                         <div className="h6">{result['questionsModel']['optionA']}</div>
                        </div>
                        <div className="col-md-6">
                        <div className="text-muted" style={{fontSize:"13px"}}>Option B</div>
                         <div className="h6">{result['questionsModel']['optionB']}</div>
                        </div>
                        <div className="col-md-6">
                        <div className="text-muted" style={{fontSize:"13px"}}>Option C</div>
                         <div className="h6">{result['questionsModel']['optionC']}</div>
                        </div>
                        <div className="col-md-6">
                        <div className="text-muted" style={{fontSize:"13px"}}>Option D</div>
                         <div className="h6">{result['questionsModel']['optionD']}</div>
                        </div>
                    </div>
                    <div className="text-center  mt-4 h6" style={{fontSize:"13px"}}>Quiz Attempted By : {result['enrollsModel']['studentModel']['name']} (Student)</div>
                    </div>
                </div>
              )}
                </div>
            </div>
            
        </div>
        </>
    )
}
export default ViewQuizResults;