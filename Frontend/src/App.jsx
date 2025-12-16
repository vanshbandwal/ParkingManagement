import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Protected from "./Middleware/Protected";
import ParkingForm from "./pages/Form";
import Inform from "./pages/Inform";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
         <Route
          path="/formData/:num"
          element={
            <Protected>
              <ParkingForm />
            </Protected>
          }
        />
             <Route
          path="/parkingInform"
          element={
            <Protected>
              <Inform />
            </Protected>
          }
        />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
