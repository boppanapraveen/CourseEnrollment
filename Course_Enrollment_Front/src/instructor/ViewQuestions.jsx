import Cookies from "js-cookie";
import InstructorHead from "./instructorHead";
import $ from 'jquery';
import { useState } from "react";
import { useEffect } from "react";

function ViewQuestions(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let videoId = params.get('videoId');
    let token = Cookies.get("token");
    const[questions,setQuestions] = useState([])

    useEffect(()=>{
        let url = "http://localhost:2023/viewQuestions?videoId="+videoId;
        $.ajax({
            type:"get",
            url:url,
            headers:{'Authorization': 'Bearer '+token},
            contentType : "application/json; charset=utf-8",
            success : function(data,status){
                setQuestions(data)
            }
            
        })
    })
  
    return(
        <>
        <InstructorHead/>
        <div className="container" style={{position:'absolute',top:'50px',left:"150px"}}>
          
             <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-11 mt-5">
                <div className="text-center h3">View Questions</div>
                        <div className="row">
                        {questions.map((question,index)=>
                        <div className="col-md-12">
                            <div className="card p-1 mt-3">
                             <div className="card-header">Q{index+1} : {question['question']} ?</div>
                             <div className="card-body">
                                <div className="text-secondary" style={{fontSize:"13px"}}>Options</div>
                                <div className="">A  : {question['optionA']}</div>
                                <div className="">B  : {question['optionB']}</div>
                                <div className="">C  : {question['optionC']}</div>
                                <div className="">D  : {question['optionD']}</div>
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
export default ViewQuestions;