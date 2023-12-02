import Cookies from "js-cookie";
import InstructorHead from "./instructorHead";
import $ from 'jquery';
import { Link } from "react-router-dom";

function AddQuestions(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let videoId = params.get('videoId');
    let token = Cookies.get("token");

    const AddQuestionAction = e =>{
        e.preventDefault();
        let videoId = document.getElementById("videoId").value;
        let question = document.getElementById("question").value;
        let optionA = document.getElementById("optionA").value;
        let optionB = document.getElementById("optionB").value;
        let optionC = document.getElementById("optionC").value;
        let optionD = document.getElementById("optionD").value;
        let answer = document.getElementById("answer").value;

        let postdata = {
            "question":question,
            "optionA":optionA,
            "optionB":optionB,
            "optionC":optionC,
            "optionD":optionD,
            "answer":answer
        }
        let url = "http://localhost:2023/addQuestions?videoId="+videoId;
        $.ajax({
            type:"Post",
            url:url,
            data : JSON.stringify(postdata),
            headers:{'Authorization': 'Bearer '+token},
            contentType : "application/json; charset=utf-8",
            success : function(data,status){
                alert(data)
            }
            
        })
    }
    return (
        <>
        <InstructorHead/>
        <div className="container" style={{position:'absolute',top:'50px',left:"150px"}}>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-11 mt-5">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div className="card p-3">
                                <div className="text-center h3">Add Questions</div>
                                <form onSubmit={AddQuestionAction}>
                                    <input type="hidden" id="videoId" value={videoId}/>
                                    <div className="form-group">
                                        <label>Question</label>
                                        <input type="text" id="question" className="form-control mt-1" placeholder="Question ?"></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Option A</label>
                                        <input type="text" id="optionA" className="form-control mt-1" ></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Option B</label>
                                        <input type="text" id="optionB" className="form-control mt-1" ></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Option C</label>
                                        <input type="text" id="optionC" className="form-control mt-1" ></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Option D</label>
                                        <input type="text" id="optionD" className="form-control mt-1" ></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Answer</label>
                                        <select className="form-control mt-1" id="answer">
                                            <option value={"optionA"}>Option A</option>
                                            <option value={"optionB"}>Option B</option>
                                            <option value={"optionC"}>Option C</option>
                                            <option value={"optionD"}>Option D</option>
                                        </select>
                                    </div>
                                    <input type="submit" value={"Add"} className="btn btn-primary w-100 mt-3" style={{fontSize:"13px"}}></input>
                                    <div className="mt-3 text-center">
                             Click To?
                                 <Link to="/instructorHome" >Exit</Link>
                         </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default AddQuestions;