import { useState} from 'react';
import axios from 'axios';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import Upload from './page/uploadpage';
import Downloadpage from './page/downloadpage';

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/upload' element={<Upload/>}></Route>
      <Route path='/download/:id' element={<Downloadpage/>}></Route>
      <Route path='/download' element={<Downloadpage/>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
