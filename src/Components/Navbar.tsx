import {
  Navbar as NavbarBs,
  Container,
  Nav,
  Button,
  Badge,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import ShoppingCart from "./ShoppingCart";

function Navbar() {
  // values from context
  const { totalQuantity, openCart } = useShoppingCart();

  return (
    <NavbarBs className="bg-white shadow-sm mb-3" sticky="top">
      <Container>
        <NavbarBs.Brand href="/" className="fw-bold fs-3">
          Logo
        </NavbarBs.Brand>
        <Nav
          className="d-flex justify-content-center gap-4"
          style={{ width: "20%" }}
        >
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        <Button
          style={{ width: "3rem", height: "3rem", position: "relative" }}
          className="rounded-circle"
          variant="outline-dark"
          onClick={openCart}
        >
          <HiShoppingCart className="fs-4" />
          {totalQuantity > 0 && (
            <Badge
              style={{
                position: "absolute",
                bottom: "-5px",
                top: "28px",
                right: "-5px",
              }}
              className="rounded-circle"
              bg="danger"
            >
              {totalQuantity}
            </Badge>
          )}
        </Button>
      </Container>
      <ShoppingCart />
    </NavbarBs>
  );
}

export default Navbar;
