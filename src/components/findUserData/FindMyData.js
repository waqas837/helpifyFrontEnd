import React, { useEffect } from "react";
import axios from "axios";
import { url } from "../../Api/ApiRoutes";
const FindMyData = () => {
  const user = localStorage.getItem("user");
  useEffect(() => {
    findMyTestData();
  }, []);
  const findMyTestData = async () => {
    try {
      const { data } = await axios.get(`${url}/findUserTest/${user}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return <div></div>;
};

export default FindMyData;
