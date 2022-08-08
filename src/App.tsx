import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";
import { StoreProvider } from "./Context/StoreContext";

import Home from "./Pages/Home";
import Store from "./Pages/Store";
import About from "./Pages/About";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <ShoppingCartProvider>
        <StoreProvider>
          <Navbar />
          <Container className="mb-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Container>
        </StoreProvider>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
