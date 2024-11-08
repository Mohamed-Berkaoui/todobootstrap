import axios from "axios";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";



function AddTodoForm({setTest}) {
    function handleSubmit(e) {
        e.preventDefault();
        const todo = {
          task: e.target.task.value,
          important: e.target.important.value,
          description: e.target.description.value,
          status: false,
        };
        axios
          .post("http://localhost:3000/todos", todo)
          .then((res) => {toast.success('todo added')
            setTest((state)=>!state)
          })
          .catch(e=>toast.error('somthing went wrong'))
      }
  return (
    <Form
      style={{
        width: "70%",
        boxShadow: "1px 1px 3px 2px #00000030",
        padding: "20px",
      }}
      onSubmit={handleSubmit}
    >
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          task
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="task" name={"task"} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          importance level
        </Form.Label>
        <Col sm="10">
          <Form.Select aria-label="Default select example" name="important">
            <option hidden selected>
              Open this select menu
            </option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          description
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="description"
            name={"description"}
          />
        </Col>
      </Form.Group>
      <Button type="submit">submit todo</Button>
    </Form>
  );
}

export default AddTodoForm;
