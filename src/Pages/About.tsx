import { useState } from "react";
import Spinner from "../Components/Spinner";

function About() {
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
      <h2 className="text-muted">About Page</h2>
    </div>
  );
}

export default About;
