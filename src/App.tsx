import React, { useState } from 'react';
import Home from './screens/Home';
import Game from './screens/Game';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/user/userSlice';

function App() {
  const user = useAppSelector(selectUser);
  useState(() => {
    console.log(user);
  }, );
  return (
    <div>
      Hola
    </div>
  );
}

export default App;
