
import './App.css';
import { BrowserRouter,Route,Switch } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Auth  from './components/Auth/Auth';
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/kisiler/:kisiId" component={User}></Route>
          <Route exact path="/auth" component={Auth}></Route>
        </Switch>

      </BrowserRouter>
    </div>
  );
}
export default App;
