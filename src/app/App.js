import {BrowserRouter,Switch,Route} from "react-router-dom";
import Login from "../page/login/Login";
import AdminHome from "../page/userpage/AdminHome";
import TeacherHome from "../page/userpage/TeacherHome";
import Forgot from "../page/login/Forgot";

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path={"/admin"}>
              <AdminHome/>
          </Route>
          <Route path={"/teacher"}>
              <TeacherHome/>
          </Route>
          <Route path={"/forgot"}>
              <Forgot/>
          </Route> 
          <Route path={"/**"}>
             <Login/>
          </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
