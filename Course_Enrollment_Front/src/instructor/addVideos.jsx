import React, { useEffect, useState } from "react";
import InstructorHead from "./instructorHead";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function AddVideos(){

    const [videos, setVideo] = useState([])
    let token = Cookies.get("token");
    let search = window.location.search;
    let params = new URLSearchParams(search);
    const[count,setCount] = useState(0)
    let sectionId = params.get('sectionId');
    const navigate = useNavigate();
    useEffect(()=>{
        sectionId = document.getElementById("sectionId").value=sectionId;
    })

    const [state, setState] = useState([])
    const fileSelectedHandler = (event) => {
      setState({
        selectedFile: event.target.files[0],
        filename: event.target.files,
        
      })
    }



    const addVideosAction = e =>{
        e.preventDefault();
        let sectionId = document.getElementById("sectionId").value;
        let videoTitle = document.getElementById("videoTitle").value;
        let videoLink = document.getElementById("videoLink").value;
        let description = document.getElementById("description").value;
        let No = document.getElementById("No").checked ;
        let Yes = document.getElementById("Yes").checked ;
        let isFreeVideo;
        if(No ===true){
            isFreeVideo = "No";
        }else{
            isFreeVideo = "Yes";
        }
        console.log(videoTitle);
        let videos = new FormData();
        videos.append('sectionId', sectionId);
        videos.append('videoTitle', videoTitle);
        videos.append('description', description);
        videos.append('isFreeVideo', isFreeVideo);
        videos.append('videoLink', state.selectedFile);
        let url = "http://localhost:2023/addVideos";
        var httpReq = new XMLHttpRequest();
        httpReq.open("Post", url,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                alert(data);
                document.getElementById("videoLink").value="";
                document.getElementById("sectionId").value=sectionId;
                document.getElementById("description").value="";
                document.getElementById("videoTitle").value="";
                setCount(count+1)
            }
        }
        httpReq.send(videos);
    }
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
    },[count])

    const addQuestions = (videoId)=>{
        navigate("/AddQuestions?videoId="+videoId)
        console.log(videoId);

    }
    const viewQuestions = (videoId) =>{
        navigate("/ViewQuestions?videoId="+videoId)
    }
    const viewQuizResults = (videoId)=>{
        navigate("/viewQuizResults?videoId="+videoId)
    }
    return(
        <>
        <InstructorHead/>
        <div className="container mt-5"  style={{position:'absolute',top:'50px',left:"150px"}}>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-11">
                    <div className="row">
                    <div className="col-md-4 mt-5">
                    <div className="card p-3 mt-2">
                        <form onSubmit={addVideosAction}>
                            <div className="text-center h4">Add New Videos</div>
                            <input type="hidden" id="sectionId"></input>
                            <div className="form-group">
                                <label>Video Title</label>
                                <input type="text" id="videoTitle" className="form-control" placeholder="Video Title"></input>
                            </div>
                            <div className="form-group">
                            <label>Video Link</label>
                                <input type="file" id="videoLink" onChange={fileSelectedHandler} className="form-control mt-1" placeholder="Link"></input>
                            </div>
                            <div className="form-group mt-1">
                                <label>Is FreeVideo</label>
                                <input type="radio" id="No" name="isFreeVideo" value={"No"} /><label>No</label>
                                <input type="radio" id="Yes" name="isFreeVideo" value={"Yes"} /><label>Yes</label>
                            </div>
                            <div className="form-group">
                            <label>Video Description</label>
                            <textarea id="description" className="form-control mt-1" placeholder="Enter Description"></textarea>
                            </div>
                            <input type="submit" value={"Add Video"} className="btn btn-primary w-100 mt-2"></input>
                        </form>
                    </div>
                    
                </div>
                <div className="col-md-8 mt-4">
                {/* <div class="container mt-5">
          <h2>Video streaming</h2>
          <video src="http://localhost:2023/video/javatechie" width="720px" height="480px" controls preload="none">
          </video>
      </div> */}
                    <div className="text-center h5">Videos</div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Video</th>
                                <th>Title</th>
                                <th>Questions</th>
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
                                <button className="btn btn-primary" onClick={()=>addQuestions(video['videoId'])} style={{fontSize:"12px"}}>Add Questions</button>
                                <button className="btn btn-primary mt-3" onClick={()=>viewQuestions(video['videoId'])} style={{fontSize:"12px"}}>View Questions</button>
                                <button className="btn btn-primary mt-3" onClick={()=>viewQuizResults(video['videoId'])} style={{fontSize:"12px"}}>View Results</button>
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
export default AddVideos;