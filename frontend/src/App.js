import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import React from 'react';
function App() {
  /*const [user, setUser] = React.useState({});
  React.useEffect(async () => {
    setUser(await getUser());
  }, []);*/


  /*React.useEffect(() => {
     axios.post('/api/users/login', {
       email: "ferielbouhamed@gmail.com",
       password: "ollert"
     }).then((response) => {
       console.log(response.data);
     }).catch(err => {
       console.log(err);
     })
   })*/

  return (
    <Router>
      <Footer /> 
      <Routes>
        <Route path="/"element={<h1>Hello world</h1>}/>
      </Routes>
    </Router>
  );
}

export default App;
