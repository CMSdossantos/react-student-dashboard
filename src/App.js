import './App.css';
import React from 'react';
import { VictoryBar, VictoryChart } from "victory";


function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <VictoryChart>
        <VictoryBar/>

      </VictoryChart>
    </div>
    
  );
}

export default App;
