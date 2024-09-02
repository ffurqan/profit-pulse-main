import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie"; // Importing js-cookie
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Script from "next/script";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [submissionStatus, setSubmissionStatus] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 200) {
        Cookies.set("adminAuth", "loggedIn", { expires: 7 }); // Set the cookie
        setSubmissionStatus("submitted");
        router.push("/admin/dashboard"); // Redirect to the admin-only page
      } else {
        setSubmissionStatus("error");
      }
    } catch (err) {
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
          </form>
          {submissionStatus === "submitted" && (
            <div className="mt-4 text-success">
              <i className="fa fa-check-circle me-2"></i>
              <span>You are now logged in! Redirecting...</span>
            </div>
          )}
          {submissionStatus === "error" && (
            <div className="mt-4 text-danger">
              <i className="fa fa-exclamation-circle me-2"></i>
              <span>Invalid username or password.</span>
            </div>
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
