import { MikroORM } from "@mikro-orm/core";

// import { Post } from "./entities/Post";

import microOrmConfig from "./mikro-orm.config";
import sqlite3 from "sqlite3";
import homeDir from "os";

export const ormMain = async () => {
  const orm = await MikroORM.init(microOrmConfig);
  orm.getMigrator().up();

  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();

  // const get = await orm.em.find(Post, {});
  // console.log(get);
};

export const initSQLite = () => {
  try {
    sqlite3.verbose();
    const db = new sqlite3.Database(
      `${homeDir.homedir()}/Desktop/frey-SQL-test.db`,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (_err) => {
        // do your thing
      }
    );
    db.close();
  } catch (error) {
    console.error("Creating Database: Error", error);
  }
};
