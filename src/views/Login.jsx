import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { VITE_APP_APIURL } = import.meta.env;

  const signIn = async () => {
    try {
      const response = await axios.post(`${VITE_APP_APIURL}/users/sign_in`, {
        email,
        password,
      });
      console.log(response.data);
      if (response.data.status) {
        console.log(response.data.token);
        document.cookie = `todotoken=${response.data.token};`;
        //setMessage("Token:" + response.data.token);
        navigate("/todo");
      } else {
        setMessage("登入失敗:" + response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      setMessage("登入失敗:" + error.message);
    }
  };

  return (
    <div>
      <form className="formControls">
        <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
        <label className="formControls_label" htmlFor="email">
          Email
        </label>
        <input
          className="formControls_input"
          type="text"
          id="email"
          name="email"
          placeholder="請輸入 email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="formControls_label" htmlFor="pwd">
          密碼
        </label>
        <input
          className="formControls_input"
          type="password"
          name="password"
          id="password"
          placeholder="請輸入密碼"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="formControls_btnSubmit"
          type="button"
          value="登入"
          onClick={signIn}
        />
        <input
          className="formControls_btnLink"
          type="button"
          value="註冊帳號"
          onClick={() => {
            navigate("/auth/register");
          }}
        />
      </form>
      <span>{message}</span>
    </div>
  );
};

export default Login;
