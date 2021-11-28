import React from "react";

const BlogBody = (props: any) => {
  return (
    <div className="blog-body mb-4">
      <div className="container-blog-body container">{props.children}</div>
    </div>
  );
};

export default BlogBody;
