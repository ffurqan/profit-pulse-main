import Head from "next/head";
// import Image from "next/image";
// import styles from "../css/style.css";
import Header from "@/Components/Header";
import Script from "next/script";
import Footer from "@/Components/Footer";
import { getSession } from "next-auth/react";

export default function Home() {
  const refreshPage = () => {
    window.location.reload(); // Refresh the page
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
                About Us
              </h1>
              <h5 className="text-white fs-4 animated slideInDown">
                Welcome to ProfitPuls
              </h5>
              <p className="fs-6 text-white mb-4 pb-2">
                A leading platform dedicated to connecting talented individuals
                with exciting job opportunities.
              </p>
              <a
                href="register"
                className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
              >
                GET STARTED
              </a>
              <a
                href="register"
                className="btn btn-light py-md-3 px-md-5 animated slideInRight"
              >
                Join Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4">
            <div
              className="col-lg-4 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item pt-3 h-100">
                <div className="p-4">
                  <i className="bi bi-pencil-square fa-3x text-primary mb-4"></i>
                  <h5 className="mb-3 fs-4">Our Mission</h5>
                  <p className="text-dark">
                    In the era of Digital Global World we want to make Pakistani
                    youngster worlds number one freelancer online earner.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="service-item pt-3 h-100">
                <div className="p-4">
                  <i className="bi bi-file-earmark-medical-fill fa-3x text-primary mb-4"></i>
                  <h5 className="mb-3 fs-4">Our Vision</h5>
                  <p className="text-dark">
                    In first phase we will train 1,00,000 youngster and teach
                    them skills related to online work. Then to our high skilled
                    workers/trainee we will provide online work as per skills
                    from our regular internaional clients.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="service-item pt-3 h-100">
                <div className="p-4">
                  <i className="bi bi-keyboard fa-3x text-primary mb-4"></i>
                  <h5 className="mb-3 fs-4">Why Us</h5>
                  <p className="text-dark">
                    We can help you develop and execute a clear and strategic
                    roadmap with priorities that are closely linked to your
                    goals to earn online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-6 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ minHeight: "400px" }}
            >
              <div className="position-relative h-100">
                <img
                  className="img-fluid position-absolute w-100 h-100"
                  src="img/about.jpg"
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <h6 className="section-title bg-white text-start text-primary pe-3">
                About Us
              </h6>
              <h1 className="mb-4">Who We Are</h1>
              <h5 className="mb-4">
                A startup powerhouse for more earning & profit!
              </h5>
              <p className="mb-4">
                Work smarter, not harder. Income makes managing your freelancing
                projects and payments simple, fast, and enjoyable. Between smart
                automation, gorgeous invoices, quick proposals, and dead-simple
                dashboard, accounting has never been this easy and simple.
              </p>
              <div className="row gy-2 gx-4 mb-4">
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    Assignment work
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    Content writing
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>Data
                    Entry
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>Links
                    sharing
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    Online work
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    Content writing
                  </p>
                </div>
              </div>
              <a
                className="btn py-3 px-5 mt-2"
                href="about"
                style={{
                  backgroundColor: "orange",
                  borderColor: "orange",
                  color: "white",
                }}
              >
                VIEW MORE<i className="fa fa-arrow-right ms-3"></i>
              </a>
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
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
