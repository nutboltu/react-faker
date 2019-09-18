import React from 'react';
import Draggable from 'react-draggable';
import fetchMock from 'fetch-mock';

// TODOS:
// 1. Text Field, Form UI
// 2. Support XMLHttpRequest. Currently only support fetch
// 3. Supports initial mock json
// 4. Checkbox for skip faking

const makeFakeApi = (apiList) => {
    fetchMock.restore();
    Object.keys(apiList).forEach((key) => {
      const api = apiList[key];
      fetchMock.mock(api.url,
        // () => ({userId: 1,id: 1,title: 'mor',completed: true}),
        () => {  
          if (api.status === '200') {
            return {userId: 1,id: 1,title: 'mor',completed: true};
          } else {
            throw new Error('a') ;
          }
        },
        {
        method: api.method || 'GET',
      });
    });
}
class ReactFaker extends React.PureComponent {
    state = {
        apiList: {},
    };
    
    onAdd = () => {        
        this.setState(prevState => {
            const apiInput  = document.getElementById('faker-add-id');
            const apiResponseId  = document.getElementById('faker-add-response-id');
            const methodId  = document.getElementById('fake-method');
            const statusId  = document.getElementById('fake-status');
            
            const newApi = {
                url: apiInput.value,
                response: apiResponseId.value,
                method: methodId.options[methodId.selectedIndex].value,
                status: statusId.options[statusId.selectedIndex].value,
            };

            const newList = { ...prevState.apiList, [newApi.url]: newApi};
            makeFakeApi(newList);
            apiInput.value = '';
            apiResponseId.value = '';
            return { apiList: newList };
        });
    }
  
    onClear = () => {
        fetchMock.restore();
        this.setState({ apiList: [] });
    }

    render() {
      return (
        <Draggable cancel="input">
          <div
            style={{
              top: 20,
              right: 20,
              position: 'absolute',
              width: '250px',
              padding: '10px',
              borderRadius: '5px',
              boxShadow: '4px 4px 25px 0px rgba(145,142,145,1)'
            }}
          >
            <div>
                <label> URL </label>
                <input type="text" id="faker-add-id" value="https://jsonplaceholder.typicode.com/todos/1" />
                <label> Response </label>
                <input type="text" id="faker-add-response-id" value="{userId: 1,id: 1,title: 'mor',completed: true}" />
                <label>Method</label>
                <select id="fake-method">
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
               </select>
               <label>Status</label>
               <select id="fake-status">
                  <option value="200">200</option>
                  <option value="404">404</option>
               </select>
                <button onClick={this.onAdd}> Add </button>
                <button onClick={this.onClear}> Clear </button>
            </div>
            <div>
                {
                    Object.keys(this.state.apiList).map((key, index) => (
                        <ul key={index}>
                            {this.state.apiList[key].url}
                        </ul>
                    ))
                }
            </div>
          </div>
        </Draggable>
      );
    }
  }

  export default ReactFaker;
