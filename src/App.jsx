import { useState } from 'react';

import './App.css';

function App() {
  const [refrescarWallet, setRefrescarWallet] = useState(false);

  return (
    <div id='center'>
      <h1 className='title'>Cartera de credenciales con JWT</h1>
    </div>
  );
}

export default App;
