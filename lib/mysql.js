let mysql = require('mysql'),
  conf = require('../config/conf.json');


// let users = require('./users')

const pool = mysql.createPool({
  host: conf.mysql.host,
  user: conf.mysql.user,
  password: conf.mysql.password,
  database: conf.mysql.database
});


let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err)
        reject(err)
      else {
        conn.query(sql, values, (err, rows) => {
          if (err)
            reject(err)
          else {
            resolve(rows)
          }
          conn.release();
        })
      }
    })
  })
}


let users = `
  create table if not exists users(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(100) NOT NULL,
   pass VARCHAR(100) NOT NULL,
   avator VARCHAR(100) NOT NULL,
   moment VARCHAR(100) NOT NULL,
   PRIMARY KEY ( id )
 )ENGINE=InnoDB DEFAULT CHARSET=utf8;
`

let posts =
  `create table if not exists posts(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '文章作者',
     title TEXT(0) NOT NULL COMMENT '题目',
     content TEXT(0) NOT NULL COMMENT '内容',
     uid VARCHAR(40) NOT NULL COMMENT '用户id',
     moment VARCHAR(100) NOT NULL COMMENT '发表时间',
     pv VARCHAR(40) NOT NULL DEFAULT '0' COMMENT '浏览量',
     avator VARCHAR(100) NOT NULL COMMENT '用户头像',
     status INT NOT NULL COMMENT '文章状态  0 正常   1 已删除',
     PRIMARY KEY(id)
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;`


let createTable = (sql) => {
  return query(sql, [])
};

//建表
createTable(users);
createTable(posts);
//sql处理
// users(query);
//注册用户
exports.insertUser = (value) => {
  let _sql = 'insert into users set name=?,pass=?,avator=?,moment=?;'
  return query(_sql, value)
}


//查询用户是否已存在
exports.findUserByName = (name) => {
  let _sql = `select * from users where name='${name}';`
  return query(_sql, name)
}

//用户登录
exports.signUser = (user, pwd) => {
  let _sql = `select * from users where name='${user}' and pass='${pwd}';`;
  return query(_sql, user, pwd);
}


//插入文章
exports.insertPost = (value) => {
  let _sql = `insert into posts set name=?,title=?,content=?,uid=?,moment=?,pv=?,avator=?,status=?;`;
  return query(_sql, value);
}

//查询单篇文章
exports.findPostsById = (id) => {
  let _sql = `select * from posts where id = ${0};`;
  return query(_sql, id);
}
//查询所有文章
exports.findPosts = () => {
  let _sql = 'select * from posts;';
  return query(_sql);
}

//删除文章
exports.deletePostsById = (id) => {
  let _sql = `update posts set status=1 where id=${id};`;
  return query(_sql, id);
}

// module.exports = {
//   insertUser: insertUser,
//   findUserByName: findUserByName
// }
