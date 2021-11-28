import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./views/Home";
import Compose from "./views/Compose";
import Details from "./views/Details";
import Edit from "./views/Edit";

const App: React.FC<AppProps> = (props) => {
  return (
    <BrowserRouter>
      <div className="blogger">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compose" element={<Compose />} />
          <Route path="/details/:blogid" element={<Details />} />
          <Route path="/edit/:blogid" element={<Edit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

interface AppProps {}

export default App;
