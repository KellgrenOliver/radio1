import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
const CryptoJS = require("crypto-js");

export const UserContext = createContext();

const UserProvider = (props) => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [programs, setPrograms] = useState("");

  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== null) {
      if (JSON.parse(localStorage.getItem("loggedIn")) === true) {
        setLoggedIn(true);
      }
    }
  }, [loggedIn]);

  const onChangeEmailAddress = (e) => {
    setEmailAddress(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onChangeLoginEmail = (e) => {
    setLoginEmail(e.target.value);
  };

  const getUser = async (e, email) => {
    e.preventDefault();
    let user = await fetch(`/api/v1/user/${email}`);
    user = await user.json();
    const bytes = CryptoJS.AES.decrypt(
      user.password,
      "You will never gonna hack this"
    );
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (originalPassword === password) {
      history.push("/");
      window.location.reload();
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("user", email);
      setLoginEmail("");
      setPassword("");
      setEmailAddress("");
    } else {
      setEmailAddress("");
      setLoginEmail("");
      setPassword("");
      alert("Fel lösenord!");
    }
    setUser(user);
  };

  const createUser = async (e, user) => {
    e.preventDefault();
    if (confirmPassword === password) {
      let result = await fetch("/api/v1/user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      await getUser(e, user.email);
      return result;
    } else {
      alert("Lösenorden stämmer inte överens!");
      setPassword("");
      setConfirmPassword("");
    }
  };

  const addProgramToUser = async (email, program) => {
    let result = await fetch(`/api/v1/user/program/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(program),
    });
    console.log(program);
    return result;
  };

  const addChannelToUser = async (email, channel) => {
    let result = await fetch(`/api/v1/user/channel/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(channel),
    });
    return result;
  };

  const logOut = () => {
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("user");
    setLoggedIn(false);
    history.push("/");
  };

  const deleteUser = async (email) => {
    let result = await fetch(`/api/v1/user/${email}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      logOut();
    }
    return result;
  };

  const values = {
    emailAddress,
    password,
    confirmPassword,
    loggedIn,
    user,
    loginEmail,
    programs,
    deleteUser,
    setPrograms,
    addProgramToUser,
    addChannelToUser,
    onChangeEmailAddress,
    onChangePassword,
    onChangeConfirmPassword,
    setEmailAddress,
    setPassword,
    setConfirmPassword,
    createUser,
    logOut,
    setLoggedIn,
    setUser,
    getUser,
    onChangeLoginEmail,
    setLoginEmail,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
