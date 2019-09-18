import React from 'react';
import Draggable from 'react-draggable';
import { makeFakeApi, clearApis } from '../utils/fakeApis';
import { mapInitialFakeApis } from '../utils/mapInitialApis';
import { TextField, RangeField, Select } from './Inputs';
import ApiItem from './ApiItem';

// TODOS:
// 1. Support XMLHttpRequest. Currently only support fetch
// 2. Checkbox for skip faking

const containerStyle = {
  top: 20,
  right: 20,
  position: 'absolute',
  minWidth: '250px',
  minHeight: '10px',
  padding: '10px',
  borderRadius: '5px',
  boxShadow: '4px 4px 25px 0px rgba(145,142,145,1)'
}

const toggleButtonStyle = {
  position: 'absolute',
  top: '5px',
  right: '5px',
}
class ReactFaker extends React.PureComponent {
    constructor(props) {
      super(props);
      this.urlRef = React.createRef();
      this.responseRef = React.createRef();
      this.methodRef = React.createRef();
      this.statusRef = React.createRef();
      const { initialFakeApis } = this.props;
      this.state = {
        apiList: mapInitialFakeApis(initialFakeApis),
        showFaker: true,
      }
    }

    componentDidMount() {
       if(Object.keys(this.state.apiList).length) {
         makeFakeApi(this.state.apiList);
       }
    }
    onAdd = () => {   
      if (!this.urlRef.current.value&& !this.responseRef.current.value) {
        return;
      }     
        this.setState(prevState => {

            const newApi = {
                url: this.urlRef.current.value,
                response: this.responseRef.current.value,
                method: this.methodRef.current.options[this.methodRef.current.selectedIndex].value,
                status: this.statusRef.current.options[this.statusRef.current.selectedIndex].value,
            };

            const newList = { ...prevState.apiList, [newApi.url]: newApi};

            makeFakeApi(newList);
            this.urlRef.current.value = '';
            this.responseRef.current.value = '';
            return { apiList: newList };
        });
    }
  
    onClear = () => {
      clearApis();
        this.setState({ apiList: [] });
    }

    renderToggleButton = () => {
      const buttonText  = this.state.showFaker ? 'Hide Faker' : 'Show Faker';
      return (
          <button
            style={toggleButtonStyle}
            onClick={() => this.setState(prevState => ({ showFaker: !prevState.showFaker}))}
          >
            {buttonText}
          </button>
      );
    }
    render() {
      return (
        <Draggable cancel="input" enableUserSelectHack={false}>
             <div style={containerStyle}>
              {this.renderToggleButton()}
              {
                  this.state.showFaker ?
                  <div>
                    <div>
                      <TextField  label="URL"  innerRef={this.urlRef} />
                      <TextField  label="Response"  innerRef={this.responseRef} multiline />
                      <Select label="Method" innerRef={this.methodRef} options={['GET', 'POST']}/>
                      <Select label="Status" innerRef={this.statusRef} options={['200', '404']}/>
      
                      <button onClick={this.onAdd}> Add </button>
                      <button onClick={this.onClear}> Clear </button>
                      <RangeField  label="Latency"  />
                  </div>
                  <div>
                      {
                          Object.keys(this.state.apiList).map((key, index) => (
                          <ApiItem  {...this.state.apiList[key]} key={index}/>))
                      }
                  </div>

                  </div>
                  : null
              }
             </div> 
        </Draggable>
      );
    }
  }

  export default ReactFaker;
