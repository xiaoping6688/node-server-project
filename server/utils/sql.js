/**
 * 生成SQL语句
 */

var util = require('./util')

/**
 * 根据参数生成SQL插入语句
 *
 * @param table 表名（字符串）
 * @param record 要插入的记录行（数组）【字段名=>值...】
 * @param updatefields 要更新的字段（数组），更新方式是直接给字段赋值，【字段名1，字段名2...】
 * @param changefields 要更新的字段（数组），更新方式是在原字段值基础上追加，【字段名=>追加值...】
 * @return 返回sql插入语句（字符串）
 */
export function insert(table, record, updatefields = [], changefields = []) {
  let sql = `INSERT INTO ${table} (`
  let flag = 0

  record.forEach(function (v, k) {
    sql += (flag == 0 ? "" : ", ") + k
    flag = 1
  })

  sql += ") VALUES("

  flag = 0
  record.forEach(function (v) {
    sql += (flag == 0 ? "'" : ", '") + util.escapeSql(v) + "'"
    flag = 1
  })

  sql += ")"

  //在插入记录的时候先判断记录是否存在(唯一索引或主键)，如果不存在则插入，否则更新
  if (updatefields || changefields) {
    sql += " ON DUPLICATE KEY UPDATE"

    flag = 0
    updatefields.forEach(function (v) {
      sql += (flag == 0 ? " " : ", ") + v + "='" + util.escapeSql(record[v]) + "'"
      flag = 1
    })

    changefields.forEach(function (v, k) {
      if (util.isNumber(v)) {
        sql += (flag == 0 ? " " : ", ") + k + "=" + k + (v >= 0 ? "+" : "") + v
      } else {
        sql += (flag == 0 ? " " : ", ") + k + "=CONCAT(" + k + ",'" + util.escapeSql(v) + "')"
      }
      flag = 1
    })
  }

  return sql
}

/**
 * 向同一个表批量插入大量数据的时候，用这个函数效率高
 *
 * @param table 表名（字符串）
 * @param records 要插入的多行记录（数组）【【字段名=>值...】...】
 * @return 返回sql多行插入语句（字符串）
 * @see #insert()
 */
export function insertMore(table, records) {
  let tmpArr = records[0]

  let sql = `INSERT INTO ${table} (`
  let flag = 0

  tmpArr.forEach(function (v, k) {
    sql += (flag == 0 ? "" : ", ") + k
    flag = 1
  })

  sql += ") VALUES"

  records.forEach(function (varr) {
    flag = 0
    sql += "("
    varr.forEach(function (v) {
      sql += (flag == 0 ? "'" : ", '") + util.escapeSql(v) + "'"
      flag = 1
    })
    sql += "),"
  })

  sql = util.trim(sql, " ,")

  return sql
}

/**
 * 根据参数生成SQL更新语句
 *
 * @param table 表名（字符串）
 * @param updatefields 要更新的字段（数组），更新方式是直接给字段赋值，【字段名=>值...】
 * @param where 删除条件（数组），只判断相等条件，其他条件请用exwhere参数 【键=>值...】
 * @param changefields 要更新的字段（数组），更新方式是在原字段值基础上追加，【字段名=>追加值...】
 * @param exwhere 扩展条件（字符串），不含"where"关键字
 * @return 返回sql更新语句（字符串）
 */
export function update(table, updatefields, where, changefields = [], exwhere = '') {
  let sql = `UPDATE ${table} SET`
  let flag = 0

  updatefields.forEach(function (v, k) {
    sql += (flag == 0 ? " " : ", ") + k + "='" + util.escapeSql(v) + "'"
    flag = 1
  })

  changefields.forEach(function (v, k) {
    if (util.isNumber(v)) {
      sql += `${flag == 0 ? "" : ","} ${k}=${k}${v >= 0 ? "+" : ""}${v}`
      flag = 1
    } else {
      sql += `${flag == 0 ? "" : ","} ${k}=CONCAT(${k},'${util.escapeSql(v)}')`
      flag = 1
    }
  })

  flag = 0
  where.forEach(function (v, k) {
    sql += (flag == 0 ? " WHERE " : " AND ") + k + "='" + util.escapeSql(v) + "'"
    flag = 1
  })

  if (exwhere.length != 0) {
    sql += (flag == 0 ? " WHERE " : " AND ") + exwhere
  }

  return sql
}

