import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ChannelContext } from "../contexts/ChannelProvider";

import styles from "../css/HomePage.module.css";

const HomePage = () => {
  const history = useHistory();
  const { channels } = useContext(ChannelContext);

  const handleClick = (channelId) => {
    history.push(`/channels/${channelId}`);
  };

  const renderChannels = () => {
    return channels.map((channel) => (
      <div
        className={styles.card}
        key={channel.id}
        onClick={() => handleClick(channel.id)}
      >
        {channel.image ? (
          <div>
            <img alt="channel-logo" src={channel.image} />
            <span className={styles.channelName}>{channel.name}</span>
          </div>
        ) : (
          <div className={styles.imageFrame}>
            <span>{channel.name}</span>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={styles.home}>
      {/* <h1 className={styles.h1Header}>Welcome to, DAB.</h1> */}
      <h1 className={styles.h1Header}>Välkommen till, Sveriges Radio.</h1>
      {/* <p className={styles.pHeader}>
        DAB stands for Digital Audio Broadcasting.
      </p> */}
      <p className={styles.pHeader}>
        Här hittar du massa kalaler med roliga program, avsnitt och poddar.
      </p>
      {channels && (
        <div className={styles.cardContainer}>{renderChannels()}</div>
      )}
    </div>
  );
};

export default HomePage;
