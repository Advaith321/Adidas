import { Container, Navbar, Nav, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ShopNavbar({ user, handleLogout }) {
  // Read cart directly to show count
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-white fw-bold fs-3" style={{ letterSpacing: '4px' }}>
          ADIDAS
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user.role !== 'admin' && (
              <>
                <Nav.Link as={Link} to="/men" className="text-white fw-bold">MEN</Nav.Link>
                <Nav.Link as={Link} to="/women" className="text-white fw-bold">WOMEN</Nav.Link>
                <Nav.Link as={Link} to="/kids" className="text-white fw-bold">KIDS</Nav.Link>
              </>
            )}
          </Nav>

          <div className="d-flex align-items-center gap-3">
            {user.role === 'admin' && (
              <Link to="/admin-dashboard" className="text-white text-decoration-none fw-bold">
                ⚙️ Admin Dashboard
              </Link>
            )}

            {/* ✅ CART LINK WITH BADGE */}
            {user.role !== 'admin' && (
              <Link to="/cart" className="text-white text-decoration-none position-relative fs-5">
                🛒
                {cartCount > 0 && (
                  <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle rounded-pill">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            )}

            <span className="text-white d-none d-md-block">Hello, <strong>{user.username}</strong></span>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}