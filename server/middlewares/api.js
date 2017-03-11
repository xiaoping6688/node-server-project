/**
 * res.api middleware
 *
 * @output
 *
 * {
 *   "data": {},
 *   "status": {
 *     "code": 0,
 *     "msg": "success"
 *   }
 * }
 *
 *
 * @usage
 *
 * return res.api(data)
 * return res.api_error(err)
 *
 * return res.api(500, err, {
 *   code: 1,
 *   msg: 'delete failed!'
 * })
 *
 * return res.api(null, {
 *   code: 10000,
 *   msg: 'delete failed!'
 * })
 *
 */

// API 基本状态码
const API_SUCCESS_CODE = 0
const API_ERROR_CODE = -1

module.exports = function (req, res, next) {
  // set api header
  // res.setHeader('Access-Control-Allow-Origin', '*')
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')

  res.api = api
  res.api_error = api_error

  next()
}

function api() {
  var _res = this

  if (typeof(_res) != "object" && _is_not_has_prototype('end')) {
    arguments = []
    console.dir('not a object')
  }

  if (arguments.length == 1) {
    var http_code = 200
    var api_data = arguments[0]
    var api_status = {
      code: API_SUCCESS_CODE,
      msg: 'success'
    }

    return _api(http_code, api_data, api_status)

  } else if (arguments.length == 2) {
    var http_code = 200
    var api_data = arguments[0]
    var api_status = arguments[1]

    return _api(http_code, api_data, api_status)

  } else if (arguments.length == 3) {
    var http_code = arguments[0]
    var api_data = arguments[1]
    var api_status = arguments[2]

    return _api(http_code, api_data, api_status)

  } else {
    var http_code = 200
    var api_data = {}
    var api_status = {
      code: -2,
      msg: 'res.api params error or res is not a express.response object!'
    }

    return _api(http_code, api_data, api_status)
  }

  function _is_not_has_prototype(name) {
    console.dir(_res)
    return !_res.hasOwnProperty(name) && (name in _res)
  }

  function _api (http_code, data, status) {
    if (_res.is_jsonp && _res.is_jsonp == true) {
      return _res.status(http_code).jsonp({
        data: data,
        status: status
      })
    } else {
      return _res.status(http_code).json({
        data: data,
        status: status
      })
    }
  }
}

function api_error(data){
  var _res = this
  var _error_code = 200
  var _error_status_code = API_ERROR_CODE
  var _error_status_msg = 'api error'

  if (_res.api_error_code) {
    _error_code = _res.api_error_code
  }

  if (_res.api_error_status_code) {
    _error_status_code = _res.api_error_status_code
  }

  if (_res.api_error_status_msg) {
    _error_status_msg = _res.api_error_status_msg
  }

  _res.api(_error_code, data, {
    code: _error_status_code,
    msg: _error_status_msg
  })
}
