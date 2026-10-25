import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
    <Header />
    <Outlet /> {/* This is used for rendering children components */}
    <Footer />
    </>
  )
}

export default App
