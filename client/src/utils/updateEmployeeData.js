import axios from "axios";

const updateEmployeeData = async (url, data) => {
  try {
    const res = await axios.put(url, data);
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default updateEmployeeData;
