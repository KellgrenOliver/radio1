import React from "react";
import { Link, useHistory } from "react-router-dom";
import SignUpComp from "../components/SignUpComp";
import styles from "../css/LogIn.module.css";

function LogIn() {
  const history = useHistory();

  const renderLogin = () => {
    history.push("/login");
  };

  return (
    <div>
      <SignUpComp />
      <Link onClick={() => renderLogin()} className={styles.createaccountHere}>
        Har du redan ett konto? Logga in här
      </Link>
    </div>
  );
}

export default LogIn;
