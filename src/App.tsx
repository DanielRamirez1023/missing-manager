import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { GlobalContextProvider } from "./context/GlobalContext";
import AddMissing from "./pages/AddMissing";
import Home from "./pages/Home";
import ListMissings from "./pages/ListMissings";
import Menu from "./pages/Menu";

function App() {
  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/menu/:name" element={<Menu />}></Route>
          <Route path="/menu/:name/addmissing" element={<AddMissing />}></Route>
          <Route
            path="/menu/:name/listmissing"
            element={<ListMissings />}
          ></Route>
        </Routes>
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App;
