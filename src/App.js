import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './routes';
import './styles/vehicleMenuPanel.css';
import './styles/generalStyles.css';
import './styles/truckOptions.css';
import './styles/forklift-styles.css';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} exact path={route.path} element={route.component}
            />
          ))}
        </Routes>

      </Router>
    </div>
  );
}

export default App;
