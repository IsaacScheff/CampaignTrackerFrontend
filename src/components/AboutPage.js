import React from "react";
import linkedIn from '../assets/LI-Logo.png';
import github from '../assets/GitHub_Logo.png'
export function AboutPage () {
    
    return (
        <div className='about-page'>
            Created with the React javascript library by Isaac Scheff
            <p>Find me on</p>
            <p>
                <a href="https://www.linkedin.com/in/isaac-scheff/"> 
                    <img className="logo-link" src={linkedIn} alt="Linked In Logo"/>
                </a> 
            </p>
            <p>
                <a href="https://github.com/IsaacScheff/">
                    <img className="logo-link" src={github} alt="GitHub Logo"/>
                </a>
            </p>
        </div>
    )
}

export default AboutPage;