import { Router } from "express";
import db from "../db";

const router = Router();

// GET /api/blogs/1?
router.get("/:blogid?", async (req, res) => {
  const blogid = Number(req.params.blogid);

  try {
    if (blogid) {
      const [blog] = await db.blogs.one(blogid);
      res.json(blog);
    } else {
      const blogs = await db.blogs.all();
      res.json(blogs);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "my code sucks!", error });
  }
});

// POST /api/blogs/
// Request Body { title: string, content: string }
router.post("/", async (req, res) => {
  const newBlog = req.body;
  newBlog.authorid = 1; // because eventually, whoever is logged in will replace this!

  try {
    const result = await db.blogs.insert(newBlog);
    res.json({ msg: "blog created", id: result.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "my code sucks!", error });
  }
});

// PUT /api/blogs/1
// Request Body { title?: string, content?: string }
router.put("/:blogid", async (req, res) => {
  const blogid = Number(req.params.blogid);
  const editedBlog = req.body;

  try {
    const result = await db.blogs.update(editedBlog, blogid);
    res.json({
      msg: `blog ${blogid} edited`,
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "my code sucks!", error });
  }
});

// DELETE /api/blogs/1
router.delete("/:blogid", async (req, res) => {
  const blogid = Number(req.params.blogid);

  try {
    const result = await db.blogs.destroy(blogid);
    res.json({
      msg: `blog ${blogid} destroyed`,
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "my code sucks!", error });
  }
});

export default router;
