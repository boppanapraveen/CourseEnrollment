import { useEffect, useState } from "react";
import StudentHead from "./studentHead";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function ViewVideos(){
    const [videos, setVideo] = useState([])
    let token = Cookies.get("token");
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let sectionId = params.get('sectionId');
    const navigate = useNavigate();
    useEffect(()=>{
  
        let url = "http://localhost:2023/getVideos";
        var httpReq = new XMLHttpRequest();
        httpReq.open("get", url+"?sectionId="+sectionId,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                    data = JSON.parse(data);
                    setVideo(data)
            }
            
        }
        httpReq.send();
    })
    const writeQuiz = (videoId)=>{
        navigate("/WriteQuestions?videoId="+videoId+"&sectionId="+sectionId)
    }
    const viewQuizResults = (videoId)=>{
        navigate("/viewQuizResults?videoId="+videoId)
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
                                <th>Video</th>
                                <th>Title</th>
                                <th>Quiz</th>
                            </tr>
                        </thead>
                        <tbody>
                          {videos.map((video,index)=>
                          <tr>
                            <td>
                            <video src={'http://localhost:2023/video/'+video['videoLink']}   height="200px" controls preload="none"></video>
                            </td>
                            <td>{video['videoTitle']}</td>
                            <td>
                                <button onClick={()=>writeQuiz(video['videoId'])} className="btn btn-primary w-100" style={{fontSize:"13px"}}>Write Quiz</button>
                                <button onClick={()=>viewQuizResults(video['videoId'])} className="btn btn-primary mt-3 w-100" style={{fontSize:"13px"}}>View Results</button>
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
export default ViewVideos;