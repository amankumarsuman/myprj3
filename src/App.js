import "./App.css";

import Body from "./components/body/Body";

import RoasterDetails from "./components/roasterDetails/RoasterDetails";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<RoasterDetails />} />
        <Route exact path="home" element={<RoasterDetails />} />
        <Route exact path="playground" element={<Body />} />
      </Routes>
      {/* <Body/> */}
    </div>
  );
}

export default App;
