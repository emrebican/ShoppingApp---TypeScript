import { useState, createContext, ReactNode, useContext } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

type ProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartFuncs = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
  totalQuantity: number;
  show: boolean;
};

const ShoppingCartContex = createContext({} as ShoppingCartFuncs);
const localStorageKEY: string = "cartItems";
export const ShoppingCartProvider = ({ children }: ProviderProps) => {
  // CART State
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shoppingCart",
    []
  );
  // Canvas
  const [show, setShow] = useState<boolean>(false);

  // TotalQuantity
  const totalQuantity = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );

  // Functions----------------------------------------------------------
  // getItemQuantity
  function getItemQuantity(id: number) {
    // cartItems'ta bir item varsa ve id eşleşiyorsa
    // quantity değerini dön, yoksa 0 dön
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  // increaseQuantity
  function increaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      // cartItems'ta item ekleniyorsa
      // yani aradığımız item.id cartItems'ta yoksa | null dönüyorsa
      if (currentItems.find((item) => item.id === id) == null) {
        // olan cartItems'ları al + yeni item'a quantity:1 ekle
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          // cartItems'ta item varsa quantity artır
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
            // artırma yoksa item'ı aynen bırak
          } else {
            return item;
          }
        });
      }
    });
  }

  // decreaseQuantity
  function decreaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      // cartItems'ta item varsa ve quantity === 1ise
      if (currentItems.find((item) => item.id === id)?.quantity == 1) {
        // silme işlemi yap
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  // removeFromCart
  function removeFromCart(id: number) {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }

  // CANVAS Funcs
  function openCart() {
    setShow(true);
  }
  function closeCart() {
    setShow(false);
  }

  // Functions----------------------------------------------------------

  return (
    <ShoppingCartContex.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        totalQuantity,
        show,
      }}
    >
      {children}
    </ShoppingCartContex.Provider>
  );
};

export const useShoppingCart = () => useContext(ShoppingCartContex);
