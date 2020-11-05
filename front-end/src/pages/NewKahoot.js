import React from "react";
import { Link } from "react-router-dom";

const NewKahoot = () => (
  <React.Fragment>
    <Link to="/newKahoot/hostKahoot">
      <button>Host Kahoot</button>
    </Link>
  </React.Fragment>
);

export default NewKahoot;
