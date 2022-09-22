import React from 'react';
import Home from './screens/Home';
import Game from './screens/Game';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/game' element={<Game/>} />
      </Routes>
    </Router>
  );
}

export default App;
