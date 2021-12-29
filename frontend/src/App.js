import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Header from "./components/Header"; 
import Footer from "./components/Footer";
import Projects from "./pages/Projects";
import TasksList from "./pages/TasksList";

function App() {

return(
    <Router> 
       <div className="ollert-app">
          <Header/>
          <div className="content"> 
              <Routes>
                 <Route exact path ="/" element={<Home/>}> </Route>
                 <Route exact path ="/projects" element={<Projects/>}></Route>
                 <Route exact path ="/taskslist" element={<TasksList />}></Route>
              </Routes>
          </div>
          <Footer/>
        </div>
    </Router>
)   
};

export default App;
