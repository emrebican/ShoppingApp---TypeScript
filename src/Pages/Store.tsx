import { Row, Col, Form } from "react-bootstrap";
import { useStore } from "../Context/StoreContext";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

import StoreItem from "../Components/StoreItem";

function Store() {
  const { products } = useStore();
  const [inputValue, setInputValue] = useState("");

  let filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2>Store</h2>
        <section style={{ position: "relative" }}>
          <Form.Control
            type="text"
            size="sm"
            placeholder="search a product..."
            style={{ width: "200px" }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <BiSearchAlt2
          className="text-muted"
            style={{ position: "absolute", right: "10px", top: "30%" }}
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
