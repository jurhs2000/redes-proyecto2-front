import React from 'react';
import Home from './screens/Home';
import Game from './screens/Game';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import EndMatch from './screens/EndMatch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/game' element={<Game/>} />
        <Route path='/end-game' element={<EndMatch winner={undefined} username={undefined}/>} />
      </Routes>
    </Router>
  );
}

export default App;
