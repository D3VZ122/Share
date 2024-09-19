import { useState} from 'react';
import axios from 'axios';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import Upload from './page/uploadpage';
import Downloadpage from './page/downloadpage';
import Header from './component/Header';
import Home from './component/Home';
import Footer from './component/footer';

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
