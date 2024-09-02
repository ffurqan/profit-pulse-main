import React, { useEffect, useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setReviews(data.data);
      } catch (error) {
        setReviews(["failed to fetch"]);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div
      className="container-xxl wow fadeInUp"
      data-wow-delay="0.1s"
      style={{ paddingTop: "15rem", paddingBottom: "8rem" }}
    >
      <div className="container">
        <div className="text-center">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Reviews
          </h6>
          <h1 className="mb-5">Feedback From Our Customers</h1>
        </div>
        <div className="owl-carousel testimonial-carousel position-relative">
          {reviews.length > 0 ? (
            reviews.map((elem) => (
              <div key={elem._id} className="testimonial-item text-center">
                <i className="bi bi-person-circle fa-4x text-primary"></i>
                <h5 className="mb-0">{elem.name}</h5>
                <div className="testimonial-text bg-light text-center p-4">
                  <p className="mb-0">{elem.message}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="testimonial-item text-center">
              <i className="bi bi-person-circle fa-4x text-primary"></i>
              <h5 className="mb-0">No Reviews Found</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
