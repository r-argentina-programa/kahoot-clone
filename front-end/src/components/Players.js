import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const Players = () => {
  return (
    <div>
      <ListGroup>
        <ListGroup.Item variant="light">Fabricio</ListGroup.Item>
        <ListGroup.Item variant="dark">Hernan</ListGroup.Item>
        <ListGroup.Item variant="light">Leonel</ListGroup.Item>
        <ListGroup.Item variant="dark">Nicolas</ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Players;
