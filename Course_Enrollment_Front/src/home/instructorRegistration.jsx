import React, { useState } from "react";
import Head from "./head";
import $ from 'jquery';
function InstructorRegistration(){

    const [state, setState] = useState([])
    const fileSelectedHandler = (event) => {
      setState({
        selectedFile: event.target.files[0],
        filename: event.target.files
      })
    }


      const instructorRegAction = e =>{
        e.preventDefault();
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let about = document.getElementById("about").value;
        let password = document.getElementById("password").value;
        let phone = document.getElementById("phone").value;
        let profielPicture = document.getElementById("profielPicture").value;
        let address = document.getElementById("address").value;

        if(name.length==0){
            document.getElementById("nameMsg").innerHTML="* Field Required";
            e.preventDefault();
            return
        }else{
            document.getElementById("nameMsg").innerHTML="";
        }
        if(email.length==0){
            document.getElementById("emailMsg").innerHTML="* Field Required";
            e.preventDefault();
            return
        }else{
            document.getElementById("emailMsg").innerHTML="";
        }

        
      

        
        if(about.length==0){
            document.getElementById("aboutMsg").innerHTML="* Field Required";
            e.preventDefault();
            return
        }else{
            document.getElementById("aboutMsg").innerHTML="";
        }
        if(password.length==0){
            document.getElementById("passwordMsg").innerHTML="* Field Required";
            e.preventDefault();
            return
        }else{
            document.getElementById("passwordMsg").innerHTML="";
        }
        if(phone.length==0){
            document.getElementById("phoneMsg").innerHTML="* Field Required";
            e.preventDefault();
            return
        }else{
            document.getElementById("phoneMsg").innerHTML="";
        }
        if(profielPicture.length==0){
            document.getElementById("picMsg").innerHTML="* Field Required";
            e.preventDefault();
            return
        }else{
            document.getElementById("picMsg").innerHTML="";
        }

        if(address.length==0){
            document.getElementById("addressMsg").innerHTML="* Field Required";
            e.preventDefault();
            return
        }else{
            document.getElementById("addressMsg").innerHTML="";
        }


        let instructor = new FormData();
        instructor.append('name', name);
        instructor.append('email', email);
        instructor.append('phone', phone);
        instructor.append('password', password);
        instructor.append('profielPicture', profielPicture);
        instructor.append('address', address);
        instructor.append('about', about);
        instructor.append('profielPicture', state.selectedFile);
        let url = "http://localhost:2023/InstructorReg";
        var httpReq = new XMLHttpRequest();
        httpReq.open("Post", url,true);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                alert(data);
                document.getElementById("name").value="";
                document.getElementById("email").value="";
                document.getElementById("phone").value="";
                document.getElementById("password").value="";
                document.getElementById("profielPicture").value="";
                document.getElementById("address").value="";
                document.getElementById("about").value="";

               
            
            }
        
        }
        httpReq.send(instructor);


      }

    return(
        <>
         <div className="pic">
        <Head/>
        <div className="container mt-5">
            <form onSubmit={instructorRegAction}>
                <div className="card mt-2 p-3">
                    <div className="text-center h4">New Instructor Registration</div>
                   <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" id="name" className="form-control" placeholder="Enter Name" ></input>
                            <div className="text-danger" id="nameMsg"></div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" id="email" className="form-control" placeholder="Enter Email" ></input>
                            <div className="text-danger" id="emailMsg"></div>
                        </div>
                        
                        <div className="form-group">
                            <label>About</label>
                            <textarea id="about" placeholder="Enter About" className="form-control" ></textarea>
                            <div className="text-danger" id="aboutMsg"></div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" id="password" className="form-control" placeholder="Enter Password" ></input>
                            <div className="text-danger" id="passwordMsg"></div>
                        </div>
                    </div>
                    <div className="col-md-6">
                       <div className="form-group">
                            <label>Phone</label>
                            <input type="number" id="phone" className="form-control" placeholder="Enter Phone" ></input>
                            <div className="text-danger" id="phoneMsg"></div>
                        </div>
                        <div className="form-group">
                            <label>Picture</label>
                            <input type="file" id="profielPicture" className="form-control" onChange={fileSelectedHandler} ></input>
                            <div className="text-danger" id="picMsg"></div>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <textarea id="address" placeholder="Enter Address" className="form-control" ></textarea>
                            <div className="text-danger" id="addressMsg"></div>
                        </div>
                        <div className="">
                            <input type="submit" value={"Register"} className="btn btn-success w-100 mt-3"></input>
                        </div>
                    </div>
                    
                    </div>
                </div>
            </form>
     
        </div>
        </div>
        </>
    )
}
export default InstructorRegistration;