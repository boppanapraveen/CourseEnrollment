import React from "react";
import Head from "./head";
function HomePage(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let message = params.get('message');
    return(
        <>
        <div className="pic2">
        <Head/>
        {message!=""?<>
        <div className="text-danger p-3 bg h3 text-center   mt-5" style={{lineHeight:"30px"}}>{message}</div>
        </>:null}
                <div className="text-center mt-5  text-white h3" style={{lineHeight:"100px"}}>Course Enrollment System</div>

        </div>
        </>
    )
}
export default HomePage;