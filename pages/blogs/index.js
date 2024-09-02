// pages/blogs/index.js
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Script from "next/script";
import { headphones } from "fontawesome";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get("/api/blogs");
      console.log(response);
      setBlogs(response.data.data);
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />

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
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-lg-8 text-center">
              <h1 className="display-4 text-white animated slideInDown">
                BLOG POSTS
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div>
        <section className="blog grid section">
          <div className="container">
            <div className="row">
              {blogs.map((blog) => (
                <div className="col-lg-6 col-md-6 col-12" key={blog._id}>
                  <div className="single-news">
                    <div className="news-head">
                      {blog.images.map((elem, index) => {
                        let uploads = "/uploads/";
                        let imagePath = uploads + elem.split("uploads\\")[1];
                        return (
                          <img
                            key={index}
                            src={imagePath}
                            alt={`Image ${index + 1}`}
                          />
                        );
                      })}
                    </div>
                    <div className="news-body">
                      <div className="news-content">
                        <div className="date">
                          {new Date(blog.updatedAt).toLocaleDateString()}
                        </div>
                        <h2>
                          <a href={`/blogs/${blog._id}`}>{blog.title}</a>
                        </h2>
                        <p
                          className="text"
                          dangerouslySetInnerHTML={{ __html: blog.desc }}
                        ></p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <Script src="/js/jquery.min.js" />
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
};

export default BlogList;

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
