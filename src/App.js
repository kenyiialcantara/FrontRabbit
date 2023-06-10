import { useEffect, useState } from "react";
import "./App.css";
import Home from "./screens/Home";
import CarStore from "./screens/CarStore";
import Header from "./components/Header";
import { API } from "./logic/Constants";

function App() {
  const [currentScreen, setcurrentScreen] = useState("home");

  const [productsSelected, setproductsSelected] = useState({});
  const [total, settotal] = useState(0);
  const [products, setproducts] = useState([]);

  const handleGetProducts = async () => {
    console.log(API, "🇬🇦 ");
    const res = await fetch(API + "products");
    const response = await res.json();
    console.log(response, "🌵 ");
    setproducts(response);
  };

  const [currentUser, setcurrentUser] = useState(null);

  useEffect(() => {
    handleGetProducts();
  }, []);

  useEffect(() => {
    console.log(productsSelected);
    let t = 0;
    Object.keys(productsSelected).map((key) => {
      t =
        t +
        parseFloat(productsSelected[key].price) *
          parseInt(productsSelected[key].count);
    });
    settotal(t);
  }, [productsSelected]);

  return (
    <>
      <Header
        setcurrentScreen={setcurrentScreen}
        setcurrentUser={setcurrentUser}
        productsSelected={productsSelected}
        currentUser={currentUser}
        total={total}
      />
      {currentScreen === "home" ? (
        <Home
          productsSelected={productsSelected}
          setproductsSelected={setproductsSelected}
          products={products}
          currentUser={currentUser}
          setcurrentUser={setcurrentUser}
        />
      ) : null}
      {currentScreen === "carStore" ? (
        <CarStore
          productsSelected={productsSelected}
          setproductsSelected={setproductsSelected}
          products={products}
          total={total}
          currentUser={currentUser}
        />
      ) : null}
    </>
  );
}

export default App;
