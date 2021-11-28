import * as React from "react";
import * as moment from "moment";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { IBlog } from "../utils/types";
import type { ITag } from "../utils/types";
import BlogBody from "../components/BlogBody";

const Details: React.FC<DetailsProps> = (props) => {
  const { blogid } = useParams();
  const [blog, setBlog] = React.useState<IBlog>(null);
  const [blogtags, setBlogTags] = React.useState<ITag[]>([]);
  const navigator = useNavigate();

  React.useEffect(() => {
    (async () => {
      const res = await fetch(`/api/blogs/${blogid}`);
      const blog = await res.json();
      setBlog(blog);
    })();
  }, []);

  return (
    <>
      <BlogBody>
        <section className="row p-5">
          <div className="col-12">
            <article id="details-card" className="card bg-dark my-2">
              <div className="card-body mt-5 d-flex flex-column justify-content-center align-items-center details-body">
                <h1 className="card-text details-title text-center">
                  {blog?.title}
                </h1>
                <h6 className="card-text mt-2 text-center text-muted mb-4">
                  by{" "}
                  <span className="details-user">
                    <b>{blog?.name}</b>
                  </span>{" "}
                  on <i>{moment(blog?._created).format("MMM Do, YYYY")}</i>
                </h6>

                <div className="tags-container mb-5 d-flex flex-wrap justify-content-center align-items-center">
                  <small className="tags-title mx-2 mb-2">Tags:</small>
                  <span className="badge tag-badge-solid mx-1 mb-2">Post</span>
                  <span className="badge tag-badge-outline mx-1 mb-2">
                    Thoughts
                  </span>
                </div>
                <img
                  src={blog?.img}
                  alt="blog image"
                  className="details-img img-fluid m-auto"
                />

                <div className="card-text mt-5 mb-3 details-content text-center px-md-5">
                  {blog?.content.split("\n").map((para, i) => (
                    <p className="blog-post-content" key={`p-block-${i}`}>
                      {para}
                    </p>
                  ))}
                </div>
                <div className="mx-md-5 mb-3 mt-3 d-flex justify-content-between align-items-center">
                  <Link className="btn back-btn" to="/">
                    Back to Blogs
                  </Link>
                  <Link className="btn edit-btn" to={`/edit/${blogid}`}>
                    Edit Blog
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      </BlogBody>
    </>
  );
};

interface DetailsProps {}

export default Details;
