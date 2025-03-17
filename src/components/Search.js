import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';

const GameDetail = ({ gameId }) => {
  const [storeDeal, setStoreDeal] = useState([]);
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
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (gameId) {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      fetch(
        `https://www.cheapshark.com/api/1.0/games?id=${gameId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setStoreDeal(result);
        })
        .catch((error) => console.error(error));
    }
  }, [gameId]);

  return (
    <div className="details">
      <ul className="details-sites">
        {storeDeal.deals &&
          storeDeal.deals.map((deal) => (
            <li className="details-sites-line">
              {stores.map((store) => {
                if (deal.storeID && store.storeID) {
                  if (deal.storeID === store.storeID) {
                    return (
                      <div className="details-sites-infos">
                        <img
                          className="details-sites-img"
                          src={`https://www.cheapshark.com${store.images.logo}`}
                        />
                        <div className="details-sites-name">
                          {store.storeName}
                        </div>
                      </div>
                    );
                  }
                }
                return null;
              })}
              <div className="details-sites-line-price">{deal.price}$</div>
            </li>
          ))}
      </ul>
      {storeDeal.cheapestPriceEver && (
        <div className="details-cheapest">Cheapest Ever : ${storeDeal.cheapestPriceEver.price}</div>
      )}
    </div>
  );
};

const GameSearched = ({ searchedGames }) => {
  return (
    <ul className="games">
      {searchedGames.map((game) => (
        <li className="game-list" key={game.gameID}>
          <div className="game-basic">
            <img
              className="game-banner"
              src={game.thumb}
            />
            <h3 className="game-title">{game.external}</h3>
          </div>
          <GameDetail gameId={game.gameID}></GameDetail>
        </li>
      ))}
    </ul>
  );
};

const Search = () => {
  const [gameSearching, setGameSearching] = useState('');
  const [searchedGames, setSearchedGames] = useState([]);

  const handleChange = debounce((event) => {
    setGameSearching(event.target.value);
  }, 500);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          redirect: 'follow',
        };
        const response = await fetch(
          `https://www.cheapshark.com/api/1.0/games?title=${gameSearching}&limit=60`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const result = await response.json();
        setSearchedGames(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGames();
  }, [gameSearching]);

  return (
    <div>
      <div className="searchBar">
        <input className="typeArea" type="text" onChange={handleChange}></input>
      </div>
      <GameSearched searchedGames={searchedGames}></GameSearched>
    </div>
  );
};

export default Search;