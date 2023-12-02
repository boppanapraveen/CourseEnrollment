import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import StudentHead from "./studentHead";
import InstructorHead from "../instructor/instructorHead";
import AdminHead from "../admin/adminHead";

function GetPayments(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let enrolId = params.get('enrolId');
    let token = Cookies.get("token");
    const[payment,setPayment] = useState([])
    useEffect(()=>{
        let url3 = "http://localhost:2023/getPayments?enrolId="+enrolId;
        var httpReq = new XMLHttpRequest();
        httpReq.open("get", url3,true);
        httpReq.setRequestHeader('Authorization', 'Bearer ' + token);
        httpReq.onreadystatechange = function(){
            if(this.readyState == 4 && this.status== 200){
                let data = this.responseText
                    data = JSON.parse(data);
                    console.log(data);
                    setPayment(data)
            }
            
        }
        httpReq.send();
    },[])
    return(
        <>
       {Cookies.get("role")==="Student"?<div><StudentHead/></div>:<></>}
          {Cookies.get("role")==="Instructor"?<div><InstructorHead/></div>:<></>}
          {Cookies.get("role")==="Admin"?<div><AdminHead/></div>:<></>}
        <div className="container mt-3" style={{position:'absolute',top:'50px',left:'150px'}}>
            <div className="text-center h5 mt-3">Payments</div>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-11">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>PaymentId</th>
                            <th>Amount</th>
                            <th>Transaction Date</th>
                            <th>Payment Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{payment['paymentId']}</td>
                                <td>$ {payment['amount']}</td>
                                <td>{payment['date']}</td>
                                <td>{payment['status']}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}
export default GetPayments;