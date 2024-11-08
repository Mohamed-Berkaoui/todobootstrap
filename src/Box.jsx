import axios from "axios";
import React, { useContext } from "react";
import { Accordion, Button } from "react-bootstrap";
import { todosStore } from "./App";
import { toast } from "react-toastify";

function Box({ todo, index }) {
  const store = useContext(todosStore);
  function handleUpdate() {
    toast.promise(
      axios
        .put("http://localhost:3000/todos/" + todo.id, {
          ...todo,
          status: !todo.status,
        })
        .then((res) =>
          store.dispatchTodos({ type: "UPDATETODO", payload: res.data })
        ),
      { pending: "loading", success: "updated", error: "error" }
    );
  }
  function handleDelete() {
    toast.promise(
      axios
        .delete("http://localhost:3000/todos/" + todo.id)
        .then((res) =>
          store.dispatchTodos({ type: "DELETETODO", payload: res.data })
        ),
      { pending: "loading", success: "deleted", error: "error" }
    );
  }
  return (
    <Accordion.Item eventKey={index + 1}>
      <Accordion.Header>
        <h4
          style={{
            backgroundColor:
              todo.important == 1
                ? "white"
                : todo.important == 2
                ? "pink"
                : "red",
          }}
        >
          {" "}
          {todo.task}
        </h4>
        <span
          style={{
            marginLeft: "150px",
            backgroundColor: todo.status ? "green" : "red",
            padding: "10px",
            color: "white",
          }}
        >
          {todo.status ? "done" : "pending"}
        </span>
      </Accordion.Header>
      <Accordion.Body>
        {todo.description}
        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button onClick={handleUpdate}>update status</Button>
          <Button variant="danger" onClick={handleDelete}>
            delete
          </Button>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default Box;
