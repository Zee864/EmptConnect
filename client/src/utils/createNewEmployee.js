import axios from "axios";

const createNewEmployee = async (url, data) => {
  try {
    const res = await axios.post(url, data);
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default createNewEmployee;
