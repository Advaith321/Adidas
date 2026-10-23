import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

export default function Product({ user }) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
   
    if (!user) {
      alert("Please login to buy items!");
      navigate('/login'); 
      return;
    }

   
    const newOrder = {
      product: "Adidas Ultraboost Light",
      price: 190,
      date: new Date().toLocaleDateString(),
      buyer: user.username
    };

 
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));

  
    alert(`✅ Success! ${newOrder.product} has been bought.`);
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            {/* Shoe Image */}
            <Card.Img 
              variant="top" 
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1e510406040647079151af9100c37102_9366/Ultraboost_Light_Shoes_White_HQ6347_01_standard.jpg" 
              alt="Adidas Shoe" 
            />
            <Card.Body>
              <Card.Title style={{ fontWeight: 'bold' }}>Ultraboost Light</Card.Title>
              <Card.Text style={{ color: 'gray' }}>
                Experience incredible lightness and energy return.
              </Card.Text>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">$190</h4>
                <span className="badge bg-success">In Stock</span>
              </div>
              
             
              <Button 
                variant="dark" 
                style={{ width: '100%', padding: '10px', fontWeight: 'bold' }} 
                onClick={handleBuyNow}
              >
                BUY NOW
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}