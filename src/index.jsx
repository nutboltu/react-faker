import React from 'react';
import Draggable from 'react-draggable';
import fetchMock from 'fetch-mock';

const makeFakeApi = (apiList) => {
    apiList.forEach((api) => {
        fetchMock.restore();
        fetchMock.get(api.url, () => api.response);
        console.log(api);
    });
}
class ReactFaker extends React.PureComponent {
    state = {
        apiList: [],
    };
    
    onAdd = () => {        
        this.setState(prevState => {
            const apiInput  = document.getElementById('faker-add-id');
            const apiResponseId  = document.getElementById('faker-add-reponse-id');
            console.log(apiInput.value);
            const newApi = {
                url: apiInput.value,
                response: apiResponseId.value,
            };

            const newList = [ ...prevState.apiList, newApi];
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
              bottom: 20,
              right: 20,
              position: 'absolute',
              width: '250px',
              padding: '10px',
              borderRadius: '5px',
              boxShadow: '4px 4px 25px 0px rgba(145,142,145,1)'
            }}
          >
            <div>
                <label> Fake API</label>
                <input type="text" id="faker-add-id" />
                <input type="text" id="faker-add-reponse-id" />
                <button onClick={this.onAdd}> Add </button>
                <button onClick={this.onClear}> Clear </button>
            </div>
            <div>
                {
                    this.state.apiList.map((api, index) => (
                        <ul key={index}>
                            {api.url}
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
