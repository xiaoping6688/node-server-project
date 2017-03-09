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
CREATE USER 'test'@'127.0.0.1' IDENTIFIED BY '*A0E2521E77EA33EF451BF2D1025F30B925D8F2F2';
GRANT SELECT,INSERT,UPDATE,DELETE ON `db_test`.* TO 'test'@'127.0.0.1';

-- --------------------------------------------------------

--
-- 表结构 前缀b(branch)表示分表，前缀s(single)表示单表
--

/*--------------------------------------------------------------------------*
  NAME: 用户帐号表 - 变化频繁
 *--------------------------------------------------------------------------*/
CREATE TABLE b_account_0 (
  uid INT UNSIGNED NOT NULL                               COMMENT '用户ID',
  gold INT UNSIGNED DEFAULT 0                             COMMENT '金币',

  ext VARCHAR(255) DEFAULT ''                             COMMENT '扩展字段',
  ctime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP      COMMENT '创建时间',
  PRIMARY KEY(uid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*--------------------------------------------------------------------------*
  NAME: 用户帐号基本信息表 - 变化不频繁
 *--------------------------------------------------------------------------*/
CREATE TABLE b_account2_0 (
  uid INT UNSIGNED NOT NULL                               COMMENT '用户ID',
  realname VARCHAR(20) NOT NULL                           COMMENT '姓名',
  nickname VARCHAR(40) DEFAULT ''                         COMMENT '昵称',
  gender TINYINT DEFAULT 0                                COMMENT '性别',
  avatar VARCHAR(255) DEFAULT ''                          COMMENT '头像',
  birthday DATE                                           COMMENT '生日',
  phone VARCHAR(11) DEFAULT ''                            COMMENT '电话',
  email VARCHAR(45) DEFAULT ''                            COMMENT '邮箱',
  wechat VARCHAR(40) DEFAULT ''                           COMMENT '微信',
  qq VARCHAR(20) DEFAULT ''                               COMMENT 'QQ',
  province VARCHAR(20) DEFAULT ''                         COMMENT '省份',
  city VARCHAR(20) DEFAULT ''                             COMMENT '城市',
  address VARCHAR(255) DEFAULT ''                         COMMENT '住址',
  ext VARCHAR(255) DEFAULT ''                             COMMENT '扩展字段',
  ctime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP      COMMENT '创建时间',
  PRIMARY KEY(uid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*--------------------------------------------------------------------------*
  NAME: 来源渠道
 *--------------------------------------------------------------------------*/
CREATE TABLE s_origin_channel (
  id INT NOT NULL AUTO_INCREMENT                          COMMENT '渠道ID',
  name VARCHAR(40) NOT NULL                               COMMENT '名称',
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
