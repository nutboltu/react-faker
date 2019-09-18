import React from 'react';
import ReactFaker from '../index';

class App extends React.PureComponent {
    state = {
        list: [],
    };

    getData = () => {
        fetch('https://jsonplaceholder.typicode.com/todos/1', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
        .then((response) => {
               return response.json();
        })
        .then((item) => {
             this.setState(prevState => {
                 const newList = [... prevState.list, item];
                 return { list: newList }; 
             });
        })
        .catch(error => {
           console.log(error); 
        });
    }

    onClick = () => {
        this.getData();
    }
    render() {
        return (
            <>
                <span>Hello App</span>
                <button onClick={this.onClick}>Get Data</button>
                <div>
                    <ul>
                        <li>Title</li>
                        <li>Completed </li>
                    </ul>
                    {
                        this.state.list.map((item, index) => (
                            <ul key={index}>
                                <li>{item.title}</li>
                                <li>{item.completed == true ? 'Y' : 'N'} </li>
                            </ul>
                        ))
                    }
                </div>
                <ReactFaker />
            </>
        );
    }
}

export default App;
