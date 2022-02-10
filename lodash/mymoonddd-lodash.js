var mymoonddd = function() {
  function shorthand(predicate) {
      let val = predicate
      if (typeof(val) == "object") {
        if (Array.isArray(val)) {
          let t = {}
          t[val[0]] = val[1]
          val = t
        }
        predicate = function(it) {
          for (let key in val) {
            var flag = true
            if (val[key] != it[key]) {
              flag = false
              break
            } 
          }
          return flag
        }
      } else {
        predicate = it => it[val]
      }
      // if (typeof(val) == "string") {
      //   for (let i = 0; i < val.length; i++) {
      //     if (val[i] == ".") {
      //       var split = true 
      //     }
      //   }
      //   if (split) {

      //   }
      // }
    return predicate
  }

  function swap(array, i, j) {
    let t = array[i]
    array[i] = array[j]
    array[j] = t
    return array
  }

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

  function uniqBy(array, iteratee) {
    if (typeof(iteratee) != "function") {
      iteratee = shorthand(iteratee)
    }
    let result = []
    let temp = []
    for (let i = 0; i < array.length; i++) {
      let it = iteratee(array[i])
      if (!(temp.includes(it))) {
        temp.push(it)
        result.push(array[i])
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

  function maxBy(array, iteratee) {
    if (typeof(iteratee) != "function") {
      iteratee = shorthand(iteratee)
    }
    let max = iteratee(array[0])
    let maxItem = array[0]
    for (let i = 1; i < array.length; i++) {
      let it = iteratee(array[i])
      if (it > max) {
        max = array[i]
        maxItem = array[i]
      }
    }
    return maxItem
  }

  function min(array) {
    let min = array[0]
    for (let i = 1; i < array.length; i++) {
      if (array[i] < min) {
        min = array[i]
      }
    }
    return min
  }

  function sum(array) {
    let sum = array[0]
    for (let i = 1; i < array.length; i++) {
        sum += array[i]
    }
    return sum
  }

  function sumBy(array, iteratee) {
    if (typeof(iteratee) != "function") {
      iteratee = shorthand(iteratee)
    }
    let sum = iteratee(array[0])
    for (let i = 1; i < array.length; i++) {
      let it = iteratee(array[i])
      sum += it
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
    let res = []
    for (let i = 0; i < array.length; i++) {
      res.push(array[i])
    }
    for (let i = 0; i < values.length; i++){
      if (Array.isArray(values[i])) {
        for (let j = 0; j < values[i].length; j++) {
          res.push(values[i][j])
        }
      } else {
        res.push(values[i])
      }
    }
    return res
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
    array = removed
    return array

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

  function map(collection, iteratee) {
    if (typeof(iteratee) != "function") {
      iteratee = shorthand(iteratee)
    }
    let res = []
    for (let key in collection) {
      res.push(iteratee(collection[key]))
    }
    return res
  }

  function partition(collection, predicate) {
    if (typeof(predicate) != "function") {
      predicate = shorthand(predicate)
    }

    let T = []
    let F = []
    let res = [T, F]
    
    for (let key in collection) {
      let item = collection[key]
      predicate(item, key, collection) ? T.push(item) : F.push(item)
    }
    return res
  }

  function reduce(collection, iteratee, accumulator) {
    let result = accumulator ?? 0
    for (let key in collection) {
      let it = collection[key]
      result = iteratee(result, it, key)
    }
    return result
  }

  function reduceRight(collection, iteratee, accumulator) {
    // 仅考虑了collection为数组的情况
    if (collection.length) {
      let result = accumulator 
      let len = collection.length
      for (let i = len - 1; i >= 0; i--) {
        let it = collection[i]
        result = iteratee(result, it, i)
      }
      return result
    }
  }

  function reject(collection, predicate) {
    if (typeof(predicate) != "function") {
      predicate = shorthand(predicate)
    }

    let res = []
    for (let key in collection) {
      let it = collection[key]
      if (!predicate(it, key, collection)) {
        res.push(it)
      } 
    }
    return res
  }

  function some(collection, predicate) {
    if (typeof(predicate) != "function") {
      predicate = shorthand(predicate)
    }
    for (let key in collection) {
      let it = collection[key]
      if (predicate(it, key, collection)) {
        return true
      }
    }
    return false
  }

  // function negate(f) {
  //   return function(...args){
  //     return !f(...args)
  //   }
  // }

  function every(collection, predicate) {
    if (typeof(predicate) != "function") {
      predicate = shorthand(predicate)
    }
    for (let key in collection) {
      let it = collection[key]
      if (!predicate(it, key, collection)) {
        return false
      }
    }
    return true
  }

  function filter(collection, predicate) {
   if (typeof(predicate) != "function") {
      predicate = shorthand(predicate)
    }
    let res = []
    for (let key in collection) {
      let item = collection[key]
      if (predicate(item, key, collection)) {
        res.push(item)
      }
    }
    return res
  }

  function find(collection, predicate, fromIndex=0)  {
    if (typeof(predicate) != "function") {
      predicate = shorthand(predicate)
    }
    if (collection.length) {
      let len = collection.length
      if (fromIndex < 0) {
        fromIndex = len + fromIndex
      }
      for (let i = fromIndex; i < len; i++) {
        let item = collection[i]
        if (predicate(item, i, collection)) {
          return item
        }
      }
    }
    for (let key in collection) {
      let item = collection[key]
      if (predicate(item)) {
        return item
      }
    }
  }

  function findIndex(array, predicate, fromIndex=0) {
    if (typeof(predicate) != "function") {
      predicate = shorthand(predicate)
    }
    let len = array.length
    if (fromIndex < 0) {
      fromIndex = len + fromIndex
    }
    for (let i = fromIndex; i < len; i++) {
      let item = array[i]
      if (predicate(item, i, array)) {
        return i
      }
    }
    return -1
  }

  function findLastIndex(array, predicate, fromIndex=array.length-1) {
    if (typeof(predicate) != "function") {
      predicate = shorthand(predicate)
    }
    let len = array.length
    if (fromIndex < 0) {
      fromIndex = len + fromIndex
    }
    if (fromIndex > len - 1) {
      fromIndex = len - 1 
    }
    for (let i = fromIndex; i >= 0; i--) {
      let item = array[i]
      if (predicate(item, i, array)) {
        return i
      }
    }
    return -1
  }

  function forEach(collection, iteratee) {
    if (collection.length) {
      for (let i = 0; i < collection.length; i++) {
        let it = collection[i]
        iteratee(it, i, collection)
      }
    } else {
      for (let key in collection) {
        let it = collection[key]
        iteratee(it, key, collection)
      }
    }
    return collection
  }

  function shuffle(collection) {
    // 仅考虑了collection为数组时的情况
    let len = collection.length - 1
    while (len > 1) {
      i = len
      let j = Math.round(Math.random() * len)
      swap(collection, i, j)
      i-- 
      len-- 
    }
    return collection
  }

  function countBy(collection, iteratee) {
    if (typeof(iteratee) != "function") {
      iteratee = shorthand(iteratee)
    }
    let result = {}
      for (let key in collection) {
        let it = iteratee(collection[key])
        if (!(it in result)) {
          result[it] = 0
        }
        result[it]++
      }
      return result
  }

  function groupBy(collection, iteratee) {
    if (typeof(iteratee) != "function") {
      iteratee = shorthand(iteratee)
    }
    let result = {}
    for (let key in collection) {
      let it = iteratee(collection[key])
      if (!(it in result)) {
        result[it] = []
      }
      result[it].push(collection[key])
    }
    return result
  }

  function keyBy(array, iteratee) {
    if (typeof(iteratee) != "function") {
      iteratee = shorthand(iteratee)
    }
    let result = {}
    for (let i in array) {
      let it = iteratee(array[i])
      result[it] = array[i]
    }
    return result
  }

  function dropRightWhile(array, predicate) {
    if (typeof(predicate) != "function") {
      predicate = shorthand(predicate)
    }
    let len = array.length - 1
    while (len > -1) {
      let it = predicate(array[len], len, array) 
      if (!it) {
        return array
      }
      array = initial(array)
      len--
    }
  }

  function dropWhile(array, predicate) {
    if (typeof(predicate) != "function") {
      predicate = shorthand(predicate)
    }
    let len = array.length - 1
    while (len > -1) {
      let it = predicate(array[0], 0, array) 
      if (!it) {
        return array
      }
      array = tail(array)
      len--
    }
  }

  function add(augend, addend) {
    return augend + addend
  }

  function xor(...arrays) {
    let res = []
    let set = concat(...arrays)
    if (arrays) {
      for (let i = 0; i < set.length; i++) {
        var hasAll = true
        for (let j = 0; j < arrays.length; j++) {
          if (!arrays[j].includes(set[i])) {
            hasAll = false
            break
          }
        }
        if (!hasAll)
        res.push(set[i])
      }
    }
    return res
  } 

  function isArray(value) {
    return Array.isArray(value)
  }

  function isArrayLike(value) {
    if ( value.length ) {
      return true
    }
    return false
  }

  function isArrayLikeObject(value) {
    if ( typeof(value) == 'object' && value.length ) {
      return true
    }
    return false
  }

  function isBoolean(value) {
    return Object.prototype.toString.call(value) == '[object Boolean]'
  }

  function isDate(value) {
    return Object.prototype.toString.call(value) == '[object Date]'
  }

  function isFunction(value) {
    return Object.prototype.toString.call(value) == '[object Function]'
  }

  function isInteger(value) {
    if (value == Infinity || value == -Infinity) {
      return false
    }
    if (Object.prototype.toString.call(value) == '[object Number]') {
      return value == Math.floor(value)
    }
    return false
  }

  function isNumber(value) {
    return Object.prototype.toString.call(value) == '[object Number]'
  }

  function isObject(value) {
    while (value) {
      if (typeof(value) == 'object') {
        return true
      }
      value = value.prototype
    }
    return false
  }

  function isObjectLike(value) {
    if (value) {
      if (typeof(value) == 'object') {
        return true
      }
    }
    return false
  }

  function isString(value) {
    return Object.prototype.toString.call(value) == '[object String]'
  }

  return {
    xor: xor,
    add: add,
    dropRightWhile: dropRightWhile,
    dropWhile: dropWhile,
    countBy: countBy,
    groupBy: groupBy,
    keyBy: keyBy,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    forEach: forEach,
    shuffle: shuffle,
    every: every,
    filter: filter,
    find: find,
    map: map,
    partition: partition,
    reduce: reduce,
    reduceRight: reduceRight,
    reject: reject,
    some: some,
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
    uniqBy: uniqBy,
    without: without,
    zip: zip,
    size: size,
    isBoolean: isBoolean,
    ceil: ceil,
    min: min,
    max: max,
    maxBy: maxBy,
    sum: sum,
    sumBy: sumBy,
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
    isArray: isArray,
    isArrayLike: isArrayLike,
    isArrayLikeObject: isArrayLikeObject,
    isBoolean: isBoolean,
    isDate: isDate,
    isFunction: isFunction,
    isInteger: isInteger,
    isNumber: isNumber,
    isObject: isObject,
    isObjectLike: isObjectLike,
    isString: isString,
  }
}()