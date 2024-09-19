import { useState} from 'react';
import axios from 'axios';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import Upload from './page/uploadpage';
import Downloadpage from './page/downloadpage';
import Header from './component/Header';
import Home from './component/Home';
import Footer from './component/footer';

const setItemWithExpiry = (key, value, ttl) => {
  const now = new Date();
  const item = {
      value: value,
      expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};


const getItemWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  // If the item doesn't exist, return null
  if (!itemStr) {
      return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();

  // Compare the expiry time
  if (now.getTime() > item.expiry) {
      // If expired, remove the item from storage
      localStorage.removeItem(key);
      return null;
  }
  return item.value;
};


if (!getItemWithExpiry('hasVisited')) {
  alert("The server may take a moment to start up if it's been inactive as it is hosted on render.com free plan. Please wait!");

  setItemWithExpiry('hasVisited', 'true', 24 * 60 * 60 * 1000); 
}

function App() {

  return (
    <>
    
     <BrowserRouter>
     
     <Header></Header>
     <Routes>
      <Route path='/'element={<Home/>}></Route>
      <Route path='/upload' element={<Upload/>}></Route>
      <Route path='/download/:id' element={<Downloadpage/>}></Route>
      <Route path='/download' element={<Downloadpage/>}></Route>
     </Routes>
     <Footer></Footer>
     </BrowserRouter>
    </>
  );
}

export default App;
