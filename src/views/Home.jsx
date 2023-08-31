import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { VITE_APP_APIURL } = import.meta.env;
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    // 取得 Cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("todotoken="))
      ?.split("=")[1];
    // 預設 axios 的表頭
    axios.defaults.headers.common["Authorization"] = cookieValue;

    // 驗證登入
    axios
      .get(`${VITE_APP_APIURL}/users/checkout`)
      .then((res) => {
        console.log(res);
        setStatus(true);
        //navigate("/todo");
      })
      .catch((err) => {
        console.log("登入失敗啦", err);
        setTimeout(() => {
          navigate("/auth/login");
        }, 0);
      });
  }, []);

  return (
    <div>
      {status && navigate("/todo")}
      {!status && navigate("/auth/login")}
    </div>
  );
};

export default Home;
