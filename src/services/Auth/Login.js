import { appAxios } from "services/axiosConfig";

export const adminLogin = async (data) => {
  try {
    const response = appAxios.post("/auth/admin", data);
    return response;
  } catch (error) {
    console.log("Error logging in:", error);
  }
};

export const checkAuth = async () => {
  try {
    const response = appAxios.post("/auth/check_admin_auth");
    return response;
  } catch (error) {
    console.log("Error authorizing:", error);
  }
};
