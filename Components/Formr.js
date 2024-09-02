import { useState } from "react";
import React from "react";

export default function Formr() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null); // State for submission status
  const [error, setError] = useState(""); // State for validation error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "message" && e.target.value.length >= 100) {
      setError(""); // Clear validation error if the message is long enough
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (formData.message.length < 50) {
      setError("The message must be at least 50 characters long.");
      return;
    }

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
                <div className="col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="name">Your Name</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className={`form-control ${
                              error ? "is-invalid" : ""
                            }`}
                            placeholder="Leave a message here"
                            id="message"
                            name="message"
                            style={{ height: "150px" }}
                            value={formData.message}
                            onChange={handleChange}
                            required
                          ></textarea>
                          <label htmlFor="message">Review</label>
                          {error && (
                            <div className="invalid-feedback">{error}</div>
                          )}
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
    </>
  );
}
