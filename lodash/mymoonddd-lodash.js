var mymoonddd = function() {

  function chunk(array, size = 1) {
      let result = []
      for (let i = 0; i < array.length;) {
          let group = []
          for (let j = 0; j < size; j++) {
              group.push(array[i])
              i++
              if (i == array.length) {
                  break
              }
          }
          result.push(group)
      }
      return result
  }

  function compact(array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
        if (array[i]) {
            result.push(array[i])
        }
    }
    return result
  }

  function drop(array, n = 1) {
      let result = []
      if (n < array.length) {
          for (let i = n; i < array.length; i++) {
              if (array[i]) {
                  result.push(array[i])
              }
          }
      }
      return result
  }

  function dropRight(array, n = 1) {
      let result = []
      let len = array.length
      if (n < len) {
          for (let i = 0; i < len - n ; i++) {
              if (array[i]) {
                  result.push(array[i])
              }
          }
      }
      return result
  }

  function fill(array, value, start = 0, end = array.length) {
      for (let i = start; i < end; i++) {
          array[i] = value
      }
      return array
  }

  function flatten(array) {
      let result = []
      for (let i = 0; i < array.length; i++) {
          if (Array.isArray(array[i])) {
              for (let j = 0; j < array[i].length; j++) {
                  result.push(array[i][j])
              }
          } else {
              result.push(array[i])
          }
      }
      return result
  }

  function fromPairs(pairs) {
    let result = {}
    for (let i = 0; i < pairs.length; i++) {
        result[pairs[i][0]] = pairs[i][1]
    }
    return result
  }

  function head(array) {
    return array[0]
  }

  function indexOf(array, value, fromIndex=0) {
    if (fromIndex < 0) {
      fromIndex += array.length
    }
    for (let i = fromIndex; i < array.length; i++) {
      if (array[i] == value) {
        return i
      }
    }
    return -1
  }

  function initial(array) {
    let len = array.length - 1
    let res = Array(len)
    for (let i = 0; i < len; i++) {
      res[i] = array[i]
    }
    return res
  }

  function take(array, n=1) {
    if (n < 1) {
      return []
    }
    let len = n < array.length ? n : array.length 
    let res = Array(len)
    for (let i = 0; i < len; i++) {
      res[i] = array[i]
    }
    return res
  }

  function takeRight(array, n=1) {
    if (n < 1) {
      return []
    }
    let len = array.length
    let start = len > n ? len - n : 0
    let res = []
    for (let i = start; i < len; i++) {
      res.push(array[i])
    }
    return res
  }

  function tail(array) {
    let len = array.length - 1
    let res = Array(len)
    for (let i = 1; i < len + 1; i++) {
      res[i - 1] = array[i]
    }
    return res
  }

  function join(array, separator=',') {
    let result = ""
    for (let i = 0; i < array.length; i++) {
      if (i == array.length - 1) {
        result += array[i]
      } else {
        result += "" + array[i] + separator
      }
    }
    return result
  }

  function last(array) {
    return array[array.length - 1]
  }

  function lastIndexOf(array, value, fromIndex=array.length-1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] == value) {
        return i
      }
    }
    return -1
  }

  function reverse(array) {
    let n = array.length
    let result = Array(n)
    for (let i = 0; i < n; i++) {
      result[n - i - 1] = array[i]
    }
    return result
  }

  function uniq(array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      let p = array[i]
      if (!(result.includes(p))) {
        result.push(p)
      }
    }
    return result
  }

  function without(array, ...values) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      let p = array[i]
      if (!values.includes(p)) {
        result.push(p)
      }
    }
    return result
  }

  function zip() {
    let n = arguments.length
    let m = arguments[0].length
    let result = Array(m)
    for (let i = 0; i < m; i++) {
      let inner = []
      for (let j = 0; j < n; j++) {
        inner[j] = arguments[j][i]
      }
      result[i] = inner
    }
    return result
  }

  function sample(collection) {
    let random = Infinity
    while (random > collection.length - 1) {
      random = Math.floor(10 * Math.random())
    }
    return collection[random]
  }

  function size(collection) {
    if (typeof(collection) == "boolean") {
      return 0
    }
    if (typeof(collection) == "number") {
      return 0
    }
    if (typeof(collection) == "string") {
      let i = 0
      while (collection[i]) {
        i++
      }
      return i
    }
    if (Array.isArray(collection)) {
      return collection.length
    }
    if (typeof(collection) == "object") {
      let count = 0
      for (let i in collection) {
        count ++
      }
      return count
    }
  }

  function isBoolean(value) {
    return value === true || value === false
  }

  function ceil(number, precision=0) {
    let x = 10 ** ( -precision )
    let remain = number % x
    if (!remain) {
      return number
    }
    return (number - remain) + x
  }

  function max(array) {
    let max = array[0]
    for (let i = 1; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i]
      }
    }
    return max
  }

  function sum(array) {
    let sum = array[0]
    for (let i = 1; i < array.length; i++) {
        sum += array[i]
    }
    return sum
  }

  function repeat(string='', n=1) {
    if (!n) {
      return ''
    }
    let result = string
    for (let i = 1; i < n; i++) {
      result += string
    }
    return result
  }

  function range(start=0, end, step=1) {
    let result = []
    let len = 0
    if (arguments.length == 1) {
      end = start
      start = 0
      if (end < 0) {
        step = -1
      }
    }
    if (step) {
      len = (end - start) / step
    } else {
      len = end - start
    }

    for (let count = 0, i = start; count < len; count++, i += step) {
      result.push(i)
    }

    return result
  }

  function difference(array, ...values) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      let exist = false
      for (let j = 0; j < values.length; j++) {
        if (values[j].includes(array[i])) {
          exist = true
          break
        } 
      }
      if (!exist) {
        result.push(array[i])
      }
    }
    return result
  }

  function flattenDeep(array) {
  let result = []
  flatten(array)
  return result  

  function flatten(array) {
      for (let i = 0; i < array.length; i++) {
        let p = array[i]
        if (Array.isArray(p)) {
          p = flatten(p)
        } 
        if (p) {
          result.push(p)
        }
      }
    }
  }

  function flattenDepth(array, depth=1) {

    while (depth > 0) {
      let temp = []
      for (let i = 0; i < array.length; i++) {
          if (Array.isArray(array[i])) {
              for (let j = 0; j < array[i].length; j++) {
                  temp.push(array[i][j])
              }
          } else {
              temp.push(array[i])
          }
      }
      array = temp 
      depth--
    }
    return array

  }

  function concat(array, ...values) {
    for (let i = 0; i < values.length; i++){
      if (Array.isArray(values[i])) {
        for (let j = 0; j < values[i].length; j++) {
          array.push(values[i][j])
        }
      } else {
        array.push(values[i])
      }
    }
    return array
  }

  function toArray(value) {
    if (value === null) {
      return []
    }
    if (value.length) {
      var array = Array(value.length)
      for (let i = 0; i < value.length; i++) {
        array[i] = value[i]
      }
      return array
    }
    if (typeof(value) == 'object') {
      var array = []
      for (let item in value) {
        array.push(value[item])
      }
      return array
    }
    return []
  }

  function nth(array, n=0) {
    if (n < 0) {
      n = array.length + n
    }
    return array[n]
  }

  function intersection(...arrays) {

    let result = []
    let comp = arrays[0]
    for (let i = 0; i < comp.length; i++) {
      let hasItem = true
      for (let j = 1; j < arrays.length; j++) {
        if (!arrays[j].includes(comp[i])) {
          hasItem = false
          break
        }
      }
      if (hasItem == true) {
        result.push(comp[i])
      }
    }
    return result
  }

  function pull(array, ...values) {
      let len =  array.length
      for (let i = len - 1; i >= 0; i--) {
        if (values.includes(array[i])) {
          swap(array, i, array.length - 1)
          array.pop()
        }
      }
      return array

      function swap(array, i, j) {
        let t = array[i]
        array[i] = array[j]
        array[j] = t
        return array
      }
  } 
  
  function pullAll(array, values) {
    let len =  array.length
    for (let i = len - 1; i >= 0; i--) {
      if (values.includes(array[i])) {
        swap(array, i, array.length - 1)
        array.pop()
      }
    }
    return array

    function swap(array, i, j) {
      let t = array[i]
      array[i] = array[j]
      array[j] = t
      return array
    }
  }

  function remove(array, predicate) {
    let removed = []
    let len =  array.length
    for (let i = len - 1; i >= 0; i--) {
      if (predicate(array[i])) {
        swap(array, i, array.length - 1)
        removed.unshift(array.pop())
      }
    }
    return removed

    function swap(array, i, j) {
      let t = array[i]
      array[i] = array[j]
      array[j] = t
      return array
    }
  }

  function mapValues(obj, mapper) {
    if (arguments.length == 1) {
      return obj
    }
    if (typeof(mapper) != "function") {
      let val = mapper
      mapper = key => key[val]
    }
    let result = {}
    for (let key in obj) {
      result[key] = mapper(obj[key]) 
    }
    return result
  }

  // function negate(f) {
  //   return function(...args){
  //     return !f(...args)
  //   }
  // }





  return {
    chunk: chunk,
    compact: compact,
    drop: drop,
    dropRight: dropRight,
    fill: fill,
    flatten: flatten,
    fromPairs: fromPairs,
    head: head,
    indexOf: indexOf,
    initial: initial,
    join: join,
    last: last,
    lastIndexOf: lastIndexOf,
    reverse: reverse,
    uniq: uniq,
    without: without,
    zip: zip,
    size: size,
    isBoolean: isBoolean,
    ceil: ceil,
    max: max,
    sum: sum,
    repeat: repeat,
    range: range,
    difference: difference,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    concat: concat,
    toArray: toArray,
    nth: nth,
    intersection: intersection,
    pull: pull,
    pullAll: pullAll,
    remove: remove,
    tail: tail,
    take: take,
    takeRight: takeRight,
    mapValues: mapValues,

  }
}()