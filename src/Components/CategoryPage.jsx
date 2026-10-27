import { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import ShopNavbar from './ShopNavbar';

export default function CategoryPage({ category, user, handleLogout }) {
  
  
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  // ✅ WORKING IMAGE URLS FOR ALL CATEGORIES
  const defaultProducts = [
    // MEN'S PRODUCTS
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
      id: 7, 
      name: 'NMD_R1', 
      price: '$150', 
      category: 'Men', 
      type: 'Originals', 
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop' 
    },
    { 
      id: 8, 
      name: 'Adizero Boston 11', 
      price: '$140', 
      category: 'Men', 
      type: 'Running', 
      image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop' 
    },
    
    // WOMEN'S PRODUCTS
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
    { 
      id: 9, 
      name: 'Ultraboost 23', 
      price: '$190', 
      category: 'Women', 
      type: 'Running', 
      image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=500&h=500&fit=crop' 
    },
    { 
      id: 10, 
      name: 'Gazelle', 
      price: '$90', 
      category: 'Women', 
      type: 'Originals', 
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=500&fit=crop' 
    },
    
    // KIDS' PRODUCTS
    { 
      id: 5, 
      name: 'Kids Superstar', 
      price: '$60', 
      category: 'Kids', 
      type: 'Originals', 
      image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&h=500&fit=crop' 
    },
    { 
      id: 6, 
      name: 'Kids Ultraboost', 
      price: '$90', 
      category: 'Kids', 
      type: 'Running', 
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop' 
    },
    { 
      id: 11, 
      name: 'Kids Forum Low', 
      price: '$70', 
      category: 'Kids', 
      type: 'Originals', 
      image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=500&h=500&fit=crop' 
    },
    { 
      id: 12, 
      name: 'Kids Tiro Pants', 
      price: '$35', 
      category: 'Kids', 
      type: 'Training', 
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=500&fit=crop' 
    },
  ];

  const adminProducts = JSON.parse(localStorage.getItem('products') || '[]');
  const allProducts = [...defaultProducts, ...adminProducts];
  const products = allProducts.filter(p => p.category === category);

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

      <Container className="py-5">
        <h2 className="mb-4 fw-bold text-center">{category} Collection</h2>
        
        <Row xs={1} md={2} lg={4} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '220px', overflow: 'hidden' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'; }} />
                </div>
                <Card.Body className="d-flex flex-column">
                  <small className="text-muted text-uppercase">{product.type}</small>
                  <Card.Title className="fw-bold mt-1">{product.name}</Card.Title>
                  <Card.Text className="fs-5 fw-bold text-dark mt-auto mb-3">{product.price}</Card.Text>
                  <Button variant="dark" className="w-100 rounded-0 py-2" onClick={() => handleAddToBagClick(product)}>ADD TO BAG</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

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