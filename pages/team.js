import Head from "next/head";
// import Image from "next/image";
// import styles from "../css/style.css";
import Header from "@/Components/Header";
import Script from "next/script";
import Footer from "@/Components/Footer";
import { getSession } from "next-auth/react"; // Import getSession for authentication check

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
                Our Team
              </h1>
              <h5 className="text-white fs-4 animated slideInDown">
                We are proud to introduce you to our team
              </h5>
              <p className="fs-6 text-white mb-4 pb-2">
                Team performance is the driving force behind our success, where
                each member’s dedication harmonizes to achieve excellence and
                propel us towards our goals
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Meet Our Leadership
            </h6>
            <h1 className="mb-5">Team</h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="team-item bg-light">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="img/team-3.jpg" alt="" />
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Mark Willson</h5>
                  <small>CEO</small>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="team-item bg-light">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="img/team-1.jpg" alt="" />
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Binyamin Khan</h5>
                  <small>COUNTRY HEAD</small>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="team-item bg-light">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="img/team-4.jpg" alt="" />
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Bisma</h5>
                  <small>HR</small>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="team-item bg-light">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="img/team-2.jpg" alt="" />
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Maria</h5>
                  <small>Trainer</small>
                </div>
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
    props: {},
  };
}
