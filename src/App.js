import { HashRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Nav from "./components/Nav";
import Friends from "./pages/Friends";
import Account from "./pages/Account";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";
import Newsfeed from "./pages/Newsfeed";
import axios from "./utils/axios";

function App() {
  //get previously saved user from local storage
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  //check if user's token is still valid
  if (user) {
    axios.defaults.headers.common["Authorization"] = user.token;
    axios
      .get("/users/info")
      .then((result) => {
        return;
      })
      .catch(function (error) {
        localStorage.clear();
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
      });
  }

  return (
    <div className="App">
      <Nav user={user} setUser={setUser} />
      <HashRouter basename="/odinbook-client">
        <Routes>
          <Route
            path="/signin"
            element={<SignIn user={user} setUser={setUser} />}
          />
          <Route path="/signup" element={<SignUp user={user} />} />
          <Route
            path="/"
            element={<Newsfeed user={user} setUser={setUser} />}
          />
          <Route path="/friends" element={<Friends user={user} />} />
          <Route path="/account" element={<Account user={user} />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
