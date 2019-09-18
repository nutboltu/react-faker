import React from 'react';
import ReactFaker from '../components/index';

class App extends React.PureComponent {
    state = {
        list: [],
    };

    getData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'GET'
            });
            const item = await response.json();
            this.setState(prevState => {
                const newList = [... prevState.list, item];
                return { list: newList }; 
            });
        } catch(err) {
            console.log(error); 
        }
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
