import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import User from './components/User';
import HeaderProvider from './contexts/contextProviderHeader';

function App() {
  return (
    <HeaderProvider>
      <div className="App">
      <Header/>
      <Main/>
      </div>
    </HeaderProvider>
    
  );
}

export default App;
