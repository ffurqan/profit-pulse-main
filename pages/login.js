import { signIn } from "next-auth/react";
import { useState } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Script from "next/script";
import Cookies from "js-cookie";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username: formData.username,
      password: formData.password,
    });

    if (result.error) {
      setSubmissionStatus("error");
    } else {
      setSubmissionStatus("submitted");
      Cookies.set("username", formData.username, { expires: 7 });
      window.location.href = "/"; // Redirect after successful login
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

      <div className="container login-container">
        <div className="card login-card">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
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
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p className="text-center mt-3">
              Forgot Password? <a href="/recover-password">Click Here</a>
            </p>
          </form>
          {submissionStatus === "submitted" && (
            <div className="mt-4 text-success">
              <i className="fa fa-check-circle me-2"></i>
              <span>You are now logged in!</span>
            </div>
          )}
          {submissionStatus === "error" && (
            <div className="mt-4 text-danger">
              <i className="fa fa-exclamation-circle me-2"></i>
              <span>Invalid username or password.</span>
            </div>
          )}

          <h6 className="or-btn">OR</h6>

          <button
            type="button"
            className="login-with-google-btn"
            onClick={() => signIn("google")}
          >
            Continue With Google
          </button>
          <p className="text-center mt-3">
            Don't have an account? <a href="/register">Register</a>
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
