import Header from "@/Components/Header";
import Script from "next/script";
import Footer from "@/Components/Footer";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Home() {
  useEffect(() => {
    const auth = Cookies.get("adminAuth");
    if (auth !== "loggedIn") {
      router.push("login"); // Redirect to login page if not authenticated
    } else {
      fetchForms(); // Fetch forms if authenticated
    }
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null); // State for submission status

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (responseData.success) {
        setSubmissionStatus("submitted"); // Set submission status to "submitted"
        setFormData({ name: "", desc: "" }); // Clear the form
        fetchForms(); // Refresh the services list after submission
      } else {
        setSubmissionStatus("error"); // Set submission status to "error"
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmissionStatus("error"); // Set submission status to "error"
    }
  };

  const [services, setservices] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  useEffect(() => {
    fetchForms(); // Fetch forms if authenticated
  }, []);

  const fetchForms = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      console.log(data);
      setservices(data.data);
    } catch (error) {
      setservices(["failed to fetch"]);
    } finally {
      setIsLoading(false); // Stop loading after data is fetched
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

    try {
      const response = await fetch("/api/services", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: serviceToDelete }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        setservices(
          services.filter((service) => service._id !== serviceToDelete)
        );
        setServiceToDelete(null);
        setShowConfirm(false);
      } else {
        alert("Failed to delete the service. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com/"
        crossOrigin="true"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com/"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600&amp;family=Nunito:wght@600;700;800&amp;display=swap"
        rel="stylesheet"
        crossOrigin="true"
      />
      <link
        href="/cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
        rel="stylesheet"
        crossOrigin="true"
      />
      <link
        href="/cdn.jsdelivr.net/npm/bootstrap-icons%401.4.1/font/bootstrap-icons.css"
        rel="stylesheet"
        crossOrigin="true"
      />
      <link rel="stylesheet" href="/css/style.css" />
      <link
        href="/lib/animate/animate.min.css"
        rel="stylesheet"
        crossOrigin="true"
      />
      <link
        href="/lib/owlcarousel/assets/owl.carousel.min.css"
        rel="stylesheet"
        crossOrigin="true"
      />
      <link href="/css/bootstrap.min.css" rel="stylesheet" crossOrigin="true" />
      <link href="/css/style.css" rel="stylesheet" crossOrigin="true" />

      <Header />

      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-lg-8 text-center">
              <h1 className="display-4 text-white animated slideInDown">
                ADMINS ONLY - SERVICES
              </h1>
              <h5 className="text-white fs-4 animated slideInDown">
                ADD/REMOVE SERVICES!
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              SERVICES
            </h6>
            <h1 className="mb-5">ADD MORE SERVICES</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Service Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="name">Service Name</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Enter Service Description"
                    id="desc"
                    name="desc"
                    style={{ height: "150px" }}
                    value={formData.desc}
                    onChange={handleChange}
                  ></textarea>
                  <label htmlFor="desc">Service Description</label>
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">
                  Send Service
                </button>
              </div>
            </div>
          </form>
          {submissionStatus === "submitted" && (
            <div className="mt-4 text-success">
              <i className="fa fa-check-circle me-2"></i>
              <span>Service has been Updated successfully!</span>
            </div>
          )}
          {submissionStatus === "error" && (
            <div className="mt-4 text-danger">
              <i className="fa fa-exclamation-circle me-2"></i>
              <span>
                There was an error submitting Service. Please try again.
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              TOTAL SERVICES
            </h6>
            <h1 className="mb-5">TOTAL ADDED SERVICES</h1>
          </div>

          {isLoading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            services.map((elem) => (
              <div
                className=" wow fadeInUp"
                data-wow-delay="0.1s"
                key={elem._id}
              >
                <div className="admin-service service-item  pt-3 h-100">
                  <div className="p-4">
                    <h5 className="mb-3">{elem.name}</h5>
                    <p>{elem.desc}</p>
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
                      <strong>Are you sure?</strong> You want to delete this
                      service.
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
            ))
          )}
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
}
