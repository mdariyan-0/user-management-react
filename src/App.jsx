import { useReducer, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import UserEdit from "./components/UserEdit";
import UserList from "./components/UserList";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router";
import FrontPge from "./components/FrontPge";

function App() {
  const commonReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, loggedIn: action.payload };
      case "SET_USER_LIST":
        return { ...state, userList: action.payload };
      case "ADD_PAGE":
        return { ...state, page: action.payload };
      case "DELETE_PAGE":
        return { ...state, page: action.payload };
      case "SET_TOTAL_DATA":
        return {...state, totalResults: action.payload };
      case "SET_DATA_PER_PAGE":
        return {...state, dataPerPage: action.payload };
      case "SET_TOTAL_PAGE":
        return {...state, totalPages: action.payload };
      case "UPDATE_USER":
        return {
          ...state,
          userList: state.userList.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ),
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(commonReducer, {
    loggedIn: false,
    userList: "",
    page: 1,
    totalResults: 0,
    dataPerPage: 0,
    totalPages: 0,

  });
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      dispatch({ type: "LOGIN", payload: false });
    }
  }, [state.loggedIn]);
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<FrontPge/>} />
          <Route
            exact
            path="/login"
            element={
              state.loggedIn || sessionStorage.getItem("token") ? (
                <Navigate replace to="/userData" />
              ) : (
                <Login state={state} dispatch={dispatch} />
              )
            }
          />

          <Route
            exact
            path="/userData"
            element={<UserList state={state} dispatch={dispatch} />}
          />
          <Route
            path="/editUser/:id"
            element={<UserEdit state={state} dispatch={dispatch} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
