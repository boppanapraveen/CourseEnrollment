import Cookies from "js-cookie";
import StudentHead from "./studentHead";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateStudent(){
    const navigate = useNavigate();
    let token = Cookies.get("token");
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let studentId = params.get('studentId');
    const[student,setStudent]  = useState([])
    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPasword] = useState("")
    const[address,setAddress] = useState("")
    const[phone,setPhone] = useState("")
    const[walletAmount,setWalletAmount] = useState("")
    const [state, setState] = useState([])

    const fileSelectedHandler = (event) => {
      setState({
        selectedFile: event.target.files[0],
        filename: event.target.files
      })
    }
    useEffect(()=>{
        let url3 = "http://localhost:2023/getStudentDetails?studentId="+studentId;
            var httpReq = new XMLHttpRequest();
            httpReq.open("get", url3,true);
            httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
            httpReq.onreadystatechange = function(){
                if(this.readyState == 4 && this.status== 200){
                    let data = this.responseText
                    if(data.length!=0){
                      data = JSON.parse(data);
                      document.getElementById("studentId").value=data['studentId'];
                      document.getElementById("phone").value=data['phone'];
                      document.getElementById("name").value=data['name'];
                      document.getElementById("email").value=data['email'];
                      document.getElementById("walletAmount").value=data['walletAmount'];
                      document.getElementById("password").value=data['password'];
                    }
                }
            }
            httpReq.send();
      },[])
      
      const UpdateStudentDetails = e =>{
        e.preventDefault();
        let name2 = document.getElementById("name").value;
        let email2= document.getElementById("email").value;
        let phone2 = document.getElementById("phone").value;
        let password2 = document.getElementById("password").value;
        let walletAmount2 = document.getElementById("walletAmount").value;
        let studentId2 = document.getElementById("studentId").value;
         let student = new FormData();

         student.append("studentId",studentId2)
         student.append('name', name2);
         student.append('email', email2);
         student.append('phone', phone2);
         student.append('password', password2);
         student.append('walletAmount', walletAmount2);
         let url = "http://localhost:2023/updateStudent?studentId="+studentId;
         var httpReq = new XMLHttpRequest();
         httpReq.open("Post", url,true);
         httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
         httpReq.onreadystatechange = function(){
             if(this.readyState == 4 && this.status== 200){
                 let data = this.responseText
                 alert(data);
                 navigate("/studentHome")
                
             }
         
         }
         httpReq.send(student);

      }
    return(
        <>
        <StudentHead/>
        <div className="container mt-5" style={{position:'absolute',top:'50px',left:"150px"}}>
            <form onSubmit={UpdateStudentDetails}>
                <input type="hidden" id="studentId" ></input>
                    <div className="text-center h4 ">Update {student['name']} Details</div>
                   <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" id="name" onKeyDown={(e)=>{setName(e.target.value)}} className="form-control" ></input>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" id="email" onKeyDown={(e)=>{setEmail(e.target.value)}} className="form-control" ></input>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" id="password" onKeyDown={(e)=>{setPasword(e.target.value)}} className="form-control"></input>
                        </div>
                    </div>
                    <div className="col-md-4">
                       <div className="form-group">
                            <label>Phone</label>
                            <input type="number" id="phone"  onKeyDown={(e)=>{setPhone(e.target.value)}} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Wallet Amount</label>
                            <input type="number" id="walletAmount" onKeyDown={(e)=>{setWalletAmount(e.target.value)}} className="form-control" ></input>
                        </div>
                        <div className="">
                            <input type="submit" value={"Update"} className="btn btn-primary w-100 mt-3"></input>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}
export default UpdateStudent;