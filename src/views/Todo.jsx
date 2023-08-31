import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate();
  const { VITE_APP_APIURL } = import.meta.env;
  // 取得 Cookie
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("todotoken="))
    ?.split("=")[1];
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [tabStatus, setTabStatus] = useState("全部");

  // 預設 axios 的表頭
  axios.defaults.headers.common["Authorization"] = cookieValue;

  useEffect(() => {
    // 驗證登入
    axios
      .get(`${VITE_APP_APIURL}/users/checkout`)
      .then((res) => {
        console.log(res);
        getTodos();
      })
      .catch((err) => {
        console.log("登入失敗啦", err);
        setTimeout(() => {
          navigate("/auth/login");
        }, 0);
      });
  }, []);

  const getTodos = async () => {
    const res = await axios.get(`${VITE_APP_APIURL}/todos/`, {
      headers: {
        Authorization: cookieValue,
      },
    });
    setTodos(res.data.data);
    console.log(res.data.data);
  };

  //新增代辦事項
  const addTodo = async () => {
    try {
      const res = await axios.post(`${VITE_APP_APIURL}/todos/`, {
        content: content,
      });
      //console.log(res.data.status);
      if (res.data.status) {
        setContent("");
        getTodos();
        //setMessage("新增成功");
      } else {
        setMessage("新增失敗" + res.data.message);
      }
    } catch (error) {
      setMessage("新增失敗：" + error.message);
    }
  };

  //刪除代辦事項by id
  const deleteTodo = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(`${VITE_APP_APIURL}/todos/${id}`, {});
      console.log(res);
    } catch (error) {
      setMessage(error.mssage);
    }
  };

  //刪除單一代辦事項
  const handleTodobyid = (id) => {
    deleteTodo(id);
    getTodos();
  };

  //刪除已完成的代辦事項 待處理
  const handleDeleteTodos = () => {
    todos.map((todo) => {
      if (todo.status) {
        deleteTodo(todo.id);
      }
    });
    getTodos();
  };

  //處理todolist
  const handleTodoList = (tabStatus) => {
    const filterTodoList = todos.filter((item) => {
      tabStatus === "待完成"
        ? !item.status
        : tabStatus === "已完成"
        ? item.status
        : "";
    });
    console.log(filterTodoList);
  };

  const handleTabStatus = (e) => {
    const { name } = e.target;
    //console.log(name, value);
    setTabStatus(name);
    const filterTodoList = todos.filter((item) => {
      name === "待完成" ? !item.status : name === "已完成" ? item.status : "";
    });
    console.log(filterTodoList);
  };

  //變更todo狀態
  const toggleTodo = async (id) => {
    try {
      const res = await axios.patch(`${VITE_APP_APIURL}/todos/${id}/toggle`);
      console.log(res.data.status);
      getTodos();
      handleTodoList(tabStatus);
    } catch (error) {
      setMessage(error.mssage);
    }
  };

  //logout
  const signOut = async () => {
    try {
      const res = await axios.post(
        `${VITE_APP_APIURL}/users/sign_out`,
        {},
        {
          headers: {
            Authorization: cookieValue,
          },
        }
      );

      if (res.data.status) {
        navigate("/auth/login");
      } else {
        setMessage("登出失敗:" + res.data.message);
      }
    } catch (error) {
      setMessage("登出失敗:" + error.message);
    }
  };

  return (
    <div id="todoListPage" className="bg-half">
      {/* {JSON.stringify(todos)} */}
      <nav>
        <h1>
          <a>ONLINE TODO LIST</a>
        </h1>
        <ul>
          <li className="todo_sm">
            <a href="#">
              <span>王小明的代辦</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={signOut}>
              登出
            </a>
          </li>
        </ul>
      </nav>
      <span>{message}</span>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
            <input
              type="text"
              placeholder="請輸入待辦事項"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <a href="#" onClick={addTodo}>
              <i className="fa fa-plus"></i>
            </a>
          </div>
          <div className="todoList_list">
            <ul className="todoList_tab">
              <li>
                <a
                  className={tabStatus === "全部" ? "active" : ""}
                  name="全部"
                  onClick={(e) => handleTabStatus(e)}
                >
                  全部
                </a>
              </li>
              <li>
                <a
                  name="待完成"
                  className={tabStatus === "待完成" ? "active" : ""}
                  onClick={(e) => handleTabStatus(e)}
                >
                  待完成
                </a>
              </li>
              <li>
                <a
                  name="已完成"
                  className={tabStatus === "已完成" ? "active" : ""}
                  onClick={(e) => handleTabStatus(e)}
                >
                  已完成
                </a>
              </li>
            </ul>
            <div className="todoList_items">
              <ul className="todoList_item">
                {todos.length > 0 &&
                  todos.map((todo, index) => (
                    <li key={index}>
                      <label className="todoList_label">
                        <input
                          className="todoList_input"
                          type="checkbox"
                          value={todo.status}
                          checked={todo.status}
                          onChange={() => toggleTodo(todo.id)}
                        />
                        <span>{todo.content}</span>
                      </label>
                      <a href="#" onClick={() => handleTodobyid(todo.id)}>
                        <i className="fa fa-times"></i>
                      </a>
                    </li>
                  ))}
              </ul>
              <div className="todoList_statistics">
                <p>
                  {todos.filter((item) => !item.status).length} 個未完成項目
                </p>
                <a href="#" onClick={() => handleDeleteTodos()}>
                  清除已完成項目
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
