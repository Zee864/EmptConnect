import Sidebar from "./components/SideBar";
import { Route } from "react-router-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Employees from "./components/Employees";
import "./styles/global.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <>
          <Sidebar />
          <Route exact path="/" component={Employees}></Route>
        </>
      </Switch>
    </Router>
  );
};

export default App;
