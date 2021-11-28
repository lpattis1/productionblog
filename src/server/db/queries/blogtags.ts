import { Query } from "../index";

const retrieve = (blogid: number) => Query("CALL spBlogTags(?)", [blogid]);
const insert = (blogid: number, tagid: number) =>
  Query("INSERT INTO blogtags (blogid, tagid) VALUES(?, ?)", [blogid, tagid]);

export default {
  retrieve,
  insert,
};
