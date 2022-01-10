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
        result += array[i] + separator
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
  }

}()