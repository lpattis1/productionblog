import * as React from "react";
import PreviewCard from "../components/PreviewCard";
import type { IBlog } from "../utils/types";
import BlogBody from "../components/BlogBody";

const Home: React.FC<HomeProps> = (props) => {
  const [blogs, setBlogs] = React.useState<IBlog[]>([]);

  React.useEffect(() => {
    (async () => {
      const res = await fetch("/api/blogs");
      const blogs = await res.json();
      setBlogs(blogs);
    })();
  }, []);

  return (
    <>
      <BlogBody>
        <div className="home-container p-5">
          <section className="row">
            {blogs.map((blog) => (
              <PreviewCard key={`blog-preview-${blog.id}`} blog={blog} />
            ))}
          </section>
        </div>
      </BlogBody>
    </>
  );
};

interface HomeProps {}

export default Home;
