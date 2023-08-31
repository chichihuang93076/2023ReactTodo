import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Auth from "./views/Auth";
import Login from "./views/Login";
import Register from "./views/Register";
import Todo from "./views/Todo";

function App() {
  return (
    <div>
      <nav>
        {/* <NavLink to="/">首頁</NavLink> | */}
        {/* <NavLink to="/auth/register">註冊</NavLink> */}
      </nav>

      <NavLink to="/auth"></NavLink>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
