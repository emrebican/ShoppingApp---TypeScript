import { Row, Col, Form } from "react-bootstrap";
import { useStore } from "../Context/StoreContext";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

import StoreItem from "../Components/StoreItem";
import Spinner from "../Components/Spinner";

function Store() {
  const { products } = useStore();
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 700);

  let filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  return loading ? (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Spinner />
      <span className="text-muted ms-2 fs-5">Loading</span>
    </div>
  ) : (
    <>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2>Store</h2>
        <section style={{ position: "relative" }}>
          <Form.Control
            type="text"
            placeholder="search a product..."
            style={{ width: "250px" }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <BiSearchAlt2
            className="text-muted fs-5"
            style={{ position: "absolute", right: "10px", top: "25%" }}
          />
        </section>
      </div>
      <Row xs={1} md={2} lg={3} xl={4} className="g-3">
        {filteredProducts.length > 0 &&
          filteredProducts.map((item: any) => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))}
      </Row>
    </>
  );
}

export default Store;
