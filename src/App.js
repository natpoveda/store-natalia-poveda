import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import User from './components/User';
import HeaderProvider from './contexts/contextProviderHeader';
import ProductsProvider from './contexts/contextProviderProducts';

function App() {
  return (
    <HeaderProvider>
      <ProductsProvider>
        <div className="App">
        <Header/>
        <Main/>
        </div>
      </ProductsProvider>     
    </HeaderProvider>
    
  );
}

export default App;
