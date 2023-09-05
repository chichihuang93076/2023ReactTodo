import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState("");

  const { VITE_APP_APIURL } = import.meta.env;

  const handleSignup = () => {
    if (password === pwd) {
      signUp();
    } else {
      setMessage("密碼輸入不一致請再次確認");
    }
  };

  const signUp = async () => {
    try {
      const response = await axios.post(`${VITE_APP_APIURL}/users/sign_up`, {
        email,
        password,
        nickname,
      });
      navigate("/auth/login");
      console.log(response.data);
      //setMessage("註冊成功:" + response.data.uid);
    } catch (error) {
      console.log(error.response.data.message);
      setMessage("註冊失敗:" + error.message);
      Swal.fire({
        title: "註冊失敗，" + error.response.data.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <form className="formControls">
        <h2 className="formControls_txt">註冊帳號</h2>
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
        <label className="formControls_label" htmlFor="name">
          您的暱稱
        </label>
        <input
          className="formControls_input"
          type="text"
          name="nickname"
          id="nickname"
          placeholder="請輸入您的暱稱"
          onChange={(e) => setNickname(e.target.value)}
        />
        <label className="formControls_label" htmlFor="password">
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
        <label className="formControls_label" htmlFor="pwd">
          再次輸入密碼
        </label>
        <input
          className="formControls_input"
          type="password"
          name="pwd"
          id="pwd"
          placeholder="請再次輸入密碼"
          required
          onChange={(e) => setPwd(e.target.value)}
        />
        <input
          className="formControls_btnSubmit"
          type="button"
          value="註冊帳號"
          onClick={handleSignup}
        />
        <input
          className="formControls_btnLink"
          type="button"
          value="登入"
          onClick={() => {
            navigate("/auth/login");
          }}
        />
        <span>{message}</span>
      </form>
    </div>
  );
};

export default Register;
