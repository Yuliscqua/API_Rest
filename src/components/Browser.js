import React, { useState, useEffect } from 'react';

function BrowserList() {
  const [browserList, setBrowserList] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch('https://www.cheapshark.com/api/1.0/deals', requestOptions)
      .then((response) => response.json())
      .then((result) => setBrowserList(result))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ul className="list browserList">
      {browserList.map((browserGame) => (
        <li className="browserGame">
          <span
            className="browserGame-img"
            style={{ backgroundImage: `url(${browserGame.thumb})` }}
          />
          <h4 className="browserGame-title">{browserGame.title}</h4>
          <div className="browserGame-savings">Savings : {Math.floor(browserGame.savings)}%</div>
          <div className="browserGame-prices price">
            <div className="browserGame-usualPrice price">{browserGame.normalPrice}$</div>
            <div className="browerGame-salePrice">{browserGame.salePrice}$</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BrowserList;