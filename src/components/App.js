import '../assets/css/App.css';
import React, { Component, memo, useCallback, useMemo, useContext, useEffect, useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';

import { store } from '../store';

const Rows = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Row = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: left;
  padding: 1.2em;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  position: relative;
  margin-bottom: 0.1em;
`

const Text = styled.span`
  font-size: 1.2em;
  font-family: verdana;
`

const Add = styled.button`
  font-size: 3em;
  justify-content: center;
`

const Delete = styled.button`
  font-size: 1em;
  position: absolute;
  top: 0;
  right: 0;
  outline: none;
  border: 0;
`

const Title = styled.div`
  height: 35px;
  -webkit-app-region: drag;
  width: 100%;
`

function App(props) {

  const { state: { todos }, dispatch } = useContext(store); 

  function addTodo () {
    dispatch({
      action: 'add',
      data: ' ',
    })
  }

  usePersist({ todos })

  return (
    <Rows>
      <Title/>
      <Add
        onClick={addTodo}
      >
        +
      </Add>
      <List
        data={todos}
      />
    </Rows>
  );

}

function List({ data }) {

  const items = data.map((todo, index)=>(
      <Item
        key={`todo-${index}`}
        text={todo}
        index={index}
      />
  ));

  return (
    <Rows>
      { items }
    </Rows>
  )
}

function Item({ text, index }) {

  const { dispatch } = useContext(store); 

  const inputRef = useRef(null);

  function remove () {
    if (window.confirm("are you sure?")) {
      dispatch({
        action: 'remove',
        data: { index }
      })
    }
  }

  function saveEdit ({ target: { innerText } }) {
    dispatch({
      action: 'edit',
      data: {
        index,
        todo: innerText
      }
    })
  }

  function focus() {
    inputRef.current.focus();
  }

  useLayoutEffect(()=>{
    focus()
  },[])

  return (
    <Row
      onClick={focus}
    >
      <Text
        ref={r=>inputRef.current=r}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={saveEdit}
      >
       { text } 
      </Text>
      <Delete
        onClick={remove}
      >
        ✖
      </Delete>
    </Row>
  )
}

function usePersist (state) {
  return useEffect(()=>{
    localStorage.setItem('state', JSON.stringify(state));
  },[state])
}

export default App;
