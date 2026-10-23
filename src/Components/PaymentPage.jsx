import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import ShopNavbar from './ShopNavbar';

export default function PaymentPage({ user, handleLogout }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  
  // Form States
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Load cart and redirect if empty
  useEffect(() => {
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (currentCart.length === 0) {
      navigate('/cart'); // Redirect to cart if nothing to buy
    } else {
      setCart(currentCart);
    }
  }, [navigate]);

  // Calculate Total Price
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace('$', ''));
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  const handlePayment = (e) => {
    e.preventDefault(); // Stop form from refreshing the page

    // 1. Create the order object
    const newOrder = {
      orderId: Date.now(),
      items: cart,
      total: `$${calculateTotal()}`,
      date: new Date().toLocaleDateString(),
      buyer: user.username
    };

    // 2. Save to Local Storage using Spread Operator
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
    
    // 3. Clear the cart after successful payment
    localStorage.removeItem('cart');

    // 4. Success and redirect to Home
    alert(`✅ Payment Successful! Your order has been placed.`);
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <ShopNavbar user={user} handleLogout={handleLogout} />

      <Container className="py-5">
        <Row className="justify-content-center">
          
          {/* Left Side: Order Summary */}
          <Col md={5}>
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body>
                <h4 className="fw-bold mb-3">Order Summary</h4>
                
                {/* ✅ UPDATED CART MAP SECTION */}
                {cart.map((item, index) => {
                  const price = parseInt(item.price.replace('$', ''));
                  const qty = item.quantity || 1;
                  return (
                    <div key={index} className="d-flex justify-content-between mt-3 border-bottom pb-2">
                      <div>
                        <div className="fw-bold">{item.name}</div>
                        <small className="text-muted">Size: {item.size} (x{qty})</small>
                      </div>
                      <span className="fw-bold">${price * qty}</span>
                    </div>
                  );
                })}

                <hr className="my-3" />
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Shipping</span>
                  <span className="text-success fw-bold">FREE</span>
                </div>
                
                <hr className="my-3" />
                
                <div className="d-flex justify-content-between fs-5 fw-bold">
                  <span>Total Amount</span>
                  <span className="text-dark">${calculateTotal()}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Side: Payment Form */}
          <Col md={5}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h4 className="fw-bold mb-4">Payment Details</h4>
                <Form onSubmit={handlePayment}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Card Number</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="1234 5678 9012 3456" 
                      maxLength="19"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      required 
                    />
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Expiry Date</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="MM/YY" 
                          maxLength="5"
                          value={expiry}
                          onChange={e => setExpiry(e.target.value)}
                          required 
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">CVV</Form.Label>
                        <Form.Control 
                          type="password" 
                          placeholder="123" 
                          maxLength="3"
                          value={cvv}
                          onChange={e => setCvv(e.target.value)}
                          required 
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button 
                    variant="dark" 
                    type="submit" 
                    className="w-100 py-2 mt-2 fw-bold fs-5"
                  >
                    PAY NOW
                  </Button>
                  
                  <div className="text-center mt-3">
                    <small className="text-muted">🔒 Your payment information is secure.</small>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </div>
  );
}