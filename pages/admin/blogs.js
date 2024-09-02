import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Header from "@/Components/Header";
import Script from "next/script";
import Footer from "@/Components/Footer";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const BlogForm = () => {
  const router = useRouter();
  useEffect(() => {
    const auth = Cookies.get("adminAuth");
    if (auth !== "loggedIn") {
      router.push("login"); // Redirect to login page if not authenticated
    }
  }, []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [Blogs, setBlogs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!desc) {
      alert("Description is required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("desc", desc); // Ensure desc is not empty

    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    // Debugging to ensure desc is being sent correctly
    console.log("Description:", desc);

    try {
      const response = await axios.post("/api/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setSubmissionStatus("submitted");
    } catch (error) {
      console.error(error.response.data);
      setSubmissionStatus("error");
    }
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files)); // Use Array.from to ensure the files are in an array
  };
  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      console.log(data);
      setBlogs(data.data);
    } catch (error) {
      setBlogs(["failed to fetch"]);
    }
  };
  const [showConfirm, setShowConfirm] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setServiceToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!serviceToDelete) return;
    console.log(serviceToDelete);

    try {
      const response = await fetch("/api/blogs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: serviceToDelete }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        setBlogs(Blogs.filter((service) => service._id !== serviceToDelete));
        setServiceToDelete(null);
        setShowConfirm(false);
      } else {
        alert("Failed to delete the blog. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com/" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com/"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600&amp;family=Nunito:wght@600;700;800&amp;display=swap"
        rel="stylesheet"
      />
      <link
        href="/cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="/cdn.jsdelivr.net/npm/bootstrap-icons%401.4.1/font/bootstrap-icons.css"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/css/style.css" />
      <link href="/lib/animate/animate.min.css" rel="stylesheet" />
      <link
        href="/lib/owlcarousel/assets/owl.carousel.min.css"
        rel="stylesheet"
      />
      <link href="/css/bootstrap.min.css" rel="stylesheet" />
      <link href="/css/style.css" rel="stylesheet" />
      <Header />
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-lg-8 text-center">
              <h1 className="display-4 text-white animated slideInDown">
                BLOG POSTS
              </h1>
              <h5 className="text-white fs-4 animated slideInDown">
                ADD NEW BLOG POSTS!
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              BLOGS
            </h6>
            <h1 className="mb-5">ADD BLOG POSTS</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Service Name"
                  />
                  <label htmlFor="name">BLOG TITLE</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    type="text"
                    className="form-control"
                    id="desc"
                    name="desc"
                    placeholder="BLOG DESCRIPTION"
                  />
                  <label htmlFor="desc">BLOG DESCRIPTION</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <ReactQuill value={content} onChange={setContent} />
                </div>
              </div>
              <div className="col-12">
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">
                  Add The Blog
                </button>
              </div>
              {submissionStatus === "submitted" && (
                <div className="mt-4 text-success">
                  <i className="fa fa-check-circle me-2"></i>
                  <span>Blog has been added successfully!</span>
                </div>
              )}
              {submissionStatus === "error" && (
                <div className="mt-4 text-danger">
                  <i className="fa fa-exclamation-circle me-2"></i>
                  <span>
                    There was an error submitting the blog. Please try again.
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              TOTAL BLOGS
            </h6>
            <h1 className="mb-5">TOTAL ADDED BLOGS</h1>
          </div>
          {Blogs.map((elem) => (
            <div className=" wow fadeInUp" data-wow-delay="0.1s" key={elem._id}>
              <div className="admin-service service-item  pt-3 h-100">
                <div className="p-4">
                  <h5 className="mb-3">{elem.title}</h5>
                </div>
                <div className="del-button">
                  <button
                    className="btn btn-danger delete-button"
                    onClick={() => handleDeleteClick(elem._id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
              {showConfirm && <div className="blur-overlay"></div>}
              {showConfirm && (
                <div
                  className="fixed-top d-flex justify-content-center align-items-center"
                  data-wow-delay="0.3s"
                  style={{ height: "100vh", zIndex: 1050 }}
                >
                  <div
                    className="alert alert-warning alert-dismissible fade show shadow-lg rounded"
                    role="alert"
                    style={{ maxWidth: "500px", width: "90%" }}
                  >
                    <strong>Are you sure?</strong> You want to delete this Blog.
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowConfirm(false)}
                      aria-label="Close"
                    ></button>
                    <div className="mt-3">
                      <button
                        type="button"
                        className="btn btn-secondary me-2"
                        onClick={() => setShowConfirm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={confirmDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <Script src="/js/jquery.min.js" />
      <Script src="/js/bootstrap.min.js" />
      <Script src="/lib/wow/wow.min.js" />
      <Script src="/lib/easing/easing.min.js" />
      <Script src="/lib/waypoints/waypoints.min.js" />
      <Script src="/lib/owlcarousel/owl.carousel.min.js" />
      <Script src="/js/main.js" />
    </>
  );
};

export default BlogForm;
