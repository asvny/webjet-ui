import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HotelListing } from "./hotel_listing/main";
import "./reset.css";
import "./global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HotelListing />
  </StrictMode>
);
