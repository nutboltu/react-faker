import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
// import { makeFakeApi, clearApis } from '../utils/fakeApis';
// import { mapInitialFakeApis } from '../utils/mapInitialApis';
import { TextField, RangeField, Select, Button } from './Inputs';
import List from './List';
import Faker from '../utils/Faker';
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
  background: 'white',
};

const toggleButtonStyle = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  padding: '5px',
  margin: 0,
  fontSize: '10px',
};

const btnGroupStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
};
const faker = new Faker();

const ReactFaker = ({ initialFakeApis }) => {
  const urlRef = useRef();
  const responseRef = useRef();
  const methodRef = useRef();
  const statusRef = useRef();
  const [apiList, setApiList] = useState([]);
  const [showFaker, setShowFaker] = useState(true);

  useEffect(() => {
    faker.makeInitialApis(initialFakeApis);
    setApiList(faker.getApis());
  }, [initialFakeApis]);

  const onAdd = () => {
    if (!urlRef.current.value && !responseRef.current.value) {
      return;
    }
    const newApi = {
      url: urlRef.current.value,
      response: responseRef.current.value,
      method: methodRef.current.options[methodRef.current.selectedIndex].value,
      status: statusRef.current.options[statusRef.current.selectedIndex].value,
      skip: false,
    };
    faker.add(newApi);
    setApiList(faker.getApis());
    urlRef.current.value = '';
    responseRef.current.value = '';
  };

  const onClear = () => {
    faker.restore();
    setApiList(faker.getApis());
  };

  const onSkip = (url, method) => {
    faker.setSkip(url, method);
    setApiList(faker.getApis());
  };

  const renderToggleButton = () => {
    const buttonText = showFaker ? 'Hide' : 'Show';
    return (
      <Button
        style={toggleButtonStyle}
        onClick={() => setShowFaker(prevShowFaker => !prevShowFaker)}
        text={buttonText}
      />
    );
  };

  return (
    <Draggable cancel="input" enableUserSelectHack={false}>
      <div style={containerStyle}>
        {renderToggleButton()}
        {showFaker ? (
          <div>
            <div>
              <TextField label="URL" innerRef={urlRef} />
              <TextField label="Response" innerRef={responseRef} multiline />
              <Select
                label="Method"
                innerRef={methodRef}
                options={['GET', 'POST']}
              />
              <Select
                label="Status"
                innerRef={statusRef}
                options={['200', '404']}
              />
              <div style={btnGroupStyle}>
                <Button onClick={onAdd} text="Add" />
                <Button btnStyle="danger" onClick={onClear} text="Clear" />
              </div>
              <RangeField label="Latency" />
            </div>
            <List items={apiList} onSkip={onSkip} />
          </div>
        ) : null}
      </div>
    </Draggable>
  );
};

ReactFaker.propTypes = {
  initialFakeApis: PropTypes.array,
};

export default ReactFaker;
