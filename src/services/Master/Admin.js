import { appAxios } from "services/axiosConfig";

export const createAdmin = async (data) => {
    try{
        console.log('marker2:',data);
        const response = await appAxios.post(`/admin`,data);
        console.log('mark3')
        return response;
    }catch(error){
        console.log('Error creating admin', error);
    }
}