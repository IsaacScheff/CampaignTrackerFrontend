import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorldList from "./WorldList";
import SingleWorld from './SingleWorld';
import SinglePost from './SinglePost';
import AboutPage from "./AboutPage";
import WorldForm from "./WorldForm";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import "../App.css";

const Router = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <div className="App">
        <main>
          <Navbar />
        </main>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
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