import React from "react";
import { Link, useHistory } from "react-router-dom";
import LogInComp from "../components/LogInComp";
import styles from "../css/LogIn.module.css";

const LogIn = () => {
  const history = useHistory();

  const renderSignup = () => {
    history.push("/signup");
  };

  return (
    <div>
      <LogInComp />
      <div>
        <Link
          onClick={() => renderSignup()}
          className={styles.createaccountHere}
        >
          Har du inget konto? Skapa ditt konto här
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
