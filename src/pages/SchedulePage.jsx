import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ChannelContext } from "../contexts/ChannelProvider";
import styles from "../css/ChannelPage.module.css";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChannelPage = (props) => {
  const history = useHistory();

  const renderPrograms = (channelId) => {
    history.push(`/channels/${channelId}`);
  };

  const {
    singleChannel,
    getChannelSchedule,
    getChannelById,
    schedule,
  } = useContext(ChannelContext);

  const { channelId } = props.match.params;

  useEffect(() => {
    getChannelSchedule(channelId);
    getChannelById(channelId);
    // eslint-disable-next-line
  }, []);

  const convertToDateObject = (SRTimeString) => {
    // eslint-disable-next-line
    return new Date(parseInt(SRTimeString.replace(/[\/\(\)date]/gi, "")))
      .toLocaleString()
      .split(" ")[1];
  };

  let content = <h2 className={styles.loadingStyle}>Loading...</h2>;

  if (schedule && singleChannel) {
    content = (
      <div className={styles.container}>
        <div className={styles.channelStyle}>
          <div>
            <img
              className={styles.channelImage}
              alt="channel-logo"
              src={singleChannel.channel.image}
            />
          </div>
          <h1 className={styles.header}>{singleChannel.channel.name}</h1>
          <FontAwesomeIcon className={styles.heart} icon={faHeart} />
        </div>

        <div className={styles.whitePadding}>
          <button type="button" className="btn btn-secondary m-2">
            <div onClick={() => renderPrograms(channelId)}>Kanaler</div>
          </button>
        </div>

        <div className={styles.programStyle}>
          {schedule.map((scheduleItem) => (
            <div key={scheduleItem.id}>
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className={`${styles.cardStyle} card`}>
                    <div className="row no-gutters">
                      <div className="col-sm-5 col-lg-4">
                        {scheduleItem.imageurl ? (
                          <img
                            alt="Episode"
                            className={styles.programImage}
                            src={scheduleItem.imageurl}
                          />
                        ) : (
                          <div
                            className={`${styles.imageFrame} ${styles.programImage}`}
                          >
                            <span>{scheduleItem.title}</span>
                          </div>
                        )}
                      </div>
                      <div className="col-sm-7 col-lg-4 mt-4">
                        <div className="card-body">
                          <h5 className="card-title">{scheduleItem.title}</h5>
                          <p className="card-text">{scheduleItem.subtitle}</p>
                          <span>
                            {convertToDateObject(scheduleItem.starttimeutc)} -{" "}
                          </span>
                          <span>
                            {convertToDateObject(scheduleItem.endtimeutc)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <div>{content}</div>;
};

export default ChannelPage;
