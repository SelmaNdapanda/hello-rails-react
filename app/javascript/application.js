import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createAsyncThunk, createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Greeting from './greeting';

// Fetch a random message from the API endpoint
async function getRandomMessageAPI () {
  return fetch('http://127.0.0.1:3000/random.json')
          .then(response => response.json())
          .then(messageData => messageData);
}

// Create a thunk function based on the API response
export const getRandomMessageThunk = createAsyncThunk(
  'Messages/random',
  getRandomMessageAPI
);

// Create the reducer/actions 
const handleMessages = createSlice({
  name: 'reduce',
  initialState: {value: null},
  extraReducers: (builder) => {
    builder.addCase(getRandomMessageThunk.fulfilled, (state, action) => {
      state.value = action.payload.text;
    })
  }
})

const store = configureStore({
  reducer: handleMessages.reducer,
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Greeting />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);
