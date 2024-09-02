import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import axios from "axios";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Script from "next/script";
import { useEffect, useState } from "react";
// import Reviews from "@/Components/Reviews";
import Formr from "@/Components/Formr";

const BlogPost = ({ session }) => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        const response = await axios.get(`/api/blogs/${id}`);
        setBlog(response.data.data);
      };

      const fetchComments = async () => {
        const response = await axios.get(`/api/comment`, {
          params: { blogId: id },
        });
        setComments(response.data.data);
      };

      fetchBlog();
      fetchComments();
    }
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/comment", {
        blogId: id,
        username,
        content: commentContent,
      });
      setComments([response.data.data, ...comments]);
      setUsername("");
      setCommentContent("");
    } catch (error) {
      console.error("Error submitting comment", error);
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins:200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&amp;display=swap"
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

      <section className="news-single section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="row">
                <div className="col-12">
                  <div className="single-main">
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
                    <h1 className="news-title">
                      <a href="news-single.html">{blog.title}</a>
                    </h1>
                    <div className="meta">
                      <div className="meta-left">
                        <span className="date">
                          <i className="fa fa-clock-o"></i>
                          {new Date(blog.updatedAt).toLocaleDateString()}
                        </span>
                        <span className="date">
                          <i className="fa fa-clock-o"></i>
                          ADMIN
                        </span>
                      </div>
                    </div>
                    <div className="news-text">
                      <p dangerouslySetInnerHTML={{ __html: blog.content }}></p>
                      {/* <div className="image-gallery">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="single-image">
                              <img src="img/blog2.jpg" alt="#" />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="single-image">
                              <img src="img/blog3.jpg" alt="#" />
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                    <div className="blog-bottom">
                      <ul className="social-share">
                        <li className="facebook">
                          <a href="#">
                            <i className="fa fa-facebook"></i>
                            <span>Facebook</span>
                          </a>
                        </li>
                        <li className="twitter">
                          <a href="#">
                            <i className="fa fa-twitter"></i>
                            <span>Twitter</span>
                          </a>
                        </li>
                        <li className="google-plus">
                          <a href="#">
                            <i className="fa fa-google-plus"></i>
                          </a>
                        </li>
                        <li className="linkedin">
                          <a href="#">
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>
                        <li className="pinterest">
                          <a href="#">
                            <i className="fa fa-pinterest"></i>
                          </a>
                        </li>
                      </ul>
                      <ul className="prev-next">
                        <li className="prev">
                          <a href="#">
                            <i className="fa fa-angle-double-left"></i>
                          </a>
                        </li>
                        <li className="next">
                          <a href="#">
                            <i className="fa fa-angle-double-right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {comments.length > 0 ? (
                  <div className="col-12">
                    <div className="blog-comments">
                      <h2>All Comments</h2>
                      {comments.map((comment) => (
                        <div className="comments-body">
                          <div className="single-comments">
                            <div className="main">
                              <div className="body">
                                <h4>{comment.username}</h4>
                                <div className="comment-meta">
                                  <span className="meta">
                                    <i className="fa fa-calendar"></i>
                                    {new Date(
                                      blog.updatedAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <p>{comment.content}</p>
                                <a href="#">
                                  <i className="fa fa-reply"></i>replay
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>No comments yet. Be the first to comment!</p>
                )}
                <div className="col-12">
                  <div className="comments-form">
                    <h2>Leave Comments</h2>
                    <form className="form" onSubmit={handleCommentSubmit}>
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-12">
                          <div className="form-group">
                            <i className="fa fa-user"></i>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Full Name"
                              required="required"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group message">
                            <i className="fa fa-pencil"></i>
                            <textarea
                              name="subject"
                              id="subject"
                              rows="7"
                              placeholder="Type Your Message Here"
                              value={commentContent}
                              onChange={(e) =>
                                setCommentContent(e.target.value)
                              }
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group button">
                            <button type="submit" className="btn primary">
                              <i className="fa fa-send"></i>Submit Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default BlogPost;

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
