import React from "react";
import {ProjectList} from "./ProjectList";
import '../styles/App.css';

function App() {
  return (<ProjectList Projects = {[
      {
          id: 1,
          name: 'ahmini',
          nbCompleted: 2,
          nbTotal: 100,
          dueDate: new Date(2022, 6, 25),
          members: [
              {id: 0, name: 'wadhah', imageSource: './img/wadhah.png'}
          ]},
      {
          id: 2,
          name: 'jei-formation',
          nbCompleted: 20,
          nbTotal: 20,
          dueDate: new Date(2021, 10, 30),
          members: [
              {id: 1, name: 'sofiene chihi', imageSource: './img/sofienechihi.png'},
              {id: 2, name: 'elli yji', imageSource: './img/elliyji.png'}
          ]},
      {
          id: 3,
          name: 'ollert',
          nbCompleted: 0,
          nbTotal: 20,
          dueDate: new Date(2022, 0, 1),
          members: [
              {id: 3, name: 'omar besbes', imageSource: './img/omarbesbes.png'},
              {id: 4, name: 'feriel bouhamed', imageSource: './img/ferielbouhamed.png'},
              {id: 5, name: 'chaima bouhlel', imageSource: './img/chaimabouhlel.png'},
              {id: 6, name: 'semah chaouech', imageSource: './img/semahchaouech.png'}
          ]},
      {
          id: 4,
          name: 'mahrouda',
          nbCompleted: 6,
          nbTotal: 10,
          dueDate: new Date(2021, 10, 10),
          members: [
              {id: 7, name: 'mahroud', imageSource: './img/mahroud.png'}
          ]}
  ]}/>);
}

export default App;
