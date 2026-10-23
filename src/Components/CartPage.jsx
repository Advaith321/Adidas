import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import ShopNavbar from './ShopNavbar';

export default function CartPage({ user, handleLogout }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart from Local Storage on mount
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  // ✅ INCREASE QUANTITY (using cartItemId)
  const increaseQuantity = (cartItemId) => {
    const updatedCart = cart.map(item => {
      if (item.cartItemId === cartItemId) {
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // ✅ DECREASE QUANTITY (or remove if it hits 0)
  const decreaseQuantity = (cartItemId) => {
    const updatedCart = cart.map(item => {
      if (item.cartItemId === cartItemId) {
        return { ...item, quantity: Math.max(0, (item.quantity || 1) - 1) };
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove if quantity is 0

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // ✅ REMOVE ITEM COMPLETELY
  const removeItem = (cartItemId) => {
    const updatedCart = cart.filter(item => item.cartItemId !== cartItemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate Total Price
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace('$', ''));
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  // Empty Cart View
  if (cart.length === 0) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <ShopNavbar user={user} handleLogout={handleLogout} />
        <Container className="text-center py-5">
          <h2 className="mb-3">Your Cart is Empty</h2>
          <p className="text-muted">Looks like you haven't added anything yet.</p>
          <Button variant="dark" className="mt-3 px-4" onClick={() => navigate('/')}>Continue Shopping</Button>
        </Container>
      </div>
    );
  }

  // Full Cart View
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <ShopNavbar user={user} handleLogout={handleLogout} />
      <Container className="py-5">
        <h2 className="mb-4 fw-bold">Shopping Cart</h2>
        <Row>
          {/* Left Side: Cart Items */}
          <Col lg={8}>
            <Card className="shadow-sm border-0 mb-3">
              <Card.Body className="p-0">
                {cart.map((item) => {
                  const price = parseInt(item.price.replace('$', ''));
                  const qty = item.quantity || 1;
                  const subtotal = price * qty;

                  return (
                    <div key={item.cartItemId} className="p-3 border-bottom d-flex flex-wrap align-items-center">
                      {/* Product Image */}
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginRight: '20px' }} 
                      />
                      
                      {/* Product Details */}
                      <div className="flex-grow-1 mb-2 mb-md-0">
                        <h5 className="fw-bold mb-1">{item.name}</h5>
                        
                        {/* ✅ DISPLAY SIZE HERE */}
                        <p className="text-muted small mb-2">
                          Size: <strong>{item.size}</strong> | {item.type}
                        </p>
                        
                        <h5 className="text-success fw-bold mb-2">${price}</h5>
                        
                        {/* ✅ AMAZON STYLE QUANTITY CONTROLS */}
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-muted small">Qty:</span>
                          <Button 
                            variant="outline-secondary" 
                            size="sm" 
                            className="px-2 py-0" 
                            onClick={() => decreaseQuantity(item.cartItemId)}
                          >
                            -
                          </Button>
                          <span className="fw-bold px-2">{qty}</span>
                          <Button 
                            variant="outline-secondary" 
                            size="sm" 
                            className="px-2 py-0" 
                            onClick={() => increaseQuantity(item.cartItemId)}
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Subtotal & Delete */}
                      <div className="text-end ms-auto">
                        <h5 className="fw-bold mb-3">${subtotal}</h5>
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          onClick={() => removeItem(item.cartItemId)}
                        >
                          🗑️ Delete
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>

          {/* Right Side: Price Details */}
          <Col lg={4}>
            <Card className="shadow-sm border-0 sticky-top" style={{ top: '90px' }}>
              <Card.Body>
                <h4 className="fw-bold mb-3">Price Details</h4>
                <div className="d-flex justify-content-between mb-2">
                  <span>Price ({cart.reduce((acc, item) => acc + (item.quantity || 1), 0)} items)</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Charges</span>
                  <span className="text-success">FREE</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fs-5 fw-bold mb-4">
                  <span>Total Amount</span>
                  <span>${calculateTotal()}</span>
                </div>
                
                {/* ✅ CHECKOUT BUTTON */}
                <Button 
                  variant="dark" 
                  className="w-100 py-2 fw-bold" 
                  onClick={() => navigate('/payment')}
                >
                  PROCEED TO CHECKOUT
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}