import React from 'react';
import MainPage from './pages/MainPage/MainPage';
import ListPage from './pages/ListPage/ListPage';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './reset.css';
import './common.css';

class App extends React.Component {
  render() {
    return (
      
        <Router>
          <Route path="/" exact component={MainPage} />
          <Route path="/list/:id" exact component={ListPage} />
        </Router>
      
    );
  }
}

export default App;
