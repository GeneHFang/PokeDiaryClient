import React from 'react';
import Dragger from './component/ClickDragExample';
import logo from './logo.svg';
import './App.css';

import FormContainer from './container/FormContainer';

function App() {
  return (
    <div className="App">
     
        <FormContainer />
        <Dragger />
      
    </div>
  );
}

export default App;
