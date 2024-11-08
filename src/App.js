import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import { Accordion, Button } from "react-bootstrap";
import Box from "./Box";
import axios from "axios";
import AddTodoForm from "./AddTodoForm";
import { ToastContainer } from "react-toastify";

function reducerFunction(state, action) {
  if (action.type == "GETTODOS") {
    return action.payload;
  }
  if (action.type == "UPDATETODO") {
    return state.map(todo=>todo.id==action.payload.id?action.payload:todo);
  }
  if(action.type=="DELETETODO"){
    return state.filter(todo=>todo.id!==action.payload.id)
  }

}
export const todosStore = createContext();

function App() {
  const [test,setTest]=useState(false)
  useEffect(function () {
    axios
      .get("http://localhost:3000/todos")
      .then((res) => dispatchTodos({ type: "GETTODOS", payload: res.data }));
  }, [test]);

  const [todos, dispatchTodos] = useReducer(reducerFunction, []);
  const [openForm,setOpenForm]=useState(false)
 
  return (
    <todosStore.Provider value={{todos,dispatchTodos}}>
      <ToastContainer/>
            <div className="App">
        <h1> TODOS LIST</h1>
        <Accordion>
          {todos.map((todo, i) => (
            <Box todo={todo} index={i} key={todo.id} />
          ))}
        </Accordion>
      </div>
      <div style={{margin:"30px 0",display:"flex",flexDirection:"column" ,gap:"30px",alignItems:"center"}}>
        <Button variant="success" onClick={()=>setOpenForm(!openForm)}>add todo</Button>
        {openForm?<AddTodoForm setTest={setTest}/>:null}
      </div>
    </todosStore.Provider>
  );
}

export default App;
