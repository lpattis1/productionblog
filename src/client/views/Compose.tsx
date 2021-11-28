import * as React from "react";
import { useNavigate } from "react-router-dom";
import BlogBody from "../components/BlogBody";
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { BsFillTagsFill } from "react-icons/bs";
import type { ITag } from "../utils/types";

const Compose: React.FC<ComposeProps> = (props) => {
  const navigator = useNavigate();
  const [title, setTitle] = React.useState("");
  const [img, setImg] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, img }),
    });

    const blogResult = await res.json();

    navigator(`/details/${blogResult.id}`);
  };

  return (
    <>
      <BlogBody>
        <form className="form-group p-5">
          <h2 className="compose-title mb-4">Create a post</h2>
          <div className="title-input-area mb-4 input-group d-flex align-items-center">
            <span className="input-group-text title-icon" id="basic-addon1">
              <BsFillPencilFill className="title-icon-img" />
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control title-input-box"
              placeholder="Enter Title..."
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
              placeholder="Enter Image..."
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="content-input-area input-group mb-3 d-flex align-items-center">
            <textarea
              className="form-control content-input-box"
              placeholder="Write a new blog post..."
              aria-label="With textarea"
              rows={20}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="d-flex justify-content-center align-items-center w-100 text-center">
            <button
              onClick={handleSubmit}
              className="btn text-center blog-btn d-flex justify-content-center align-items-center mt-3"
            >
              Write It!
            </button>
          </div>
        </form>
      </BlogBody>
    </>
  );
};

interface ComposeProps {}

export default Compose;
