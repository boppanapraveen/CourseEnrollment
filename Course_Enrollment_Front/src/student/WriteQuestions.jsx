import Cookies from "js-cookie";
import StudentHead from "./studentHead";
import { useEffect } from "react";
import { useState } from "react";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";

function WriteQuestions(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let videoId = params.get('videoId');
    let token = Cookies.get("token");
    const navigate = useNavigate();
    let sectionId = params.get("sectionId")
    const[questions,setQuestions] = useState([])
    const[count,setCount] = useState(0)
    useEffect(()=>{
        let url = "http://localhost:2023/getQuizCount?videoId="+videoId;
        $.ajax({
            type:"get",
            url:url,
            headers:{'Authorization': 'Bearer '+token},
            contentType : "application/json; charset=utf-8",
            success : function(data,status){
                console.log(data);
                if(parseInt(data)>0){
                    navigate("/viewQuizResults?videoId="+videoId)
                }

            }
            
        })
    },[count])
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
        },[])
    
    const writeQuestion1 = e =>{
        e.preventDefault();
        let results = []
       for(let i=0;i<questions.length; i++){
          var optionA = document.getElementById(questions[i]['questionId']+"a").checked;
          var optionB = document.getElementById(questions[i]['questionId']+"b").checked;
          var optionC = document.getElementById(questions[i]['questionId']+"c").checked;
          var optionD = document.getElementById(questions[i]['questionId']+"d").checked;
          let status = "Wrong Answer"
          let answer = "Not Answered"
          if(optionA) {
            answer = "optionA"
          }else if(optionB) {
            answer = "optionB"
          }else if(optionC) {
            answer = "optionC"
          }else if(optionD) {
            answer = "optionD"
          }
          if(optionA && questions[i]['answer']=="optionA") {
            status = "Correct Answer"
          }else if(optionB && questions[i]['answer']=="optionB") {
            status = "Correct Answer"
          }else if(optionC && questions[i]['answer']=="optionC") {
            status = "Correct Answer"
          }else if(optionD && questions[i]['answer']=="optionD") {
            status = "Correct Answer"
          }
          let result ={"questionId": questions[i]['questionId'],"status": status, "answer": answer}
          console.log(result);    
          results.push(result)   
       }
       console.log(results);
       let url2 = "http://localhost:2023/writeQuestions?videoId="+videoId;
       var httpReq = new XMLHttpRequest();
        httpReq.open("post", url2,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                    alert(data)
                    navigate("/enrolls")
            }
            
        }
        httpReq.send(JSON.stringify(results));
    }
    return(
        <>
        <StudentHead/>
        <div className="container" style={{position:'absolute',top:'50px',left:"150px"}}>
             <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-11 mt-5">
                <div className="text-center h3">View Questions</div>
                <div className="card p-1 mt-3">
                <form onSubmit={writeQuestion1}>
                    <div className="row">
                        {questions.map((question,index)=>
                        <div className="col-md-12">
                             <div className="card-header">Q{index+1} : {question['question']} ?</div>
                             <div className="card-body p-4">
                               <div className="form-group">
                                <div>
                                   <label for="OptionA">OptionA: </label> <input type="radio"  class="ms-2 mt-1" name={question['questionId']} id={question['questionId']+'a'}  /><label htmlFor={question['questionId']+'a'}>{question['optionA']}</label>
                                </div>
                                <div>
                                   <label for="OptionB">OptionB: </label> <input type="radio"  class="ms-2 mt-1" name={question['questionId']} id={question['questionId']+'b'} /><label htmlFor={question['questionId']+'b'}>{question['optionB']}</label>
                                </div>
                                <div>
                                   <label for="OptionB">OptionC: </label> <input type="radio"  class="ms-2 mt-1" name={question['questionId']} id={question['questionId']+'c'} /><label htmlFor={question['questionId']+'c'}>{question['optionC']}</label>
                                </div>
                                <div>
                                   <label for="OptionB">OptionD: </label> <input type="radio"  class="ms-2 mt-1" name={question['questionId']} id={question['questionId']+'d'} /><label htmlFor={question['questionId']+'d'}>{question['optionD']}</label>
                                </div>
                               </div>
                             </div>
                        </div>
                        )}
                        </div>
                        <input type="submit" value={"Submit"} className="btn btn-primary"></input>
                         </form>
                    </div>
                </div>
             </div>
        </div>
        </>
    )
}
export default WriteQuestions;