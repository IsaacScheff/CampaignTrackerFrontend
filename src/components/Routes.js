import React from "react";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import WorldList from "./WorldList";
import SingleWorld from './SingleWorld';


const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          Welcome!
          <Link to ='/worlds'>World List</Link>
        </nav>
        <main>
          {/* <WorldList />  */}
        </main>
        <Routes>
          <Route exact path="/worlds" element={<WorldList />} />
          <Route path='/worlds/:worldId' element={<SingleWorld />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;