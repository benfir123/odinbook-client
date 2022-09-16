import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token"))
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/signin"
            element={<SignIn token={token} setToken={setToken} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={<Dashboard token={token} setToken={setToken} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
