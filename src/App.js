import React, { useState, useEffect } from 'react';
import './style.css';

//Pour afficher les images : https://www.cheapshark.com{path-to-image}

function App() {
  const [website, setWebsite] = useState([]);
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch('https://www.cheapshark.com/api/1.0/stores', requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const res = result;
    })
    .catch((error) => console.error(error));
  return (
    <header>
      <h1>Cheap Deals</h1>
      <div>Hello</div>
    </header>
  );
}

export default App;
