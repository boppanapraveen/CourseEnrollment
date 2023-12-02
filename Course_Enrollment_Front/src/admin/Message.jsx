import InstructorHead from "../instructor/instructorHead";
import AdminHead from "./adminHead";

function Message(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let message = params.get('message');
    return(
        <>
        <AdminHead/>
        <InstructorHead/>
        <div className="container mt-4"  style={{position:'absolute',top:'50px',left:'80px'}}>
        <div className="text-center h3 mt-5" style={{lineHeight:"100px"}}>{message}</div>
        </div>
        </>
    )
}
export default Message;