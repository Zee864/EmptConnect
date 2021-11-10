import axios from "axios";

const deleteEmployeeData = async (url, data) => {
  try {
    const res = await axios.delete(url, { data: data });
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default deleteEmployeeData;
