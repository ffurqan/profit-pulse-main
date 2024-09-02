import Head from "next/head";
import Header from "@/Components/Header";
import Script from "next/script";
import Footer from "@/Components/Footer";
import { useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null); // State for submission status
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (responseData.success) {
        setSubmissionStatus("submitted"); // Set submission status to "submitted"
        setFormData({ name: "", message: "" }); // Clear the form
      } else {
        setSubmissionStatus("error"); // Set submission status to "error"
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmissionStatus("error"); // Set submission status to "error"
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
        href="cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
        rel="stylesheet"
        crossOrigin="true"
      />
      <link
        href="cdn.jsdelivr.net/npm/bootstrap-icons%401.4.1/font/bootstrap-icons.css"
        rel="stylesheet"
        crossOrigin="true"
      />
      <link rel="stylesheet" href="/css/style.css" />
      <link
        href="lib/animate/animate.min.css"
        rel="stylesheet"
        crossOrigin="true"
      />
      <link
        href="lib/owlcarousel/assets/owl.carousel.min.css"
        rel="stylesheet"
        crossOrigin="true"
      />
      <link href="css/bootstrap.min.css" rel="stylesheet" crossOrigin="true" />
      <link href="css/style.css" rel="stylesheet" crossOrigin="true" />
      <Header />
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-lg-8 text-center">
              <h1 className="display-4 text-white animated slideInDown">
                Review Us
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Review Us
            </h6>
            <h1 className="mb-5">Give Us Your Feedback</h1>
          </div>
          <div className="row g-4">
            <div className="wow fadein" data-wow-delay="0.1s">
              <div className="d-flex align-items-center mb-3"></div>
              <div className="d-flex align-items-center mb-3">
                <div
                  className="col-lg-4 col-md-12 wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                          <label htmlFor="name">Your Name</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Leave a message here"
                            id="message"
                            name="message"
                            style={{ height: "150px" }}
                            value={formData.message}
                            onChange={handleChange}
                          ></textarea>
                          <label htmlFor="message">Message</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100 py-3"
                          type="submit"
                        >
                          Send Review
                        </button>
                      </div>
                    </div>
                  </form>
                  {submissionStatus === "submitted" && (
                    <div className="mt-4 text-success">
                      <i className="fa fa-check-circle me-2"></i>
                      <span>Your review has been submitted successfully!</span>
                    </div>
                  )}
                  {submissionStatus === "error" && (
                    <div className="mt-4 text-danger">
                      <i className="fa fa-exclamation-circle me-2"></i>
                      <span>
                        There was an error submitting your review. Please try
                        again.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <Script src="/js/jquery.min.js" strategy="beforeInteractive" />
      <Script src="/js/bootstrap.min.js" strategy="lazyOnload" />
      <Script src="/lib/wow/wow.min.js" strategy="lazyOnload" />
      <Script src="/lib/easing/easing.min.js" strategy="lazyOnload" />
      <Script src="/lib/waypoints/waypoints.min.js" strategy="lazyOnload" />
      <Script
        src="/lib/owlcarousel/owl.carousel.min.js"
        strategy="lazyOnload"
      />
      <Script src="/js/main.js" strategy="lazyOnload" />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
