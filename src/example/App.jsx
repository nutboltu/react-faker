import React, { useState } from 'react';
import ReactFaker from '../components/index';
import mockData from './mock.json';
import axios from 'axios';

const App = () => {
  const [list, setList] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos/1',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }
      );
      const item = await response.json();
      setList(prevList => [...prevList, item]);
    } catch (err) {
      console.log(err);
    }
  };

  const getXhrData = async () => {
    try {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1'
      );
      setList(prevList => [...prevList, data]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <span>Hello App</span>
      <button onClick={getData}>Get Fetch Data</button>
      <button onClick={getXhrData}>Get Xhr Data</button>

      <div>
        <ul>
          <li>Title</li>
          <li>Completed </li>
        </ul>
        {list.map((item, index) => (
          <ul key={index}>
            <li>{item.title}</li>
            <li>{item.completed == true ? 'Y' : 'N'} </li>
          </ul>
        ))}
      </div>
      <ReactFaker initialFakeApis={mockData} />
    </>
  );
};
export default App;
