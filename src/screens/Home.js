import React, { useEffect, useState } from "react";
import { API } from "../logic/Constants";

import imageBanner from "../assets/nathalia-rosa-rWMIbqmOxrY-unsplash.jpg";

export default function Home(props) {
  return (
    <div>
      <div
        style={{
          height: "400px",
          backgroundImage: `url(${imageBanner})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "50px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Tienda Los Pibes
          </div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Los mejores productos a precios bajos
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          backgroundColor: "",
        }}
      >
        {props.products.map((item) => (
          <div
            key={item.id}
            style={{
              width: "250px",
              height: "420px",
              backgroundColor: "",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              margin: "20px",
              // padding: "20px",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: "#e63946",
                color: "white",
                borderRadius: "10px 10px 0 0",
                padding: "10px",
              }}
            >
              {item.producto}
            </div>
            <div>
              {" "}
              <img
                src={item.image_url}
                alt="producto"
                width={"100%"}
                // height={"50%"}
              />
            </div>
            <div
              style={{
                padding: "10px",
              }}
            >
              <div>{item.descripcion}</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontSize: "30px",
                  }}
                >
                  s/{parseInt(item.precio)}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="buttonCircle"
                    style={{
                      fontSize: "20px",
                      padding: "10px",
                      height: "20px",
                      width: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "20px",
                      margin: "2px",
                      backgroundColor:
                        parseInt(props.productsSelected[item.id]?.count) > 0
                          ? "#e63946"
                          : "#dee2e6",
                    }}
                    onClick={() => {
                      if (item.id in props.productsSelected) {
                        props.setproductsSelected({
                          ...props.productsSelected,
                          [item.id]: {
                            ...props.productsSelected[item.id],
                            count:
                              parseInt(props.productsSelected[item.id].count) ==
                              1
                                ? 0
                                : parseInt(
                                    props.productsSelected[item.id].count
                                  ) - 1,
                          },
                        });
                      }
                    }}
                  >
                    -
                  </div>

                  <div>
                    {parseInt(props.productsSelected[item.id]?.count) > 0
                      ? parseInt(props.productsSelected[item.id]?.count)
                      : ""}
                  </div>
                  <div
                    className="buttonCircle"
                    style={{
                      fontSize: "20px",
                      padding: "10px",
                      backgroundColor:
                        parseInt(props.productsSelected[item.id]?.count) > 0
                          ? "#e63946"
                          : "#dee2e6",
                      height: "20px",
                      width: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "20px",
                      margin: "2px",
                    }}
                    onClick={() => {
                      if (item.id in props.productsSelected) {
                        props.setproductsSelected({
                          ...props.productsSelected,
                          [item.id]: {
                            ...props.productsSelected[item.id],
                            count:
                              parseInt(item.cantidad) ==
                              parseInt(props.productsSelected[item.id].count) +
                                1
                                ? parseInt(item.cantidad)
                                : parseInt(
                                    props.productsSelected[item.id].count
                                  ) + 1,
                          },
                        });
                      } else {
                        props.setproductsSelected({
                          ...props.productsSelected,
                          [item.id]: {
                            name: item.producto,
                            count: 1,
                            price: parseFloat(item.precio),
                          },
                        });
                      }
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
