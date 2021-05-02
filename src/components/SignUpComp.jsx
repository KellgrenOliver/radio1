import React, { useContext } from "react";
import styles from "../css/LogIn.module.css";
import { UserContext } from "../contexts/UserProvider";

function SignUpComp() {
  const {
    emailAddress,
    onChangeEmailAddress,
    password,
    onChangePassword,
    confirmPassword,
    onChangeConfirmPassword,
    createUser,
  } = useContext(UserContext);

  const user = {
    email: emailAddress,
    password: password,
  };

  return (
    <div className={styles.signupcomp}>
      <h1 className={styles.header}>SKAPA KONTO</h1>
      <form
        onSubmit={async (e) => await createUser(e, user)}
        className={styles.loginForm}
      >
        <div>
          <label type="email">Email</label>
        </div>
        <div>
          <input
            value={emailAddress}
            onChange={onChangeEmailAddress}
            type="email"
          ></input>
        </div>
        <div>
          <label>Lösenord</label>
        </div>
        <div>
          <input
            value={password}
            onChange={onChangePassword}
            type="password"
          ></input>
        </div>
        <div>
          <label>Bekräfta Lösenord</label>
        </div>
        <div>
          <input
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            type="password"
          ></input>
        </div>
        <div>
          <button type="submit" className={styles.signinButton}>
            SKAPA
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpComp;
