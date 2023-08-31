import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

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
        />
        <input
          className="formControls_btnSubmit"
          type="button"
          value="註冊帳號"
          // onClick={handleSignup}
        />
        <input
          className="formControls_btnLink"
          type="button"
          value="登入"
          onClick={() => {
            navigate("/auth/login");
          }}
        />
      </form>
    </div>
  );
};

export default Register;
