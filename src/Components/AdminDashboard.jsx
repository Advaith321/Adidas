import { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Table, Badge } from 'react-bootstrap';
import ShopNavbar from './ShopNavbar';

export default function AdminDashboard({ user, handleLogout }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [type, setType] = useState('Originals');
  const [imageBase64, setImageBase64] = useState(''); // Stores the converted image
  
  const [products, setProducts] = useState([]);

  // Load products on mount
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(savedProducts);
  }, []);

  // ✅ Convert uploaded file to Base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); // Save the base64 string to state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name,
      price: `$${price}`,
      category,
      type,
      image: imageBase64 || 'https://via.placeholder.com/300x300?text=No+Image' // Save the base64 string
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    alert(`✅ Success! "${name}" added to the ${category} category.`);
    
    // Reset form
    setName('');
    setPrice('');
    setType('Originals');
    setImageBase64('');
    e.target.reset(); // Clears the file input
  };

  const handleDeleteProduct = (id, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <ShopNavbar user={user} handleLogout={handleLogout} />

      <Container className="py-5">
        <h2 className="text-center mb-4 fw-bold" style={{ color: 'darkred' }}>
          🛠️ Admin Dashboard
        </h2>

        {/* STATS CARD */}
        <Row className="mb-4 justify-content-center">
          <Col md={8} lg={6}>
            <Card className="text-center border-0 shadow-sm p-3">
              <h5 className="text-muted mb-1">Total Products in Store</h5>
              <h2 className="fw-bold text-dark mb-0">{products.length}</h2>
              <small className="text-muted">You can add or delete products below.</small>
            </Card>
          </Col>
        </Row>
        
        <Row className="g-4">
          {/* LEFT SIDE: ADD PRODUCT FORM */}
          <Col lg={5}>
            <Card className="shadow-sm p-4 border-0 h-100">
              <h4 className="fw-bold mb-3">Add New Product</h4>
              <Form onSubmit={handleAddProduct}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Product Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="e.g., Gazelle Indoor" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required 
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Price (numbers only)</Form.Label>
                      <Form.Control 
                        type="number" 
                        placeholder="e.g., 90" 
                        value={price} 
                        onChange={e => setPrice(e.target.value)} 
                        required 
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Product Image</Form.Label>
                      <Form.Control 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                      />
                      {/* Live Preview of selected image */}
                      {imageBase64 && (
                        <div className="mt-2">
                          <img 
                            src={imageBase64} 
                            alt="Preview" 
                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }} 
                          />
                        </div>
      )}
                      <Form.Text className="text-muted d-block mt-1">
                        ⚠️ Keep images small (under 500KB) to avoid Local Storage limits.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-danger">Target Category</Form.Label>
                  <Form.Select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                    style={{ border: '1px solid darkred' }}
                    required
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Product Type</Form.Label>
                  <Form.Select value={type} onChange={e => setType(e.target.value)}>
                    <option value="Originals">Originals</option>
                    <option value="Running">Running</option>
                    <option value="Training">Training</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100 py-2 fw-bold">
                  ADD PRODUCT TO WEBSITE
                </Button>
              </Form>
            </Card>
          </Col>

          {/* RIGHT SIDE: MANAGE EXISTING PRODUCTS */}
          <Col lg={7}>
            <Card className="shadow-sm p-4 border-0 h-100">
              <h4 className="fw-bold mb-3">Manage Existing Products</h4>
              
              {products.length === 0 ? (
                <p className="text-muted text-center py-4">No products added yet. Use the form to add one!</p>
              ) : (
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  <Table hover responsive>
                    <thead className="table-light">
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} 
                            />
                          </td>
                          <td className="align-middle fw-bold">{product.name}</td>
                          <td className="align-middle">
                            <Badge bg="secondary">{product.category}</Badge>
                          </td>
                          <td className="align-middle fw-bold text-success">{product.price}</td>
                          <td className="align-middle text-center">
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id, product.name)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}