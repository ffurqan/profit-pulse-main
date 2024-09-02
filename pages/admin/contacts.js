import Head from "next/head";
import Header from "@/Components/Header";
import Script from "next/script";
import Footer from "@/Components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Home() {
  const [forms, setforms] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  useEffect(() => {
    const auth = Cookies.get("adminAuth");
    if (auth !== "loggedIn") {
      router.push("login"); // Redirect to login page if not authenticated
    } else {
      fetchForms(); // Fetch forms if authenticated
    }
  }, []);

  const fetchForms = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setforms(data.data);
    } catch (error) {
      setforms(["failed to fetch"]);
    } finally {
      setIsLoading(false); // Stop loading after data is fetched
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com/" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com/"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600&amp;family=Nunito:wght@600;700;800&amp;display=swap"
        rel="stylesheet"
      />
      <link
        href="/cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="/cdn.jsdelivr.net/npm/bootstrap-icons%401.4.1/font/bootstrap-icons.css"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/css/style.css" />
      <link href="/lib/animate/animate.min.css" rel="stylesheet" />
      <link
        href="/lib/owlcarousel/assets/owl.carousel.min.css"
        rel="stylesheet"
      />
      <link href="/css/bootstrap.min.css" rel="stylesheet" />
      <link href="/css/style.css" rel="stylesheet" />
      <Header />
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-lg-8 text-center">
              <h1 className="display-4 text-white animated slideInDown">
                ADMINS ONLY - CONTACT
              </h1>
              <h5 className="text-white fs-4 animated slideInDown">
                SEE CONTACT FORMS SUBMITTED BY PEOPLE!
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              FORMS
            </h6>
            <h1 className="mb-5">Contact Forms</h1>
          </div>
          {isLoading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            forms.map((elem) => (
              <div
                className="mb-5 center flex"
                style={{ justifyContent: "center", display: "flex" }}
              >
                <div className="" data-wow-delay="0.1s">
                  <div
                    className="service-item pt-3 h-100"
                    style={{ width: "1272px" }}
                  >
                    <div className="p-4">
                      <h5 className="mb-3">Name : {elem.name}</h5>
                      <h5 className="mb-3" style={{ color: "black" }}>
                        Email : {elem.email}
                      </h5>
                      <h5 className="mb-3" style={{ color: "grey" }}>
                        Subject : {elem.subject}
                      </h5>
                      <h5 style={{ color: "black" }}>
                        MESSAGE : {elem.message}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            ))
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
