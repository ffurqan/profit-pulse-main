import React from "react";

const Footer = () => {
  return (
    <>
      <div
        className="container-fluid bg-dark text-light footer pt-3 mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-4 col-md-6">
              <a href="/" className="d-flex ">
                <img src="/img/logoo.png" alt="" className="me-3 w-50 h-50" />
              </a>
              <p>
                Enhance your freelancing journey with Income – a solution that
                simplifies project management and payments. Experience the ease
                of smart automation, beautifully crafted invoices, swift
                proposals, and a user-friendly dashboard, making accounting both
                effortless and enjoyable. Work intelligently, not strenuously.
              </p>
            </div>
            <div className="col-lg-2 col-md-6">
              <h4 className="text-white mb-3">Quick Link</h4>
              <a className="btn btn-link" href="/">
                Home
              </a>
              <a className="btn btn-link" href="about">
                About Us
              </a>
              <a className="btn btn-link" href="team">
                Our Team
              </a>
              <a className="btn btn-link" href="services">
                Services
              </a>
              <a className="btn btn-link" href="contact">
                Contact Us
              </a>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Contact</h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3"></i>Sector J DHA Phase
                6,Lahore
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3"></i>
                Realprofitpuls22@gmail.com
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3"></i>+923000437061
              </p>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Gallery</h4>
              <div className="row g-2 pt-2">
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-1.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-2.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-3.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-2.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-3.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-1.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col text-center text-md-start mb-3 mb-md-0">
                &copy; Copyright 2024 |{" "}
                <a className="border-bottom" href="/">
                  ProfitPuls
                </a>{" "}
                | All Right Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
