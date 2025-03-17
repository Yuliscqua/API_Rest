import React, { useState, useEffect } from 'react';

const GameList = ({ storeID }) => {
  //Récupére et affiche les jeux les plus intéressants pour chaque boutique
  const [games, setGames] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://www.cheapshark.com/api/1.0/deals?storeID=${storeID}&sortBy=dealRating&pageSize=6`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setGames(result);
        console.log(result);
      })
      .catch((error) => console.error(error));
  }, [storeID]);

  return (
    <ul className={`gameList gameStore${storeID}`}>
      {games.map((game) => (
        <li className="gameInStore" key={`${storeID}.${game.title}`}>
          <h4 className="titleGame">{game.title}</h4>
          <div className="normalPrice price">{game.normalPrice}$</div>
          <div className="salePrice price">{game.salePrice} $</div>
        </li>
      ))}
    </ul>
  );
};

function StoreList() {
  // Affiche la liste des boutique toujours active
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch('https://www.cheapshark.com/api/1.0/stores', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setStores(result);
        console.log(result);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container-stores">
      <ul className="stores">
        {stores.map((store) => {
          if (store.isActive)
            return (
              <li className="store" key={store.storeID}>
                <div className="storeBanner-container">
                  <img
                    className="storeBanner"
                    src={`https://www.cheapshark.com${store.images.banner}`}
                  ></img>
                </div>
                <GameList storeID={store.storeID}></GameList>
              </li>
            );
        })}
      </ul>
    </div>
  );
}

export default StoreList;