import "./App.css";
import React, { useEffect, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserSignUp from "./components/Users/UserSignUp";
import UserLogin from "./components/Users/UserLogin";
import CreateAdd from "./components/CreateAdds/CreateAdd";
import FindMyData from "./components/findUserData/FindMyData";
  
const font = "'Roboto', sans-serif;";
const theme = createMuiTheme({
  typography: {
    fontFamily: font,
    button: {
      textTransform: "capitalize",
    },
  },
});
function App() {
  // const user = localStorage.getItem("user")
  // useEffect(()=>{},[user])
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
        <Route exact path="/login">
          <UserLogin/>
        </Route>
        <Route exact path="/signup">
          <UserSignUp/>
        </Route>
        <Route exact path="/createAdd">
          <CreateAdd/>
        </Route>
        <Route exact path="/findMyDataTESToNLY">
          <FindMyData/>
        </Route>
    
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
