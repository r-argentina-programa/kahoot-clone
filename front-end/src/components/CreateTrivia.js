import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';

//componente no terminado, falta hacer POST y demas.

const CreateTrivia = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Title of the trivia</Form.Label>
          <Form.Control
            name="example"
            type="email"
            placeholder="The title you want for your own trivia"
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Question</Form.Label>
          <Form.Control name="example1" ref={register} as="textarea" rows={1} />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Answer 0</Form.Label>
          <Form.Control name="example2" ref={register} as="textarea" rows={1} />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Answer 1</Form.Label>
          <Form.Control name="example3" ref={register} as="textarea" rows={1} />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Answer 2</Form.Label>
          <Form.Control name="example4" ref={register} as="textarea" rows={1} />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Answer 3</Form.Label>
          <Form.Control name="example5" ref={register} as="textarea" rows={1} />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Which answer is the correct?</Form.Label>
          <Form.Control name="example6" ref={register} as="select">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateTrivia;
