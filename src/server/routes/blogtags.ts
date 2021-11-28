import { Router } from "express";
import db from "../db";

const router = Router();

router.get("/:blogid", async (req, res) => {
  const blogid = Number(req.params.blogid);

  try {
    const [blogtags] = await db.blogtags.retrieve(blogid);
    res.json(blogtags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "hey", error });
  }
});

router.post("/api/blogtags", async (req, res) => {
  const newBlogTag = req.body;
  try {
    const result = await db.blogtags.insert(
      newBlogTag.blogid,
      newBlogTag.tagid
    );
    res.json({ msg: "tag inserted", ...result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "hey", error });
  }
});

export default router;
