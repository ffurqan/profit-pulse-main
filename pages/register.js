import { signIn } from "next-auth/react";
import { useState } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Script from "next/script";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setSubmissionStatus("success");
        setTimeout(() => (window.location.href = "/login"), 2000);
      } else {
        setError(result.message || "Registration failed!");
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
      setSubmissionStatus("error");
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
      <div className="container signup-container">
        <div className="card signup-card">
          <h3 className="text-center mb-4">REGISTER</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="agreeTerms"
                  required
                />
                <label className="form-check-label" htmlFor="agreeTerms">
                  I agree to the <a href="#">Terms and Conditions</a>
                </label>
              </div>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                REGISTER
              </button>
              <h6 className="or-btn">OR</h6>

              <button
                type="button"
                className="login-with-google-btn"
                onClick={() => signIn("google")}
              >
                Continue With Google
              </button>
            </div>

            {submissionStatus === "success" && (
              <div className="mt-4 text-success">
                <i className="fa fa-check-circle me-2"></i>
                <span>Registration successful! Redirecting to login...</span>
              </div>
            )}
            {submissionStatus === "error" && (
              <div className="mt-4 text-danger">
                <i className="fa fa-exclamation-circle me-2"></i>
                <span>{error}</span>
              </div>
            )}
          </form>
          <p className="text-center mt-3">
            Already have an account? <a href="/login">Log In</a>
          </p>
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
