import { createContext, useState } from "react";

export const ProgramContext = createContext();

const ProgramProvider = (props) => {
  const [programs, setPrograms] = useState(null);
  const [favoritePrograms, setFavoritePrograms] = useState(null);
  const [categories, setCategories] = useState(null);

  const getProgramsFromUser = async (email) => {
    let programs = await fetch(`/api/v1/programs/favorites/${email}`);
    programs = await programs.json();
    setFavoritePrograms(programs);
  };

  // const deleteFavorite = (programToDelete) => {
  //   favorites.list = favorites.list.filter(
  //     (program) => program.id !== programToDelete.id
  //   );
  //   setFavorites(favorites);
  // };

  const renderProgramsById = async (channelId) => {
    let programs = await fetch(`/api/v1/programs/${channelId}`);
    programs = await programs.json();
    setPrograms(programs);
  };

  const renderCategories = async (channelId) => {
    let categories = await fetch(`/api/v1/programs/categories/${channelId}`);
    categories = await categories.json();
    setCategories(categories);
  };

  const renderProgramsByCategory = async (channelId, categoryId) => {
    let programs = await fetch(`/api/v1/programs/${channelId}/${categoryId}`);
    programs = await programs.json();
    setPrograms(programs);
  };

  const values = {
    programs,
    categories,
    favoritePrograms,
    setFavoritePrograms,
    setCategories,
    renderCategories,
    renderProgramsByCategory,
    renderProgramsById,
    setPrograms,
    getProgramsFromUser,
  };

  return (
    <ProgramContext.Provider value={values}>
      {props.children}
    </ProgramContext.Provider>
  );
};

export default ProgramProvider;
