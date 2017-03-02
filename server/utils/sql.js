/**
 * 生成SQL语句
 */

const util = require('./util')

/**
 * 根据参数生成SQL插入语句
 *
 * @param table 表名（字符串）
 * @param record 要插入的记录行（对象）【字段名=>值...】
 * @param updatefields 要更新的字段（数组），更新方式是直接给字段赋值，【字段名1，字段名2...】
 * @param changefields 要更新的字段（对象），更新方式是在原字段值基础上追加，【字段名=>追加值...】
 * @return 返回sql插入语句（字符串）
 */
export function insert(table, record, updatefields = [], changefield = {}) {
  let sql = `INSERT INTO ${table} (`
  sql += Object.keys(record).join(', ')
  sql += ") VALUES("
  sql += Object.values(record).map(v => `'${util.escapeSql(v)}'`).join(', ')
  sql += ")"

  //在插入记录的时候先判断记录是否存在(唯一索引或主键)，如果不存在则插入，否则更新
  if (!util.isEmpty(updatefields) || !util.isEmpty(changefield)) {
    sql += " ON DUPLICATE KEY UPDATE "

    sql += updatefields.map(v => `${v}='${util.escapeSql(record[v])}'`).join(', ')
    // or
    let flag = 0
    for (let k in changefield) {
      let v = changefield[k]
      if (util.isNumber(v)) {
        sql += `${flag == 0 ? "" : ", "}${k}=${k}${v >= 0 ? "+" : ""}${v}`
      } else {
        sql += `${flag == 0 ? "" : ", "}${k}=CONCAT(${k},'${util.escapeSql(v)}')`
      }
      flag = 1
    }
  }

  return sql
}

/**
 * 向同一个表批量插入大量数据的时候，用这个函数效率高
 *
 * @param table 表名（字符串）
 * @param records 要插入的多行记录（对象数组）【【字段名=>值...】...】
 * @return 返回sql多行插入语句（字符串）
 * @see #insert()
 */
export function insertMore(table, records) {
  let sql = `INSERT INTO ${table} (`
  sql += Object.keys(records[0]).join(', ')
  sql += ") VALUES"

  for (let record of records) {
    sql += "("
    sql += Object.values(record).map(v => `'${util.escapeSql(v)}'`).join(', ')
    sql += "),"
  }

  sql = util.trim(sql, ",")

  return sql
}

/**
 * 根据参数生成SQL更新语句
 *
 * @param table 表名（字符串）
 * @param updatefields 要更新的字段（对象），更新方式是直接给字段赋值，【字段名=>值...】
 * @param where 删除条件（对象），只判断相等条件，其他条件请用exwhere参数 【键=>值...】
 * @param changefields 要更新的字段（对象），更新方式是在原字段值基础上追加，【字段名=>追加值...】
 * @param exwhere 扩展条件（字符串），不含"where"关键字
 * @return 返回sql更新语句（字符串）
 */
export function update(table, updatefield, where, changefield = {}, exwhere = '') {
  let sql = `UPDATE ${table} SET `
  let flag = 0
  for (let k in updatefield) {
    let v = updatefield[k]
    sql += `${flag == 0 ? "" : ", "}${k}='${util.escapeSql(v)}'`
    flag = 1
  }

  flag = 0
  for (let k in changefield) {
    let v = changefield[k]
    if (util.isNumber(v)) {
      sql += `${flag == 0 ? "" : ","} ${k}=${k}${v >= 0 ? "+" : ""}${v}`
    } else {
      sql += `${flag == 0 ? "" : ","} ${k}=CONCAT(${k},'${util.escapeSql(v)}')`
    }
    flag = 1
  }

  flag = 0
  for (let k in where) {
    let v = where[k]
    sql += `${flag == 0 ? " WHERE " : " AND "}${k}='${util.escapeSql(v)}'`
    flag = 1
  }

  if (exwhere.length > 0) {
    sql += (flag == 0 ? " WHERE " : " AND ") + exwhere
  }

  return sql
}

/**
 * 根据参数生成SQL查询语句
 *
 * @param table 表名（字符串）
 * @param fields 要查询的字段（数组），【字段名1，字段名2...】
 * @param where 删除条件（对象），只判断相等条件，其他条件请用exwhere参数 【键=>值...】
 * @param exwhere 扩展条件（字符串），不含"where"关键字
 * @param other 其他语句（字符串），如limit、order by、group by等 一般不建议使用
 * @return 返回sql删除语句（字符串）
 */
export function select(table, fields, where, exwhere = "", other = "") {
  let sql = `SELECT ${fields.join(", ")} FROM ${table}`
  let flag = 0

  for (let k in where) {
    let v = where[k]
    sql += `${flag == 0 ? " WHERE " : " AND "}${k}='${util.escapeSql(v)}'`
    flag = 1
  }

  if (exwhere.length > 0) {
    sql += (flag == 0 ? " WHERE " : " AND ") + exwhere
  }

  if (other.length > 0) {
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
 * @param record 要插入或替换的记录行（对象）【字段名=>值...】
 * @return 返回sql替换语句（字符串）
 */
export function replace(table, record) {
  let sql = `REPLACE INTO ${table} (`
  sql += Object.keys(record).join(', ')
  sql += ") VALUES("
  sql += Object.values(record).map(v => `'${util.escapeSql(v)}'`).join(', ')
  sql += ")"

  return sql
}

/**
 * 向同一个表批量插入或替换大量数据的时候，用这个函数效率高
 *
 * @param table 表名（字符串）
 * @param records 要插入或替换的多行记录（对象数组）【【字段名=>值...】...】
 * @return 返回sql多行插入或替换语句（字符串）
 * @see #replace()
 */
export function replaceMore(table, records) {
  let sql = `REPLACE INTO ${table} (`
  sql += Object.keys(records[0]).join(', ')
  sql += ") VALUES"

  for (let record of records) {
    sql += "("
    sql += Object.values(record).map(v => `'${util.escapeSql(v)}'`).join(', ')
    sql += "),"
  }

  sql = util.trim(sql, ",")

  return sql
}

/**
 * 根据参数生成SQL删除语句
 *
 * @param table 表名（字符串）
 * @param where 删除条件（对象），只判断相等条件，其他条件请用exwhere参数 【键=>值...】
 * @param exwhere 扩展条件（字符串），不含"where"关键字
 * @return 返回sql删除语句（字符串）
 */
export function delete(table, where, exwhere = "") {
  let sql = `DELETE FROM ${table}`
  let flag = 0

  for (let k in where) {
    let v = where[k]
    sql += `${flag == 0 ? " WHERE " : " AND "}${k}='${util.escapeSql(v)}'`
    flag = 1
  })

  if (exwhere.length > 0) {
    sql += (flag == 0 ? " WHERE " : " AND ") + exwhere
  }

  return sql
}
