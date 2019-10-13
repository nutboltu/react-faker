import React, { useRef , useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { makeFakeApi, clearApis } from '../utils/fakeApis';
import { mapInitialFakeApis } from '../utils/mapInitialApis';
import { TextField, RangeField, Select, Button } from './Inputs';
import List from './List';

// TODOS:
// 1. Support XMLHttpRequest. Currently only support fetch
// 2. Remove Fetch mock

const containerStyle = {
  top: 20,
  right: 20,
  position: 'absolute',
  minWidth: '250px',
  minHeight: '10px',
  padding: '10px',
  borderRadius: '5px',
  boxShadow: '4px 4px 25px 0px rgba(145,142,145,1)',
  fontFamily: 'sans-serif',
}

const toggleButtonStyle = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  padding: '5px',
  margin: 0,
  fontSize: '10px',
}

const btnGroupStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
}

const ReactFaker = ({ initialFakeApis }) =>  {
  const urlRef = useRef();
  const responseRef = useRef();
  const methodRef = useRef();
  const statusRef = useRef();
  const [apiList, setApiList] = useState(mapInitialFakeApis(initialFakeApis));
  const [showFaker, setShowFaker] = useState(true);

  useEffect(() => {
    if(Object.keys(apiList).length) {
      makeFakeApi(apiList);
    }
  }, [apiList]);

    const onAdd = () => {   
      if (!urlRef.current.value && !responseRef.current.value) {
        return;
      }     
      setApiList(prevApiList => {

            const newApi = {
                url: urlRef.current.value,
                response: responseRef.current.value,
                method: methodRef.current.options[methodRef.current.selectedIndex].value,
                status: statusRef.current.options[statusRef.current.selectedIndex].value,
                skip: false,
            };

            const newList = { ...prevApiList, [newApi.url]: newApi};

            urlRef.current.value = '';
            responseRef.current.value = '';
            return newList;
        });
    }
  
    const onClear = () => {
      clearApis();
      setApiList([]);
    }

    const onSkip = (url) => {
      const updatedApi = {
        ...apiList[url],
        skip: !apiList[url].skip,
      };

      setApiList(prevApiList => {
        const newList =  {
          ...prevApiList,
          [url]: updatedApi,
        };
        return newList;
      })
    }
  
    const renderToggleButton = () => {
      const buttonText  = showFaker ? 'Hide' : 'Show';
      return (
          <Button
            style={toggleButtonStyle}
            onClick={() => setShowFaker(prevShowFaker => !prevShowFaker)}
            text={buttonText}
          />
      );
    }
    
    return (
      <Draggable cancel="input" enableUserSelectHack={false}>
           <div style={containerStyle}>
            {renderToggleButton()}
            {
                showFaker ?
                <div>
                  <div>
                    <TextField  label="URL"  innerRef={urlRef} />
                    <TextField  label="Response"  innerRef={responseRef} multiline />
                    <Select label="Method" innerRef={methodRef} options={['GET', 'POST']}/>
                    <Select label="Status" innerRef={statusRef} options={['200', '404']}/>
                    <div style={btnGroupStyle}>
                      <Button onClick={onAdd} text="Add" />
                      <Button btnStyle="danger" onClick={onClear} text="Clear" />
                    </div>
                    <RangeField  label="Latency"  />
                </div>
                <List items={Object.values(apiList)} onSkip={onSkip} />
                </div>
                : null
            }
           </div> 
      </Draggable>
    );
  }

  export default ReactFaker;
