import axios from "axios";
import React from "react";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  //const url = "http://localhost:4000";
  const url ="https://food-del-backend-mgb2.onrender.com";
  const frontendUrl="https://food-del-frontend-7rx2.onrender.com"
  //const frontendUrl="http://localhost:5173";

  const [token, setToken] = useState("");
  const [list, setList] = useState([]);
  const [orders, setOrders] = useState([]);

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    if (token) {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: { token },
      });
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } else {
      toast.error("Kindly login first");
    }
  };

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const removeFood = async (foodId) => {
    if (token) {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      }
    ,{headers:{token}});

      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Can't remove food");
      }
    } else {
      toast.error('Kindly login first')
    }
  };

  const fetchAllOrders = async () => {
    if (token) {
      const response = await axios.get(url + "/api/order/list", {
        headers: { token },
      });
      if (response.data.success) {
        if (response.data.data) setOrders(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    }
    
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(
      url + "/api/order/status",
      {
        orderId,
        status: event.target.value, 
      },
      {headers: { token }}
    );
    if (response.length != 0) {
      console.log(response);
      if (response.data.success === true) {
        await fetchAllOrders();
      } else {
        toast.error("Can't Update Status");
      }
    } else {
      toast.error("Can't Update Status");
    }
  };

  const loadData = async () => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else toast.error("Kindly login first");
  };
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      await fetchAllOrders();
      await fetchList();
    };

    fetchAll();
    
  }, [token]);

  const contextValue = {
    url,
    token,
    setToken,
    image,
    setImage,
    data,
    setData,
    onSubmitHandler,
    list,
    setList,
    fetchList,
    removeFood,
    orders,
    setOrders,
    fetchAllOrders,
    statusHandler,
    frontendUrl
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
