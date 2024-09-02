import Head from "next/head";
// import Image from "next/image";
// import styles from "../css/style.css";
import Header from "@/Components/Header";
import Script from "next/script";
import Footer from "@/Components/Footer";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
export default function Home() {
  const refreshPage = () => {
    window.location.reload(); // Refresh the page
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
                Our Services
              </h1>
              <h5 className="text-white fs-4 animated slideInDown">
                We provide a wide range of Services
              </h5>
              <p className="fs-6 text-white mb-4 pb-2">
                Boost your earning with our top-notch services. We make managing
                projects and payments easy for your success.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Services
            </h6>
            <h1 className="mb-5">Our Services</h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item pt-3 h-100">
                <div className="p-4">
                  <i className="bi bi-pencil-square fa-3x text-primary mb-4"></i>
                  <h5 className="mb-3">Assignment work</h5>
                  <p>
                    Our assignment work services are designed to support
                    students in their academic journey, offering a reliable and
                    comprehensive solution to their coursework challenges.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="service-item pt-3 h-100">
                <div className="p-4">
                  <i className="bi bi-file-earmark-medical-fill fa-3x text-primary mb-4"></i>
                  <h5 className="mb-3">Content writing</h5>
                  <p>
                    This service encompass a wide range of content types,
                    including articles, blog posts, website content, and
                    marketing materials.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="service-item pt-3 h-100">
                <div className="p-4">
                  <i className="bi bi-keyboard fa-3x text-primary mb-4"></i>
                  <h5 className="mb-3">Data Entry</h5>
                  <p>
                    Our data entry services specialize in accurately inputting
                    information into databases and spreadsheets, ensuring
                    efficiency and precision.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="service-item pt-3 h-100">
                <div className="p-4">
                  <i className="bi bi-link-45deg fa-3x text-primary mb-4"></i>
                  <h5 className="mb-3">Links sharing</h5>
                  <p>
                    Link-sharing services play a vital role in today's digital
                    landscape, simplifying the sharing of web links among users.
                  </p>
                </div>
              </div>
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
                  className="col-lg-3 col-sm-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="service-item pt-3 h-100">
                    <div className="p-4">
                      <i className="bi bi-pencil-square fa-3x text-primary mb-4"></i>
                      <h5 className="mb-3">{elem.name}</h5>
                      <p>{elem.desc}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="text-center">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Testimonial
            </h6>
            <h1 className="mb-5">Inspiring Testimonials</h1>
          </div>
          <div className="owl-carousel testimonial-carousel position-relative">
            <div className="testimonial-item text-center">
              <i className="bi bi-person-circle fa-4x text-primary"></i>
              <h5 className="mb-0">Malika Rasheeds</h5>
              <p></p>
              <div className="testimonial-text bg-light text-center p-4">
                <p className="mb-0">
                  As a freelancer, this platform has opened doors to a plethora
                  of projects. The straightforward process and timely payments
                  make it my go-to for online earning. Truly satisfied!
                </p>
              </div>
            </div>
            <div className="testimonial-item text-center">
              <i className="bi bi-person-circle fa-4x text-primary"></i>
              <h5 className="mb-0">Saim Jutt</h5>
              <p></p>
              <div className="testimonial-text bg-light text-center p-4">
                <p className="mb-0">
                  I've experienced real financial growth through this platform.
                  The ease of use, coupled with genuine earning potential, makes
                  it a standout choice. Grateful for the opportunities!
                </p>
              </div>
            </div>
            <div className="testimonial-item text-center">
              <i className="bi bi-person-circle fa-4x text-primary"></i>
              <h5 className="mb-0">Ali Raza</h5>
              <p></p>
              <div className="testimonial-text bg-light text-center p-4 h-100">
                <p className="mb-0">
                  Joining this transformative online earning platform has been a
                  game-changer for me. The opportunities are diverse, and the
                  exceptional support is highly recommended!
                </p>
              </div>
            </div>
            <div className="testimonial-item text-center">
              <i className="bi bi-person-circle fa-4x text-primary"></i>
              <h5 className="mb-0">Ali Akhtar</h5>
              <p></p>
              <div className="testimonial-text bg-light text-center p-4">
                <p className="mb-0">
                  This platform's ease of use and genuine earning potential have
                  fueled my financial growth. Grateful for life-changing
                  opportunities that continue to make a significant impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-classNameic d-flex justify-content-center">
        <div
          className="row d-flex align-items-center shadow-lg w-75 p-5"
          style={{ justifyContent: "space-evenly" }}
        >
          <div className="col-md-8">
            <h3 className="text-primary">
              Get to Start your Career? Register Now and start your Journey
            </h3>
            <p className="h6">Check out our options and features included</p>
          </div>
          <div className="col-md-3 d-flex justify-content-center mt-lg-0">
            <a className="btn btn-primary btn-lg p-6" href="contact">
              <span className="align-middle">
                Contact Us<i className="fa fa-arrow-right ms-3"></i>
              </span>
            </a>
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
