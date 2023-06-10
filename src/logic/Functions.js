import { API } from "./Constants";

export const submitUserToServerClient = async (data, callback = () => {}) => {
  try {
    const res = await fetch(`${API}user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    let result = await res.json();
    console.log(result, "🚀 ");
    callback(result);
  } catch (error) {
    console.log(error);
  }
};

export const submitUserToServerLogout = async (data, callback = () => {}) => {
  try {
    const res = await fetch(`${API}userlogout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    let result = await res.json();
    console.log(result, "🚀 ");
    callback(result);
  } catch (error) {
    console.log(error);
  }
};

export const submitCompraToServerClient = async (data, callback = () => {}) => {
  try {
    const res = await fetch(`${API}products`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    let result = await res.json();
    console.log(result, "🚀 ");
    callback(result);
  } catch (error) {
    console.log(error);
  }
};

export const getProductsFromServerClient = async (callback = () => {}) => {
  try {
    let response = await fetch(`${API}products`);
    let result = await response.json();

    console.log(result, "🚀 ");
    callback(result);
  } catch (error) {
    console.log(error);
  }
};
