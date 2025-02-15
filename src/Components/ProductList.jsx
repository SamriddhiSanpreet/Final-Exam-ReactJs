import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct, updateProduct } from "../Redux/Actions/ProductAction";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import Navbar from "./Navbar";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const [show, setShow] = useState(false);
  const [editProduct, setEditProduct] = useState({ id: "", name: "", price: "", description: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditProduct(product);
    setShow(true);
  };

  const handleChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateProduct(editProduct.id, editProduct));
    setShow(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchQuery))
    .sort((a, b) => {
      if (sortOrder === "asc") return a.name.localeCompare(b.name);
      if (sortOrder === "desc") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div>
      <Navbar onSearch={handleSearch} onSort={handleSort} />
      <Container className="mt-4">
        <h2 className="text-center">Product List</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
                <td>
                  <Button variant="info" className="me-2" onClick={() => handleEdit(product)}>Edit</Button>
                  <Button variant="danger" onClick={() => dispatch(deleteProduct(product.id))}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={editProduct.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={editProduct.price} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={editProduct.description} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductList;