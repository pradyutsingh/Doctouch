import './App.css';
import ResponsiveAppBar from './components/AppBar';
import Login from './screens/Login';
import * as React from 'react';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HeartForm from './screens/HeartForm';
import DiabetesForm from './screens/DiabetesForm';
import SafePage from './screens/SafePage';
import UnsafePage from './screens/UnsafePage';
import LandingPage from './screens/LandingPage';
import HeartTable from './screens/HeartTable';
import DiabetesTable from './screens/DiabetesTable'


function App() {
  return (

    <Router>
      <ResponsiveAppBar/>
      <main className="py-3">
          <Route path='/' component={LandingPage} exact />
          <Route path='/dashboard' component={Dashboard} exact />
          <Route path='/heart/patients' component={HeartTable} exact/>
          <Route path='/diabetes/patients' component={DiabetesTable} exact/>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/heart' component={HeartForm} exact/>
          <Route path='/diabetes' component={DiabetesForm} exact />
          <Route path='/safe' component={SafePage} />
          <Route path='/unsafe' component={UnsafePage} />

      </main>
    </Router>

  );
}

export default App;