/**
 * 根据参数生成SQL查询语句
 *
 * @param table 表名（字符串）
 * @param fields 要查询的字段（数组），【字段名1，字段名2...】
 * @param where 删除条件（数组），只判断相等条件，其他条件请用exwhere参数 【键=>值...】
 * @param exwhere 扩展条件（字符串），不含"where"关键字
 * @param other 其他语句（字符串），如limit、order by、group by等 一般不建议使用
 * @return 返回sql删除语句（字符串）
 */
export function select(table, fields, where, exwhere = "", other = "") {
  let sql = `SELECT ${fields.join(", ")} FROM ${table}`
  let flag = 0

  where.forEach(function (v, k) {
    sql += (flag == 0 ? " WHERE " : " AND ") + k + "='" + util.escapeSql(v) + "'"
    flag = 1
  })

  if (exwhere.length != 0) {
    sql += (flag == 0 ? " WHERE " : " AND ") + exwhere
  }

  if (other.length != 0) {
    sql += " " + other
  }

  return sql
}

/**
 * <pre>
 * 根据参数生成SQL替换语句
 * REPLACE的运行与INSERT很相像。只有一点除外，如果表中的一个旧记录与一个用于PRIMARY KEY或一个UNIQUE索引的新记录具有相同的值，则在新记录被插入之前，旧记录被删除。
 * 注意，除非表有一个PRIMARY KEY或UNIQUE索引，否则，使用一个REPLACE语句没有意义。该语句会与INSERT相同，因为没有索引被用于确定是否新行复制了其它的行。
 * </pre>
 *
 * @param table 表名（字符串）
 * @param record 要插入或替换的记录行（数组）【字段名=>值...】
 * @return 返回sql替换语句（字符串）
 */
export function replace(table, array record) {
  let sql = `REPLACE INTO ${table} (`
  let flag = 0

  record.forEach(function (v, k) {
    sql += (flag == 0 ? "" : ", ") + k
    flag = 1
  })

  sql += ") VALUES("

  flag = 0
  record.forEach(function (v) {
    sql += (flag == 0 ? "'" : ", '") + util.escapeSql(v) + "'"
    flag = 1
  })

  sql += ")"

  return sql
}

/**
 * 向同一个表批量插入或替换大量数据的时候，用这个函数效率高
 *
 * @param table 表名（字符串）
 * @param records 要插入或替换的多行记录（数组）【【字段名=>值...】...】
 * @return 返回sql多行插入或替换语句（字符串）
 * @see #replace()
 */
export function replaceMore(table, array records) {
  let tmpArr = records[0]

  let sql = `REPLACE INTO ${table} (`
  let flag = 0

  tmpArr.forEach(function (v, k) {
    sql += (flag == 0 ? "" : ", ") + k
    flag = 1
  })

  sql += ") VALUES"

  records.forEach(function (varr) {
    flag = 0
    sql += "("
    varr.forEach(function (v) {
      sql += (flag == 0 ? "'" : ", '") + util.escapeSql(v) + "'"
      flag = 1
    })
    sql += "),"
  })

  sql = util.trim(sql, " ,")

  return sql
}

/**
 * 根据参数生成SQL删除语句
 *
 * @param table 表名（字符串）
 * @param where 删除条件（数组），只判断相等条件，其他条件请用exwhere参数 【键=>值...】
 * @param exwhere 扩展条件（字符串），不含"where"关键字
 * @return 返回sql删除语句（字符串）
 */
export function delete(table, where, exwhere = "") {
  let sql = `DELETE FROM ${table}`
  let flag = 0

  where.forEach(function (v, k) {
    sql += (flag == 0 ? " WHERE " : " AND ") + k + "='" + util.escapeSql(v) + "'"
    flag = 1
  })

  if (exwhere.length != 0) {
    sql += (flag == 0 ? " WHERE " : " AND ") + exwhere
  }

  return sql
}
