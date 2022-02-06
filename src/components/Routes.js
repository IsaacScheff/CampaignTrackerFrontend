import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//import {connect} from 'react-redux'
import WorldList from "./WorldList";
import SingleWorld from './SingleWorld';
import SinglePost from './SinglePost';
import AboutPage from "./AboutPage";
import WorldForm from "./WorldForm";
import "../App.css";

const Router = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar">
          <Link to ='/worlds'>Campaign List</Link>
          ~~~
          <Link to ='/createnewcampaign'>Create New Campaign</Link>
          ~~~
          <Link to ='/about'>About</Link>
        </nav>
        <main>
          {/* <WorldList />  */}
        </main>
        <Routes>
          <Route exact path='/worlds' element={<WorldList />} />
          <Route path='/worlds/:worldId' element={<SingleWorld />} />
          <Route path='/:worldId/posts/:postId' element={<SinglePost />} />
          <Route exact path='/about' element={<AboutPage />} />
          <Route exact path='/createnewcampaign' element={<WorldForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;