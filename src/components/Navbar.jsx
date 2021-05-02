import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";

import styles from "../css/Navbar.module.css";

const Navbar = () => {
  const { loggedIn, logOut, deleteUser } = useContext(UserContext);

  return (
    <div>
      <nav
        className={`${styles.navbar} navbar navbar-expand-lg navbar-light bg-light`}
      >
        <Link to="/">
          <img
            className={styles.logo}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Sveriges-Radio-Logo.svg/1280px-Sveriges-Radio-Logo.svg.png"
            width="180"
            height="30"
            alt="logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="nav-item nav-link w-100">
            <Link className={styles.link} to="/about">
              Om SR
            </Link>
            {loggedIn ? (
              <React.Fragment>
                <Link className={styles.link} to="/favorites">
                  Favoriter
                </Link>
                <Link
                  className={`${styles.link} float-end`}
                  onClick={() => deleteUser(localStorage.getItem("user"))}
                  to="/"
                >
                  Radera profil
                </Link>
                <Link
                  onClick={logOut}
                  className={`${styles.link} float-end`}
                  to="/"
                >
                  Logga ut
                </Link>
              </React.Fragment>
            ) : (
              <Link to="/login" className={`${styles.link} float-end`}>
                Logga in
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
