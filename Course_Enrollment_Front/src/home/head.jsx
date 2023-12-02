import React from "react";
import {Link} from 'react-router-dom';

function Head(){
    return (
        <>
<nav class="navbar navbar-expand-lg navbar-light p-3 bg-light">
    <div className="container-fluid">
    <div  className="bg-dark text-white p-2" style={{ textTransform: "uppercase"}}>Course Enrollment</div>
        <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample">
        <ul className="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
            <Link  aria-current="page" className="text-dark" to="/" style={{fontSize:"16px"}}><b>Home</b></Link>
            </li>
            <li className="nav-item">
            <Link  aria-current="page" className="text-dark" to="/adminLogin"><b>Admin</b></Link>
            </li>
            <li className="nav-item">
            <Link  aria-current="page" className="text-dark" to="/instructorLogin"><b>Instructor</b></Link>
            </li>
            <li className="nav-item">
            <Link  aria-current="page" className="text-dark" to="/studentLogin"><b>Student</b></Link>
            </li>
            
        </ul>
        </div>
    </div>
</nav>


</>
    )
}
export default Head;
