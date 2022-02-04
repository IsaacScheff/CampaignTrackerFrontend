import React from "react";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import WorldList from "./WorldList";
import SingleWorld from './SingleWorld';
import SinglePost from './SinglePost';


const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          Welcome!
          <Link to ='/worlds'>Campaign List</Link>
        </nav>
        <main>
          {/* <WorldList />  */}
        </main>
        <Routes>
          <Route exact path="/worlds" element={<WorldList />} />
          <Route path='/worlds/:worldId' element={<SingleWorld />} />
          <Route path='/:worldId/posts/:postId' element={<SinglePost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;