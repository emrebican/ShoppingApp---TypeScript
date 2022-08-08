import { useState } from "react";
import Spinner from "../Components/Spinner";

function Home() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 700);
  return loading ? (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Spinner />
      <span className="text-muted ms-2 fs-5">Loading</span>
    </div>
  ) : (
    <div>
      <h2 className="text-muted">Home Page</h2>
      <p>Welcome to Shopping App</p>
      <p>
        This app powered by React and these are the technologies used in the
        app:
      </p>
      <ul>
        <li>TypeScript</li>
        <li>Bootstrap</li>
        <li>React-router-dom</li>
        <li>React-Context</li>
        <li>axios</li>
      </ul>
    </div>
  );
}

export default Home;
