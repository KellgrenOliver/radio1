import { createContext, useState, useEffect } from "react";

export const ChannelContext = createContext();

const ChannelProvider = (props) => {
  const [channels, setChannels] = useState(null);
  const [favoriteChannels, setFavoriteChannels] = useState(null);
  const [schedule, setChannelSchedule] = useState(null);
  const [singleChannel, setSingleChannel] = useState(null);

  useEffect(() => {
    getAllChannels();
  }, []);

  const getChannelsFromUser = async (email) => {
    let channels = await fetch(`/api/v1/channels/favorites/${email}`);
    channels = await channels.json();
    setFavoriteChannels(channels);
  };

  const getAllChannels = async () => {
    let channels = await fetch("/api/v1/channels");
    channels = await channels.json();
    setChannels(channels);
  };

  const getChannelById = async (channelId) => {
    let channel = await fetch(`/api/v1/channels/${channelId}`);
    channel = await channel.json();
    setSingleChannel(channel);
  };

  const getChannelSchedule = async (channelId) => {
    let schedule = await fetch(`/api/v1/channels/schedule/${channelId}`);
    schedule = await schedule.json();
    setChannelSchedule(schedule);
  };

  const values = {
    channels,
    schedule,
    singleChannel,
    favoriteChannels,
    setFavoriteChannels,
    getChannelById,
    setChannelSchedule,
    setSingleChannel,
    getChannelSchedule,
    getChannelsFromUser,
  };

  return (
    <ChannelContext.Provider value={values}>
      {props.children}
    </ChannelContext.Provider>
  );
};

export default ChannelProvider;
