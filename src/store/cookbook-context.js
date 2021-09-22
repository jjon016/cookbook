import React, { useState } from 'react';

const CookbookContext = React.createContext({
  id: '',
  name: '',
  created: '',
  owner: '',
  recipes: [],
  setData: () => {},
});

export const CookbookContextProvider = (props) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [created, setCreated] = useState('');
  const [owner, setOwner] = useState('');
  const [recipes, setRecipes] = useState([]);

  const setDataHandler = (data) => {
    if (data.id) {
      setId(data.id);
    }
    if (data.name) {
      setName(data.name);
    }
    if (data.created) {
      setCreated(data.created);
    }
    if (data.owner) {
      setOwner(data.owner);
    }
    if (data.recipes) {
      setRecipes(data.recipes);
    }
  };

  const contextValue = {
    id: id,
    name: name,
    created: created,
    owner: owner,
    recipes: recipes,
    setData: setDataHandler,
  };

  return (
    <CookbookContext.Provider value={contextValue}>
      {props.children}
    </CookbookContext.Provider>
  );
};

export default CookbookContext;
