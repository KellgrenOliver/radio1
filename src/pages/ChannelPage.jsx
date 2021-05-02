import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ChannelContext } from "../contexts/ChannelProvider";
import { ProgramContext } from "../contexts/ProgramProvider";
import { UserContext } from "../contexts/UserProvider";

import styles from "../css/ChannelPage.module.css";

const ChannelPage = (props) => {
  const history = useHistory();
  const { channelId } = props.match.params;
  //Go to channel schedule page
  const goToRadioSchedule = (channelId) => {
    history.push(`/schedule/${channelId}`);
  };

  const { getChannelById, singleChannel } = useContext(ChannelContext);
  const {
    renderProgramsById,
    programs,
    renderCategories,
    categories,
    renderProgramsByCategory,
  } = useContext(ProgramContext);
  const { addProgramToUser, addChannelToUser } = useContext(UserContext);

  useEffect(() => {
    getChannelById(channelId);
    renderProgramsById(channelId);
    renderCategories(channelId);
    // eslint-disable-next-line
  }, []);

  let content = <h2 className={styles.loadingStyle}>Loading...</h2>;

  if (singleChannel && programs && categories) {
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
          {JSON.parse(localStorage.getItem("loggedIn")) === true && (
            <FontAwesomeIcon
              onClick={() =>
                addChannelToUser(
                  localStorage.getItem("user"),
                  singleChannel.channel
                )
              }
              className={styles.heart}
              icon={faHeart}
            />
          )}
        </div>

        <div className={`${styles.whitePadding} dropdown show`}>
          <button type="button" className="btn btn-secondary m-2">
            <div onClick={() => goToRadioSchedule(channelId)}>Dagens Tablå</div>
          </button>

          <div
            className="btn btn-secondary dropdown-toggle m-2"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Kategorier
          </div>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <div className={`${styles.dropdown} dropdown-item `}>
              <div>
                <h6
                  className={styles.hover}
                  onClick={() => renderProgramsById(channelId)}
                >
                  VISA ALLA
                </h6>
                {categories.map((category) => (
                  <h6
                    key={category.id}
                    onClick={() =>
                      renderProgramsByCategory(channelId, category.id)
                    }
                  >
                    <div className={styles.hover}>{category.name}</div>
                  </h6>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.programStyle}>
          {programs.map((program) => (
            <div key={program.id} className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <div className={`${styles.cardStyle} card`}>
                  <div className="row no-gutters">
                    <div className="col-sm-5 col-lg-4">
                      <img
                        alt="program"
                        className={styles.channelImage}
                        src={program.programimage}
                      />
                    </div>
                    <div className="col-sm-7 col-lg-4 mt-4">
                      <div className="card-body">
                        <h5 className="card-title">{program.name}</h5>
                        <p className="card-text">{program.description}</p>
                        <span>{program.broadcastinfo}</span>
                      </div>
                    </div>
                    {JSON.parse(localStorage.getItem("loggedIn")) === true && (
                      <div className="col-md-5 col-lg-4 mb-1 mt-2">
                        <FontAwesomeIcon
                          className={styles.programHeart}
                          onClick={(alreadyInFavorites) =>
                            addProgramToUser(
                              localStorage.getItem("user"),
                              program
                            )
                          }
                          icon={faHeart}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <div>{content}</div>;
};

export default ChannelPage;
