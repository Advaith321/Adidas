import { useState } from 'react';
import { Container, Button, Row, Col, Card, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ShopNavbar from './ShopNavbar';

export default function MainPage({ user, handleLogout }) {
  const navigate = useNavigate();
  
  // Modal States
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  // ✅ WORKING IMAGE URLS
  const defaultProducts = [
    { 
      id: 1, 
      name: 'Adidas Superstar', 
      price: '$80', 
      category: 'Men', 
      type: 'Originals', 
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop' 
    },
    { 
      id: 2, 
      name: 'Ultraboost Light', 
      price: '$190', 
      category: 'Men', 
      type: 'Running', 
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=500&fit=crop' 
    },
    { 
      id: 3, 
      name: 'Samba OG', 
      price: '$100', 
      category: 'Women', 
      type: 'Originals', 
      image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&h=500&fit=crop' 
    },
    { 
      id: 4, 
      name: 'Stan Smith', 
      price: '$85', 
      category: 'Women', 
      type: 'Originals', 
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop' 
    },
  ];

  const adminProducts = JSON.parse(localStorage.getItem('products') || '[]');
  const products = [...defaultProducts, ...adminProducts];

  const handleAddToBagClick = (product) => {
    setSelectedProduct(product);
    setSelectedSize('');
    setShowSizeModal(true);
  };

  const confirmAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size!");
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItemId = `${selectedProduct.id}-${selectedSize}`;
    const existingItem = cart.find(p => p.cartItemId === cartItemId);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({ ...selectedProduct, cartItemId, size: selectedSize, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setShowSizeModal(false);
    alert(`✅ ${selectedProduct.name} (Size: ${selectedSize}) added to cart!`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <ShopNavbar user={user} handleLogout={handleLogout} />

      <div className="text-center py-5 border-bottom" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white' }}>
        <Container>
          <h1 className="display-3 fw-bold mb-3" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>Impossible Is Nothing</h1>
          <p className="lead mb-4" style={{ fontSize: '1.2rem' }}>Welcome to the official Adidas store. Find your perfect fit.</p>
          <Button variant="light" size="lg" className="px-5 fw-bold rounded-0" onClick={() => navigate('/men')}>SHOP NOW</Button>
        </Container>
      </div>

      <Container className="py-5">
        <h2 className="mb-4 fw-bold text-center">Featured Products</h2>
        <Row xs={1} md={2} lg={4} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '220px', overflow: 'hidden' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'; }} />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Text className="text-muted small text-uppercase mb-1">{product.type}</Card.Text>
                  <Card.Title className="fw-bold">{product.name}</Card.Title>
                  <Card.Text className="fs-5 fw-bold text-dark mt-auto mb-3">{product.price}</Card.Text>
                  <Button variant="dark" className="w-100 rounded-0" onClick={() => handleAddToBagClick(product)}>ADD TO BAG</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <Container><p className="mb-0 small">© 2026 Adidas America, Inc. All rights reserved.</p></Container>
      </footer>

      <Modal show={showSizeModal} onHide={() => setShowSizeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Size</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div className="text-center">
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />
              <h5 className="fw-bold">{selectedProduct.name}</h5>
              <p className="text-muted">{selectedProduct.price}</p>
              <Form.Group className="mt-3">
                <Form.Label className="fw-bold">Foot Size (US)</Form.Label>
                <Form.Select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                  <option value="">-- Choose a Size --</option>
                  <option value="US 7">US 7</option>
                  <option value="US 8">US 8</option>
                  <option value="US 9">US 9</option>
                  <option value="US 10">US 10</option>
                  <option value="US 11">US 11</option>
                  <option value="US 12">US 12</option>
                </Form.Select>
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSizeModal(false)}>Cancel</Button>
          <Button variant="dark" onClick={confirmAddToCart}>Add to Cart</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}