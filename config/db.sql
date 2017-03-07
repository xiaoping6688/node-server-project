-- MySQL数据库，需管理员权限导入

--
-- 数据库：db_test
-- 编码：utf8
--
DROP DATABASE IF EXISTS `db_test`;
CREATE DATABASE `db_test` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `db_test`;

--
-- 授权：本地连接，增删改查
-- 帐号：test 密码：*** (SELECT PASSWORD('***');)
--
GRANT SELECT,INSERT,UPDATE,DELETE ON `db_test`.* TO 'test'@'127.0.0.1' IDENTIFIED BY PASSWORD '*A0E2521E77EA33EF451BF2D1025F30B925D8F2F2';

-- --------------------------------------------------------

--
-- 表结构 前缀b(branch)表示分表，前缀s(single)表示单表
--

/*--------------------------------------------------------------------------*
  NAME: test “用户帐号表” -变化频繁
 *--------------------------------------------------------------------------*/
CREATE TABLE b_test_account_0 (
  uid int unsigned NOT NULL                               COMMENT '用户id',

  ctime timestamp NOT NULL DEFAULT 0,     -- 创建时间
  PRIMARY KEY(uid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*--------------------------------------------------------------------------*
  NAME: test “用户帐号表” -变化不频繁
 *--------------------------------------------------------------------------*/
CREATE TABLE b_test_account2_0 (
  uid int NOT NULL DEFAULT '0',       -- 用户uid

  ctime timestamp NOT NULL DEFAULT 0,     -- 创建时间
  primary key(uid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*--------------------------------------------------------------------------*
  NAME: test “商品表”
 *--------------------------------------------------------------------------*/
CREATE TABLE s_test_goods (
  goodsid int not null auto_increment,    -- 商品id
  classid int not null default 0,     -- 商品分类

  primary key(goodsid),
  key(classid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
