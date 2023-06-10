import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import {
  submitUserToServerClient,
  submitUserToServerLogout,
} from "../logic/Functions";

export default function Header(props) {
  const [userCredentials, setuserCredentials] = useState({
    email: "",
    password: "",
  });

  const [messageLog, setmessageLog] = useState("");

  const handleSubmitCredentials = async (type) => {
    await submitUserToServerClient(
      {
        userCredentials: userCredentials,
        type: type,
      },
      (res) => {
        console.log(res, "🐈 🇲🇴 ");
        if (res.status == 200) {
          const obj = JSON.parse(res.payload);
          console.log(obj, "🐈 🇲🇴 ");
          if (type == "login") {
            if (obj.codigo == 1) {
              setmessageLog("No estas registrado, Resitrate");
            }
            if (obj.codigo == 0) {
              setmessageLog("");
              props.setcurrentUser(userCredentials.email);
            }
          }
          if (type == "signup") {
            if (obj.codigo == 1) {
              setmessageLog("No se pudo resitrar");
            }
            if (obj.codigo == 0) {
              setmessageLog("Registro exitoso");
              props.setcurrentUser(userCredentials.email);
            }
          }
          setuserCredentials({
            email: "",
            password: "",
          });
        } else {
          props.setcurrentUser("no-client");
        }
      }
    );
  };

  const handleSubmitLogout = async () => {
    await submitUserToServerLogout({ codigo: 9 }, () => {
      props.setcurrentUser(null);
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#e63946",
        color: "white",
        padding: "5px 30px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}
    >
      <div>
        <div
          className="buttonCircle"
          style={{
            border: "2px solid white",
            padding: "10px",
          }}
          onClick={() => {
            props.setcurrentScreen("home");
          }}
        >
          Tienda los pibes
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {props.currentUser == "no-client" ? (
          <div
            style={{
              color: "white",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No eres usuraio, porfavor registrate
          </div>
        ) : null}

        <div
          className="buttonCircle"
          style={{
            padding: "10px",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid white",
            borderRadius: "10px",
          }}
          onClick={() => {
            props.setcurrentScreen("carStore");
          }}
        >
          Carrito: s/{props.total}
        </div>

        {!props.currentUser || props.currentUser == "no-client" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {messageLog != "" && props.currentUser ? (
              <div>{messageLog}</div>
            ) : null}
            <TextField
              id="outlined-basic"
              label="johndoe@uni.pe"
              size="small"
              variant="outlined"
              type="email"
              value={userCredentials.email}
              sx={{
                margin: "0 4px",
                background: "white",
                borderRadius: "7px",
              }}
              onChange={(e) => {
                setuserCredentials({
                  ...userCredentials,
                  email: e.target.value,
                });
              }}
            />
            <TextField
              id="outlined-basic"
              label="password"
              size="small"
              variant="outlined"
              type="password"
              value={userCredentials.password}
              sx={{
                margin: "0 4px",
                background: "white",
                borderRadius: "7px",
              }}
              onChange={(e) => {
                setuserCredentials({
                  ...userCredentials,
                  password: e.target.value,
                });
              }}
            />
            <Button
              variant="contained"
              sx={{ margin: "0 4px" }}
              onClick={() => {
                handleSubmitCredentials("login");
              }}
            >
              {" "}
              Iniciar session
            </Button>
            <Button
              variant="contained"
              sx={{ margin: "0 4px" }}
              onClick={() => {
                handleSubmitCredentials("signup");
              }}
            >
              {" "}
              Registarce
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "0 20px",
              }}
            >
              {props.currentUser}
            </div>
            <Button
              variant="contained"
              sx={{ margin: "0 4px" }}
              onClick={() => {
                props.setcurrentUser(null);
                // handleSubmitLogout();
              }}
            >
              {" "}
              Salir
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
