import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  uploadBlogContent,
  uploadCompanyContent,
  uploadBannerContent,
  uploadTestimonialContent,
} from "services/Master/WebsiteContent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  InputLabel,
  Typography,
  Paper,
} from "@mui/material";
// import './BlogForm.css'; // Create a separate CSS file for styling

const WebsiteContent = () => {
  const blogFormik = useFormik({
    initialValues: {
      blogTitle: "",
      blogContent: "",
      blogThumbnail: null,
    },
    validationSchema: Yup.object({
      blogTitle: Yup.string().required("Title is required"),
      blogContent: Yup.string().required("Content is required"),
      blogThumbnail: Yup.mixed().required("Thumbnail image is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
    formData.append("blogTitle", values.blogTitle);
    formData.append("blogContent", values.blogContent);
    formData.append("thumbnail", values.blogThumbnail);
    formData.forEach((value, key) => {
      console.log(`${key}:`, value instanceof File ? value.name : value);
    });
    // ... (other form fields)

    await uploadBlogContent(formData);

        toast.success("Blog content uploaded successfully!");
        resetForm();
      } catch (error) {
        console.error("Error uploading blog content:", error);
        toast.error("Failed to upload blog content.");
      }
    },
  });

  const companyFormik = useFormik({
    initialValues: {
      companyThumbnail: "",
    },
    validationSchema: Yup.object({
      companyThumbnail: Yup.mixed().required(
        "Company thumbnail image is required"
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try{
        const formData = new FormData();
        formData.append('companyThumbnail', values.companyThumbnail); 
        uploadCompanyContent(formData); // Pass formData directly       
      // console.log("companyThumbnail:", values.companyThumbnail);

    formData.forEach((value, key) => {
      console.log(`${key}:`, value instanceof File ? value.name : value);
    });
      // uploadCompanyContent(values);
      toast.success("Company content uploaded successfully!");
      resetForm();
  }catch (error) {
    console.error("Error uploading blog content:", error);
    toast.error("Failed to upload blog content.");
  }
    },
  });

  const bannerFormik = useFormik({
    initialValues: {
      bannerThumbnail: "",
    },
    validationSchema: Yup.object({
      bannerThumbnail: Yup.mixed().required(
        "Banner thumbnail image is required"
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try{
        const formData = new FormData();
        formData.append('bannerThumbnail', values.bannerThumbnail); 
        uploadBannerContent(formData); // Pass formData directly       
      console.log("bannerThumbnail:", values.bannerThumbnail);

    formData.forEach((value, key) => {
      console.log(`${key}:`, value instanceof File ? value.name : value);
    });
      // uploadCompanyContent(values);
      toast.success("Banner content uploaded successfully!");
      resetForm();
  }catch (error) {
    console.error("Error uploading blog content:", error);
    toast.error("Failed to upload blog content.");
  }
    },
  });

  const testimonialFormik = useFormik({
    initialValues: {
      testimonialName: "",
      testimonialContent: "",
    },
    validationSchema: Yup.object({
      testimonialName: Yup.string().required("Name is required"),
      testimonialContent: Yup.string().required("Content is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      uploadTestimonialContent(values);
      toast.success("Testimonial content uploaded successfully!");
      resetForm();
    },
  });

  return (
    <div>
      {/* Blog Details */}
      <div className="form-block">
        <Typography variant="h4" sx={{ my: 2 }}>
          Update Website Content
        </Typography>
        <form onSubmit={blogFormik.handleSubmit}>
          <Paper sx={{ p: 2, backgroundColor: "#f0f0f0" }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Blogs
            </Typography>

            <Stack spacing={1}>
              {/* ... Blog fields */}
              <InputLabel htmlFor="blogTitle" sx={{ fontSize: "16px" }}>
                Title
              </InputLabel>
              {/* <input type="text" {...blogFormik.getFieldProps("blogTitle")} /> */}
              <OutlinedInput
                id="blogTitle"
                type="text"
                multiline
                {...blogFormik.getFieldProps("blogTitle")}
                placeholder="Title"
                sx={{ width: "100%" }}
              />
              {blogFormik.touched.blogTitle && blogFormik.errors.blogTitle ? (
                <div className="error-message" style={{ color: "red" }}>
                  {blogFormik.errors.blogTitle}
                </div>
              ) : null}

              <InputLabel htmlFor="blogContent" sx={{ fontSize: "16px" }}>
                Content
              </InputLabel>
              {/* <textarea {...blogFormik.getFieldProps("blogContent")} /> */}
              <OutlinedInput
                id="blogContent"
                type="text"
                multiline
                {...blogFormik.getFieldProps("blogContent")}
                placeholder="Content"
                sx={{ width: "100%" }}
              />
              {blogFormik.touched.blogContent &&
                blogFormik.errors.blogContent && (
                  <div className="error-message" style={{ color: "red" }}>
                    {blogFormik.errors.blogContent}
                  </div>
                )}

              <InputLabel htmlFor="blogThumbnail" sx={{ fontSize: "16px" }}>
                Thumbnail
              </InputLabel>
              <input
                type="file"
                onChange={(e) =>
                  blogFormik.setFieldValue(
                    "blogThumbnail",
                    e.currentTarget.files[0]
                  )
                }
              />
              {blogFormik.touched.blogThumbnail &&
              blogFormik.errors.blogThumbnail ? (
                <div className="error-message" style={{ color: "red" }}>
                  {blogFormik.errors.blogThumbnail}
                </div>
              ) : null}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  marginTop: "16px",
                  width: "fit-content",
                  margin: "auto",
                  display: "block",
                }}
              >
                Submit
              </Button>
            </Stack>
          </Paper>
        </form>
      </div>
      <div style={{ marginTop: "25px" }}></div>
      <div className="form-block">
        <Paper sx={{ p: 2, backgroundColor: "#f0f0f0" }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Banner Content
          </Typography>
          <form onSubmit={bannerFormik.handleSubmit}>
            <InputLabel htmlFor="bannerThumbnail" sx={{ fontSize: "16px" }}>
              Banner Content
            </InputLabel>{" "}
            <input
              type="file"
              onChange={(e) =>
                bannerFormik.setFieldValue(
                  "bannerThumbnail",
                  e.currentTarget.files[0]
                )
              }
            />
            {bannerFormik.touched.bannerThumbnail &&
            bannerFormik.errors.bannerThumbnail ? (
              <div className="error-message" style={{ color: "red" }}>
                {bannerFormik.errors.bannerThumbnail}
              </div>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                marginTop: "16px",
                width: "fit-content",
                margin: "auto",
                display: "block",
              }}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </div>
      <div style={{ marginTop: "25px" }}></div>
      {/* Company Logo */}
      <div className="form-block">
        <Paper sx={{ p: 2, backgroundColor: "#f0f0f0" }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Company Thumbnail
          </Typography>
          <form onSubmit={companyFormik.handleSubmit}>
            <InputLabel htmlFor="companyThumbnail" sx={{ fontSize: "16px" }}>
              Company Thumbnail
            </InputLabel>{" "}
            <input
              type="file"
              onChange={(e) =>
                companyFormik.setFieldValue(
                  "companyThumbnail",
                  e.currentTarget.files[0]
                )
              }
            />
            {companyFormik.touched.companyThumbnail &&
            companyFormik.errors.companyThumbnail ? (
              <div className="error-message" style={{ color: "red" }}>
                {companyFormik.errors.companyThumbnail}
              </div>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                marginTop: "16px",
                width: "fit-content",
                margin: "auto",
                display: "block",
              }}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </div>
      <div style={{ marginTop: "25px" }}></div>

      {/* Banner Content */}
      {/*<div className="form-block">
        <Paper sx={{ p: 2, backgroundColor: "#f0f0f0" }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Banner Thumbnail
          </Typography>
          <form onSubmit={bannerFormik.handleSubmit}>
            <InputLabel htmlFor="BannerThumbnail" sx={{ fontSize: "16px" }}>
              Thumbnail
            </InputLabel>{" "}
            <input
              type="file"
              onChange={(e) =>
                bannerFormik.setFieldValue(
                  "bannerThumbnail",
                  e.currentTarget.files[0]
                )
              }
            />
            {bannerFormik.touched.bannerThumbnail &&
            bannerFormik.errors.bannerThumbnail ? (
              <div className="error-message" style={{ color: "red" }}>
                {bannerFormik.errors.bannerThumbnail}
              </div>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                marginTop: "16px",
                width: "fit-content",
                margin: "auto",
                display: "block",
              }}
            >
              Submit
            </Button>
          </form>
        </Paper>
            </div> */}

      <div style={{ marginTop: "25px" }}></div>

      {/* Testimonials Content */}
      <div className="form-block">
        <Paper sx={{ p: 2, backgroundColor: "#f0f0f0" }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Testimonials
          </Typography>
          <Stack spacing={1}>
            <form onSubmit={testimonialFormik.handleSubmit}>
              <InputLabel htmlFor="testimonialName" sx={{ fontSize: "16px" }}>
                Testimonial Name
              </InputLabel>
              {/* <input
            type="text"
            {...testimonialFormik.getFieldProps("testimonialName")}
          /> */}
              <OutlinedInput
                id="testimonialName"
                type="text"
                multiline
                {...testimonialFormik.getFieldProps("testimonialName")}
                placeholder="Testimonial Name"
                sx={{ width: "100%" }}
              />
              {testimonialFormik.touched.testimonialName &&
              testimonialFormik.errors.testimonialName ? (
                <div className="error-message" style={{ color: "red" }}>
                  {testimonialFormik.errors.testimonialName}
                </div>
              ) : null}

              <InputLabel
                htmlFor="TestimonialContent"
                sx={{ fontSize: "16px", marginBottom: "8px" }}
              >
                Testimonial Content
              </InputLabel>
              {/* <textarea
              {...testimonialFormik.getFieldProps("testimonialContent")}
            /> */}
              <OutlinedInput
                id="testimonialContent"
                type="text"
                multiline
                {...testimonialFormik.getFieldProps("testimonialContent")}
                placeholder="Testimonial Content"
                sx={{ width: "100%", marginBottom: "10px" }}
              />
              {testimonialFormik.touched.testimonialContent &&
              testimonialFormik.errors.testimonialContent ? (
                <div className="error-message" style={{ color: "red" }}>
                  {testimonialFormik.errors.testimonialContent}
                </div>
              ) : null}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  marginTop: "16px",
                  width: "fit-content",
                  margin: "auto",
                  display: "block",
                }}
              >
                Submit
              </Button>
            </form>
          </Stack>
        </Paper>
      </div>
      <div style={{ marginTop: "25px" }}></div>
    </div>
  );
};

export default WebsiteContent;
