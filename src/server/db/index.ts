import * as mysql from "mysql";
import config from "../config";

const pool = mysql.createPool(config.mysql);

export const Query = <T = any>(query: string, values?: any) => {
  return new Promise<T>((resolve, reject) => {
    const sql = mysql.format(query, values);

    pool.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

import blogs from "./queries/blogs";
import blogtags from "./queries/blogtags";

export default {
  blogs,
  blogtags,
};
