import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { ProgramContext } from "../contexts/ProgramProvider";

import styles from "../css/HomePage.module.css";

const ProgramsPage = () => {
  const history = useHistory();
  const { programs } = useContext(ProgramContext);

  const handleClick = (programId) => {
    history.push(`/schedule/${programId}`);
  };

  const renderPrograms = () => {
    return programs.map((program) => (
      <div
        className={styles.card}
        key={program.id}
        onClick={() => handleClick(program.id)}
      >
        {program.image ? (
          <img width="150px" alt="channel" src={program.image} />
        ) : (
          <div className={styles.imageFrame}>
            <span>{program.name}</span>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.h1Header}>Welcome to, DAB.</h1>
      <p className={styles.pHeader}>
        DAB stands for Digital Audio Broadcasting.
      </p>
      {programs && (
        <div className={styles.cardContainer}>{renderPrograms()}</div>
      )}
    </div>
  );
};

export default ProgramsPage;
