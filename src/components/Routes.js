import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import Home from "./Home";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  return (
    <Router>
      <AdminNavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/questions" component={QuestionList} />
        <Route path="/add" component={QuestionForm} />
      </Switch>
    </Router>
  );
}

export default App;
