import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Error from "../Error/Error";

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="*" element={<Error/>}></Route>
      </Routes>
    </div>
  );
}

export default AllRoutes;
