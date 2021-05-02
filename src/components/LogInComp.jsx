import React, { useContext } from "react";
import styles from "../css/LogIn.module.css";
import { UserContext } from "../contexts/UserProvider";

function LogInComp() {
  const {
    onChangeLoginEmail,
    loginEmail,
    onChangePassword,
    password,
    getUser,
  } = useContext(UserContext);

  return (
    <div className={styles.logincomp}>
      <h1 className={styles.header}>LOGGA IN</h1>
      <form
        className={styles.loginForm}
        onSubmit={async (e) => await getUser(e, loginEmail)}
      >
        <div>
          <label>Email</label>
        </div>
        <div>
          <input
            onChange={onChangeLoginEmail}
            value={loginEmail}
            type="email"
          ></input>
        </div>
        <div>
          <label>Lösenord</label>
        </div>
        <div>
          <input
            type="password"
            onChange={onChangePassword}
            value={password}
          ></input>
        </div>
        <div>
          <button type="submit" className={styles.signinButton}>
            LOGGA IN
          </button>
        </div>
      </form>
    </div>
  );
}

export default LogInComp;
