import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import { useStore } from "../Context/StoreContext";
import { formatPrice } from "../Utilities/formatPrice";

import CartItem from "./CartItem";

function ShoppingCart() {
  // values from useShopping context
  const { show, closeCart, cartItems } = useShoppingCart();

  // values from useStore context
  const { products } = useStore();

  return (
    <Offcanvas show={show} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <h2>Cart</h2>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
              {/* --------- Total Price --------- */}
              <div className="ms-auto">
                <h4>
                  Total:&#160;
                  {formatPrice(
                    cartItems.reduce((total, cartItem) => {
                      const item = products.find((i) => i.id === cartItem.id);
                      return total + (item?.price || 0) * cartItem.quantity;
                    }, 0)
                  )}
                </h4>
              </div>
              {/* --------- Total Price --------- */}
            </>
          ) : (
            <h5 className="text-muted">There is no item in your cart</h5>
          )}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
