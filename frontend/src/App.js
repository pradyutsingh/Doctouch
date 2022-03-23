import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './components/AppBar';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HeartForm from './screens/HeartForm';
import DiabetesForm from './screens/DiabetesForm';
import SafePage from './screens/SafePage';
import UnsafePage from './screens/UnsafePage';
import LandingPage from './screens/LandingPage';


function App() {
  return (
    <Router>
      <ResponsiveAppBar/>
      <main className="py-3">
          <Route path='/' component={LandingPage} exact />
          <Route path='/dashboard' component={Dashboard} exact />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/heart' component={HeartForm} />
          <Route path='/diabetes' component={DiabetesForm} />
          <Route path='/safe' component={SafePage} />
          <Route path='/unsafe' component={UnsafePage} />
      </main>
    </Router>
  );
}

export default App;
