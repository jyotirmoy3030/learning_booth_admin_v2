import { appAxios } from "services/axiosConfig";

export const uploadBlogContent = async (data) => {
    try{
        // console.log('blog content',data.blogTitle);
        const response = await appAxios.post(`/content/blog`,data);
        return response;
    }catch(error){
        console.error('Error uploading data', error);
        throw error;
    }
}
export const uploadCompanyContent = async (data) => {
    try{
        // console.log('company content',data);
        const response = await appAxios.post(`/content/company`,data);
        return response;
    }catch(error){
        console.error('Error uploading data', error);
        throw error;
    }
}
export const uploadBannerContent = async (data) => {
    try{
        console.log('banner content',data);
        const response = await appAxios.post(`/content/banner`,data);
        return response;
    }catch(error){
        console.error('Error uploading data', error);
        throw error;
    }
}
export const uploadTestimonialContent = async (data) => {
    try{
        console.log('testimonial content',data);
        const response = await appAxios.post(`/content/testimonial`,data);
        return response;
    }catch(error){
        console.error('Error uploading data', error);
        throw error;
    }
}