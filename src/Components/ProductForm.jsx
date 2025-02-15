
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../Redux/Actions/ProductAction";
import { Container, Form, Button, Card } from "react-bootstrap";
import Navbar from "./Navbar";

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: "", price: "", description: "" });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(product));
    setProduct({ name: "", price: "", description: "" });
    alert("Product added successfully!");
    setTimeout(() => navigate("/products"), 500);
  };

  return (
    <div>
      <Navbar />
      <Container className="mt-4">
        <Card className="shadow p-4">
          <Card.Title className="text-center">Add Product</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={product.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={product.price} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={product.description} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Add Product</Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default ProductForm;
