/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import './App.css';
import ipfsClient from 'ipfs-http-client';

function App() {
  const [hash, setHash] = useState('');
  const [inputHash, setInputHash] = useState('')
  const [isSubmitted, setSubmit] = useState(false)
  const ipfs = ipfsClient('http://localhost:5001')


  const captureFile = (e) => {
    e.stopPropagation();
    e.preventDefault();
    saveToIpfs(e.target.files);
  };

  const saveToIpfs = async ([file]) => {
    const fileDetails = {
      path: file.name,
      content: file
    }

    const options = {
      wrapWithDirectory:true
    }
    try {
      const added = await ipfs.add(fileDetails, options);
      console.log(added);
      setHash(added.cid.toString());
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = (e) => {
    setInputHash(e.target.value)
  }

  const handleInputSub = (e) => {
    e.preventDefault();
    setSubmit(true)
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <div className='App'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          id='inputFile'
          name='inputFile'
          type='file'
          onChange={(e) => captureFile(e)}
        />
        <label htmlFor='file-upload'></label>
      </form>
  <p>File hash = {hash}</p>
    <hr />
    <h3>Wanna retrive file?</h3>
    <form onSubmit={e => handleInputSub(e)}>
    <input name='inputHash' id='inputHash' onChange={e => handleInput(e)} />
    <button>Submit</button>
    </form>
    {isSubmitted ? <a id="gateway-link" target='_blank'
              href={'https://ipfs.io/ipfs/' + inputHash}>
              Click Here
            </a>:'' }
    </div>
  );
}

export default App;
