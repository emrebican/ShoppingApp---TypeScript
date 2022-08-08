import { Card, Badge, Button } from "react-bootstrap";
// context
import { useShoppingCart } from "../Context/ShoppingCartContext";
// utilities
import { formatPrice } from "../Utilities/formatPrice";
import { formatTitle } from "../Utilities/formatTitle";
import { formatContent } from "../Utilities/formatContent";

type rateType = {
  rate: number;
  count: number;
};

interface StoreItemProps {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: rateType;
  image: string;
}

function StoreItem({
  id,
  title,
  description,
  price,
  category,
  rating,
  image,
}: StoreItemProps) {
  // functions from context
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  // quantity
  const quantity = getItemQuantity(id);

  return (
    <Card style={{ height: "36rem" }} className="p-2">
      <Card.Img
        variant="top"
        src={image}
        height="250px"
        style={{ objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column justify-content-evenly">
        <Card.Title>{formatTitle(title)}</Card.Title>
        <span className="text-muted">{formatPrice(price)}</span>
        <Card.Text>{formatContent(description)}</Card.Text>
        <section className="d-flex justify-content-between align-items-baseline">
          <small className="text-muted">{category}</small>
          <Badge bg="dark" className="p-2">
            {rating.rate}
          </Badge>
        </section>
      </Card.Body>
      <div className="mt-auto">
        {quantity === 0 ? (
          <Button
            className="w-100"
            variant="dark"
            onClick={() => increaseCartQuantity(id)}
          >
            <b>+</b> add to Cart
          </Button>
        ) : (
          <div
            className="d-flex flex-column align-items-center"
            style={{ gap: ".5rem" }}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: ".5rem" }}
            >
              <Button
                className="d-flex justify-content-center align-items-center fs-5 fw-bold"
                style={{ width: "25px", height: "25px" }}
                size="sm"
                onClick={() => decreaseCartQuantity(id)}
              >
                -
              </Button>
              <div>
                <span className="fs-3">{quantity}</span> in cart
              </div>
              <Button
                className="d-flex justify-content-center align-items-center fs-5 fw-bold"
                style={{ width: "25px", height: "25px" }}
                size="sm"
                onClick={() => increaseCartQuantity(id)}
              >
                +
              </Button>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeFromCart(id)}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

export default StoreItem;
