import React, { useEffect, useState } from "react";
import { submitCompraToServerClient } from "../logic/Functions";

export default function CarStore(props) {
  const [succesBuy, setsuccesBuy] = useState(false);

  const handlesubmitCompraToServerClient = async () => {
    let d = {};

    Object.keys(props.productsSelected).map((key) => {
      if (props.productsSelected[key].count != 0) {
        d[key] = {
          ...props.productsSelected[key],
          partialPrice:
            parseInt(props.productsSelected[key].count) *
            parseFloat(props.productsSelected[key].price),
        };
      }
    });

    let a = [];
    Object.keys(props.productsSelected).map((key) => {
      a.push({
        ID: key,
        cantidad: props.productsSelected[key].count,
        precio: props.productsSelected[key].price,
      });
    });

    const data = {
      productos: a,
      ID: props.currentUser.email,
    };
    console.log("Comprando:", data);
    await submitCompraToServerClient(data, () => {
      setsuccesBuy(true);
    });
  };

  return (
    <div style={{ padding: "150px 0" }}>
      {Object.keys(props.productsSelected).map((key) => {
        return (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
              padding: "20px 100px",
              backgroundColor: "#edf2f4",
              margin: "10px",
              padding: "10px",
            }}
          >
            <div
              style={{
                padding: "10px",
                width: "200px",
              }}
            >
              Nombre:
              <div
                style={{
                  backgroundColor: "#8d99ae",
                  color: "white",
                  padding: "10px",
                }}
              >
                {props.productsSelected[key].name}
              </div>
            </div>
            <div
              style={{
                padding: "10px",
                width: "200px",
              }}
            >
              Precio Unitario:
              <div
                style={{
                  backgroundColor: "#8d99ae",
                  color: "white",
                  padding: "10px",
                }}
              >
                {props.productsSelected[key].price}
              </div>
            </div>
            <div
              style={{
                padding: "10px",
                width: "200px",
              }}
            >
              Cantidad:
              <div
                style={{
                  backgroundColor: "#8d99ae",
                  color: "white",
                  padding: "10px",
                }}
              >
                {props.productsSelected[key].count}
              </div>
            </div>
            <div
              style={{
                padding: "10px",
                width: "200px",
              }}
            >
              Precio Parcial:
              <div
                style={{
                  backgroundColor: "#3a86ff",
                  color: "white",
                  padding: "10px",
                }}
              >
                {parseFloat(props.productsSelected[key].price) *
                  parseInt(props.productsSelected[key].count)}
              </div>
            </div>
          </div>
        );
      })}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {succesBuy ? <div>Compra exitosa!</div> : null}
        <div
          className="buttonCircle"
          style={{
            padding: "10px",
            backgroundColor: "#e63946",
            color: "white",
            borderRadius: "10px",
          }}
          onClick={() => {
            if (props.currentUser) {
              handlesubmitCompraToServerClient();
            }
          }}
        >
          {props.currentUser ? "Comprar" : "Para comprar Ve a registrarte"}
        </div>
      </div>
    </div>
  );
}
