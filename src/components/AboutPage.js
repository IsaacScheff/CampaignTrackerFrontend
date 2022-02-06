import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams  } from "react-router-dom";



export function AboutPage () {
    
    return (
        <div className='about-page'>
            Created by Isaac Scheff
            other info...
            <p>
                <a href="https://www.linkedin.com/in/isaac-scheff/">LinkedIn</a>  {/* replace with LinkedIn logo*/}
            </p>
            <p>
                <a href="https://github.com/IsaacScheff/">GitHub</a>
            </p>
        </div>
    )
}

export default AboutPage;