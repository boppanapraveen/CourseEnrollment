import Cookies from "js-cookie";
import StudentHead from "./studentHead";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";

function PayAmount(){
    const navigate = useNavigate();
    let token = Cookies.get("token");
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let courseId = params.get('courseId');
    let price = params.get("price")
    console.log(price);

    const PaymentAction = e =>{
        e.preventDefault();
        
        let courseId = document.getElementById("courseId").value;
        let amount = document.getElementById("amount").value;
        let nameOnCard = document.getElementById("nameOnCard").value;
        let cardNumber = document.getElementById("cardNumber").value;
        let cvv = document.getElementById("cvv").value;
        let expireDate = document.getElementById("expireDate").value;

        if(nameOnCard.length==0){
            document.getElementById("nameOncard-message").innerHTML="Enter NameOn Card";
            e.preventDefault();
            return
        }
        else{
            document.getElementById("nameOncard-message").innerHTML="";
        }

        if(cardNumber.length==0){
            document.getElementById("cardNumber-message").innerHTML="Enter CardNumber";
            e.preventDefault();
            return
        }else if(cardNumber.length!=16){
            document.getElementById("cardNumber-message").innerHTML="CardNumber Should Be 16";
            e.preventDefault();
            return
        }else{
            document.getElementById("cardNumber-message").innerHTML=""; 
        }
        if(cvv.length==0){
            document.getElementById("cvv-message").innerHTML="Enter Cvv";
            e.preventDefault();
            return
        }
        else if(cvv.length!=3){
            document.getElementById("cvv-message").innerHTML="Invalid Cvv"
            e.preventDefault();
            return
         }
        else{
        document.getElementById("cvv-message").innerHTML=""; 
        }

        if(expireDate.length==0){
            document.getElementById("date_message").innerHTML="Enter ExpDate";
            e.preventDefault();
            return
        }
        else if(expireDate.length!=5){
            document.getElementById("date_message").innerHTML="Invalid ExpDate"
            e.preventDefault();
            return
         }else{
            document.getElementById("date_message").innerHTML=""; 
        }
       
        let payment = {
            "amount":amount
        }
      let userAmount = document.getElementById("userAmount")
        let url = "http://localhost:2023/enrollCourse?courseId="+courseId+"&amount="+amount;
        $.ajax({
            type:"Post",
            url:url,
            data : JSON.stringify(payment),
            headers:{'Authorization': 'Bearer '+token},
            contentType : "application/json; charset=utf-8",
            success : function(data,status){
                alert(data)
                navigate("/AvailableCourses")
              

    
            }
            
        })
        
    }
    return(
        <>
        <StudentHead/>
        <div className="container mt-3" style={{position:'absolute',top:'50px',left:'150px'}}>
    <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-5 mt-2">
            <div className="card p-4 mt-3 ">
                <form onSubmit={PaymentAction}>
                    <input type="hidden" id="courseId" value={courseId}></input>
                    <input type="hidden" id="amount" value={price}></input>
                    <div class="row"><div class="col-md-6">Payable  Price</div><div class="col-md-3 h5">$ {price} </div></div>
                        <div class="mt-2">
                            <label for="nameOnCard">Name on Card</label>
                            <input type="text" name="nameOnCard" id="nameOnCard" placeholder="Enter Name On Card" class="form-control" />
                            <div className="mt-1 text-danger" id="nameOncard-message"></div>
                        </div>
                        <div class="mt-2">
                            <label for="cardNumber">Card Number</label>
                            <input type="number" name="cardNumber" id="cardNumber" placeholder="Enter Card Number" class="form-control" />
                            <div className="mt-1 text-danger" id="cardNumber-message"></div>
                        </div>
                        
                        <div class="mt-2">
                            <label for="cvv">CVV</label>
                            <input type="text" name="cvv" id="cvv" placeholder="Enter CVV" class="form-control" />
                            <div className="mt-1 text-danger" id="cvv-message"></div>
                        </div>
                        <div class="mt-2">
                            <label for="expireDate">Expire Date</label>
                            <input type="text" name="expireDate" id="expireDate" placeholder="MM/YY" class="form-control mt-1" />
                            <div className="mt-1 text-danger" id="date_message"></div>
                        </div>
                    <input type="submit" value="Pay & Enroll" class="btn btn-primary w-100 mt-2" />
                </form>
            </div>
        </div>
    </div>
</div>
        </>
    )
}
export default PayAmount;