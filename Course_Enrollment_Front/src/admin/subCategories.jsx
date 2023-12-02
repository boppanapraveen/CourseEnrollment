import React, { useEffect, useState } from "react";
import $ from 'jquery';
import Cookies from "js-cookie";
import InstructorHead from "../instructor/instructorHead";

function SubCategory(){
    let token = Cookies.get("token");
    const [categories ,SetCategory] = useState([])
    const [subCategories ,SetSubCategory] = useState([])
    const[count,setCount] = useState(0)
    useEffect(()=>{
        let url2 = "http://localhost:2023/getCategories";
        var httpReq = new XMLHttpRequest();
        httpReq.open("get", url2,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                    data = JSON.parse(data);
                    SetCategory(data)
            }
            
        }
        httpReq.send();

        
       
    })
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
                alert(data)
                $("#subCategoryName").val("");
                setCount(count+1)
    
            }
        })
    }
return(
    <>
    <InstructorHead/>
    <div className="container mt-5" style={{position:'absolute',top:'50px',left:"200px"}}>
        <div className="text-center h5 ">Sub Categories</div>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-4">
                    <div className="card p-3 mt-3">
                        <form onSubmit={addSubCategory}>
                            <div className="form-group">
                                <label>SubCategory Name</label>
                                <input type="text" name="" id="subCategoryName" className="form-control mt-1" placeholder="SubCategory Name" required></input>
                            </div>
                            <div className="form-group">
                            <label>Choose Category</label>
                            <select id="categoryId" className="form-control mt-1">
                                {categories.map((category,index)=>
                                <option key={category['categoryId']} value={category['categoryId']}>{category['categoryName']}</option>
                                )}
                            </select>
                            </div>
                            <input type="submit" value={"Add SubCategory"} className="btn btn-success mt-2 w-100"></input>
                        </form>
                        
                    </div>
                </div>
                <div className="col-md-7 mt-3">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                            <th>SubCategory Id</th>
                            <th>SubCategory Name</th>
                            <th>Category</th>
                        </tr>
                      </thead>
                      <tbody>
                       {subCategories.map((subCategory,index)=>
                        <tr>
                            <td>{subCategory['subCategoryId']}</td>
                            <td>{subCategory['subCategoryName']}</td>
                            <td>{subCategory['categoryModel']['categoryName']}</td>
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
export default SubCategory;