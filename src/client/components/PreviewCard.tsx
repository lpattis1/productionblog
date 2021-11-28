import * as React from "react";
import * as moment from "moment";
import { Link } from "react-router-dom";
import type { IBlog } from "../utils/types";

const PreviewCard: React.FC<PreviewCardProps> = ({ blog }) => {
  return (
    <div className="col-12">
      <article id="blog-post" className="card my-2">
        <div className="card-body text-center blog-post-body">
          <h4 className="card-title blog-post-title mt-3">{blog.title}</h4>
          <img src={blog.img} alt="" className="blog-post-img" />
          <p className="card-text blog-post-author  mb-2">{blog.name}</p>
          <hr />
          <p className=" mt-4 card-text post-text-preview mb-4">
            {blog.content.substring(0, 125)}
          </p>

          <div className="d-flex align-items-center flex-column justify-content-center">
            <span className="text-muted posted-date mb-4">
              <span className="posted-on">Posted on:</span>{" "}
              {moment(blog._created).format("MMM Do, YYYY")}
            </span>
            <Link
              className="btn post-btn btn-sm btn-primary mb-3"
              to={`/details/${blog.id}`}
            >
              Read More!
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

interface PreviewCardProps {
  blog: IBlog;
}

export default PreviewCard;

{
  /* <Link className="btn btn-sm btn-primary" to={`/details/${blog.id}`}>
Read More!
</Link> */
}
