import React, { useState, useEffect } from 'react';
import './style.css';
import TabNav from './components/TabNav';
import Tab from './components/Tab';
import StoreList from './components/Home';
import BrowserList from './components/Browser';
import Search from './components/Search';

//Pour afficher les images : https://www.cheapshark.com{path-to-image}

function App() {
  const [selected, setSelected] = React.useState('Home');

  const handleTabSelect = (tab) => {
    setSelected(tab);
  };

  return (
    <div className="app">
      <header className="header">
        <h2>CashDeals - Achetez moins chers !</h2>
      </header>
      <TabNav
        className="onglets-container"
        tabs={['Home', 'Browser', 'Search']}
        selected={selected}
        setSelected={handleTabSelect}
      >
        <Tab className="onglets" isSelected={selected === 'Home'}>
          <StoreList></StoreList>
        </Tab>
        <Tab className="onglets" isSelected={selected === 'Browser'}>
          <h2 className="dealTitle">Deal List</h2>
          <BrowserList></BrowserList>
        </Tab>
        <Tab className="onglets" isSelected={selected === 'Search'}>
          <Search></Search>
        </Tab>
      </TabNav>
    </div>
  );
}

export default App;
