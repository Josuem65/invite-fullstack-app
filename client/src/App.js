import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import { Going } from './features/counter/Going';
import { NotGoing } from './features/counter/NotGoing';
import './features/counter/Counter.css';
import './features/counter/going_notGoing.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Counter />}/>
          <Route path="/going" element={<Going />}/>
          <Route path="/notgoing" element={<NotGoing />}/>
        </Routes>
      </Router>    </div>
  );
}

export default App;

