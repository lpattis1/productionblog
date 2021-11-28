import * as React from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import BlogBody from "../components/BlogBody";
import { BsFillPencilFill } from "react-icons/bs";
import { BsChatTextFill } from "react-icons/bs";
import { BsFillEmojiSmileFill } from "react-icons/bs";

const Edit: React.FC<EditProps> = (props) => {
  const navigator = useNavigate();
  const { blogid } = useParams();
  const [title, setTitle] = React.useState("");
  const [name, setName] = React.useState("");
  const [img, setImg] = React.useState("");
  const [content, setContent] = React.useState("");

  React.useEffect(() => {
    (async () => {
      const res = await fetch(`/api/blogs/${blogid}`);
      const blog = await res.json();
      setTitle(blog.title);
      setImg(blog.img);
      setContent(blog.content);
    })();
  }, [blogid]);

  const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/blogs/${blogid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, img }),
    });
    const result = await res.json();
    navigator(`/details/${blogid}`);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/blogs/${blogid}`, {
      method: "DELETE",
    });

    if (res.ok) {
      navigator("/");
    }
  };

  return (
    <>
      <BlogBody>
        <form className="form-group p-5">
          <h2 className="compose-title mb-4">Edit post</h2>
          <div className="title-input-area mb-4 input-group d-flex align-items-center">
            <span className="input-group-text title-icon" id="basic-addon1">
              <BsFillPencilFill className="title-icon-img" />
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control title-input-box"
              placeholder="Edit Title..."
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="name-input-area mb-4 input-group d-flex align-items-center">
            <span className="input-group-text name-icon" id="basic-addon1">
              <BsFillEmojiSmileFill className="name-icon-img" />
            </span>
            <input
              value={img}
              onChange={(e) => setImg(e.target.value)}
              type="text"
              className="form-control name-input-box"
              placeholder="Edit Image..."
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="content-input-area input-group mb-3 d-flex align-items-center">
            <textarea
              className="form-control content-input-box"
              placeholder="Edit blog post..."
              aria-label="With textarea"
              rows={20}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="d-flex mt-4 justify-content-center align-items-center w-100 text-center">
            <button
              onClick={handleEdit}
              className="btn text-center revise-btn d-flex justify-content-center align-items-center mt-3"
            >
              Edit Post!
            </button>

            <button
              onClick={handleDelete}
              className="btn text-center delete-btn d-flex justify-content-center align-items-center mt-3"
            >
              Delete Post!
            </button>
          </div>

          <div className="return-area d-flex justify-content-center align-items-center mt-4 mb-1">
            <Link className="return-link" to={`/details/${blogid}`}>
              Return to blog entry
            </Link>
          </div>
        </form>
      </BlogBody>
    </>
  );
};

interface EditProps {}

export default Edit;
