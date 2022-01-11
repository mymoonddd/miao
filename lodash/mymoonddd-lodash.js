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
    array.length -= 1
    return array
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

  // function flattenDepth(array, depth=1) {

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
    // flattenDepth: ,
  }
}()