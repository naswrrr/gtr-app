import { createRoot } from "react-dom/client";
import BioData from "./BioData";
import Container from "./Container";
import "./custom.css";

createRoot(document.getElementById("root")).render(
  <div className="card">
    <Container>
      <BioData />
    </Container>
  </div>
);
