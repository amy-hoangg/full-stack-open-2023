import React from 'react'
import ReactDOM from 'react-dom/client'

import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer'

const store = configureStore({
  reducer: reducer
})

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch( {
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch( {
      type: 'ZERO'
    })
  }
  //neu nhu good duoc click thi no se gui ve cho store cai action good
  //nhung ma minh implement cai action good nhu the nao nua thi no lai la mot viec khac 

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}
//o day cai getState no se thuc ra la no present cai day ra thui
//huhu bay gio hieu 

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()

store.subscribe(() => {
  renderApp();
});
