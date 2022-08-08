import { useShoppingCart } from "../Context/ShoppingCartContext";
import { useStore } from "../Context/StoreContext";
import { Stack } from "react-bootstrap";

// icons
import { MdCancel } from "react-icons/md";

// Utilities
import { formatPrice } from "../Utilities/formatPrice";
import { formatTitle } from "../Utilities/formatTitle";

type CartItemProps = {
  id: number;
  quantity: number;
};

function CartItem({ id, quantity }: CartItemProps) {
  // func from useShoppingCart context
  const { removeFromCart } = useShoppingCart();

  // value from useStore context
  const { products } = useStore();

  // products içindeki itemlerin (i) id'si gelen id'ye eşit olanı bul
  const item = products.find((i) => i.id === id);

  // yoksa null dön
  if (item == null) return null;

  return (
    <Stack
      gap={3}
      direction="horizontal"
      className="flex justify-content-between shadow rounded-1 py-2 pe-3"
    >
      <img
        src={item.image}
        style={{
          width: "80px",
          height: "70px",
          objectFit: "contain",
        }}
      />
      <div className="d-flex flex-column me-auto">
        <section className="fw-bold">{formatTitle(item.title)}</section>
        <div>
          <small className="text-muted">{formatPrice(item.price)}</small>
          &#160;
          {quantity > 1 && <small className="text-muted">x {quantity}</small>}
        </div>
        <small className="fs-6">
          Pricing: {formatPrice(item.price * quantity)}
        </small>
      </div>
      <MdCancel
        className="text-muted fs-5"
        style={{ cursor: "pointer" }}
        onClick={() => removeFromCart(id)}
      />
    </Stack>
  );
}

export default CartItem;
