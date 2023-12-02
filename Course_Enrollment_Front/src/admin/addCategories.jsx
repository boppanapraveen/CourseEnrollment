import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import InstructorHead from "../instructor/instructorHead";

function AddCategories(){
    const navigate = useNavigate();
    let token = Cookies.get("token");
    const [categories ,SetCategory] = useState([])
    const [subCategories ,SetSubCategory] = useState([])
    const[count,setCount] = useState(0)
    const addCategory = e =>{
        e.preventDefault();
        let categoryName = document.getElementById("categoryName").value;
        let category = {
            "categoryName":categoryName
        }
        let url = "http://localhost:2023/addCategory";
        $.ajax({
            type:"Post",
            url:url,
            data : JSON.stringify(category),
            headers:{'Authorization': 'Bearer '+token},
            contentType : "application/json; charset=utf-8",
            success : function(data,status){
                alert(data)
                document.getElementById("categoryName").value="";
                setCount(count+1)
    
            }
        })
  
    }

    useEffect(()=>{
        let url2 = "http://localhost:2023/getCategories";
        var httpReq = new XMLHttpRequest();
        httpReq.open("get", url2,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                    data = JSON.parse(data);
                    console.log(data);
                    SetCategory(data)
            }
            
        }
        httpReq.send();
    },[count])

    
   
    const addSubCategory = e =>{
        e.preventDefault();
        let subCategoryName = document.getElementById("subCategoryName").value;
        let categoryId = document.getElementById("categoryId").value;
     
        let url = "http://localhost:2023/addSubCategory?subCategoryName="+subCategoryName+"&categoryId="+categoryId;
        $.ajax({
            type:"Post",
            url:url,
            headers:{'Authorization': 'Bearer '+token},
            contentType : "application/json; charset=utf-8",
            success : function(data,status){
                console.log("hello");
                navigate("/Message?message="+data);
                $("#subCategoryName").val("");
    
            }
        })
    }
   

    useEffect(()=>{
        let url3 = "http://localhost:2023/getSubCategories";
        var httpReq = new XMLHttpRequest();
        httpReq.open("get", url3,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                    data = JSON.parse(data);
                    SetSubCategory(data)
            }
            
        }
        httpReq.send();
    },[])

    return(
        <>
        <InstructorHead/>
        <div className="container mt-5" style={{position:'absolute',top:'50px',left:"200px"}}>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-11 mt-3">
                <div className="text-center h6">Categories</div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card p-3 mt-4">
                        <form onSubmit={addCategory}>
                            <div className="form-group">
                                <label>Category Name</label>
                                <input type="text" name="" id="categoryName" className="form-control mt-1" placeholder="Category Name" required></input>
                            </div>
                            <input type="submit" value={"Add Category"} className="btn btn-success  w-100 mt-3" ></input>
                        </form>
                        </div>
                    </div>
                    <div className="col-md-8">
                    <table className="table table-bordered mt-4">
                                <thead>
                                    <tr>
                                        <th>Category Id</th>
                                        <th>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                      {categories.map((category,index)=>
                                        <tr>
                                            <td>{category['categoryId']}</td>
                                             <td>{category['categoryName']}</td>
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

export default AddCategories;