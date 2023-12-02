import Cookies from "js-cookie";
import StudentHead from "./studentHead";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';

function GiveRating(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let enrolId = params.get('enrolId');
    let token = Cookies.get("token");
    const navigate = useNavigate();

    function ratingAction(e){
        e.preventDefault();
       let enrolId = document.getElementById("enrolId").value;
       let rating = document.getElementById("rating").value;
       let review = document.getElementById("review").value;
       let data = {
          "rating":rating,
          "review":review
       }
       let url = "http://localhost:2023/giveRating?enrolId="+enrolId;
       $.ajax({
        type:"Post",
        url:url,
        data : JSON.stringify(data),
        headers:{'Authorization': 'Bearer '+token},
        contentType : "application/json; charset=utf-8",
        success : function(data,status){
            alert(data)
            navigate("/enrolls")
          


        }
        
    })
    }
    return(
        <>
        <StudentHead/>
        <div className="container mt-3" style={{position:'absolute',top:'50px',left:'150px'}}>
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-5 mt-5">
                <div className="card p-3">
                    <div className="text-center h4">Rating For Course</div>
                    <form onSubmit={ratingAction}>
                        <input type="hidden" id="enrolId" value={enrolId}></input>
                        <div className="form-group">
                            <label>Rating</label>
                            <select id="rating" className="form-control mt-1">
                                <option value={"5"}>5</option>
                                <option value={"4"}>4</option>
                                <option value={"3"}>3</option>
                                <option value={"2"}>2</option>
                                <option value={"1"}>1</option>
                            </select>
                        </div>
                        <div className="form-group mt-1">
                            <label>Review</label>
                            <textarea id="review" className="form-control mt-1" placeholder="Comment"></textarea>
                        </div>
                        <input type="submit" value={"Submit"} className="btn btn-primary w-100 mt-3"></input>
                        
                    </form>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}
export default GiveRating;