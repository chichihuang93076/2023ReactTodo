import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
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
        />

        <input
          className="formControls_btnSubmit"
          type="button"
          value="登入"
          // onClick={handleSignup}
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
    </div>
  );
};

export default Login;
