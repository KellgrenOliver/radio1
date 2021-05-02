import React, { useContext, useEffect } from "react";
import { ProgramContext } from "../contexts/ProgramProvider";
import { ChannelContext } from "../contexts/ChannelProvider";
import styles from "../css/FavoritePage.module.css";

const Favorite = () => {
  const { favoritePrograms, getProgramsFromUser } = useContext(ProgramContext);
  const { favoriteChannels, getChannelsFromUser } = useContext(ChannelContext);

  useEffect(() => {
    getProgramsFromUser(localStorage.getItem("user"));
    getChannelsFromUser(localStorage.getItem("user"));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {favoritePrograms && (
        <div>
          <h2 className={styles.header}>Favoritprogram</h2>
          <div className={styles.container}>
            {favoritePrograms.map((program) => {
              return (
                <div className={styles.imageContainer} key={program.id}>
                  <img
                    alt="program"
                    className={styles.programImage}
                    src={program.programimage}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {favoriteChannels && (
        <div>
          <h2 className={styles.header}>Favoritkanaler</h2>
          <div className={styles.container}>
            {favoriteChannels.map((channel) => {
              return (
                <div className={styles.imageContainer} key={channel.id}>
                  <img
                    alt="channel"
                    className={styles.programImage}
                    src={channel.image}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorite;
