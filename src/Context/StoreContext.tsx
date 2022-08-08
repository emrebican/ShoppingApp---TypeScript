import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";

type ProviderProps = {
  children: ReactNode;
};

interface RatingInterface {
  rate: number;
  count: number;
}

type StoreItem = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: RatingInterface;
};

type StoreItems = {
  products: StoreItem[];
};

const StoreContext = createContext({} as StoreItems);

export const StoreProvider = ({ children }: ProviderProps) => {
  const [products, setProducts] = useState<StoreItem[]>([]);

  useEffect(() => {
    axios("https://fakestoreapi.com/products").then((res) =>
      setProducts(res.data)
    );
  }, []);

  return (
    <StoreContext.Provider value={{ products }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
