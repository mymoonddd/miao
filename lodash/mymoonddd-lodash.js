var mymoonddd = function() {
  
  // 辅助型函数

  function identity(...values) {
    return values[0]
  }

  function isEqual(value, other) {
    /**
     * This method supports comparing:
     * 
     * arrays, array buffers, booleans, 
     * date objects, error objects, maps, 
     * numbers, Object objects, regexes, 
     * sets, strings, symbols, and typed arrays.
     * 
     * 仅实现了:
     * arrays, booleans, objects. strings, numbers
     */
    let typeValue = Object.prototype.toString.call(value)
    let typeOther = Object.prototype.toString.call(other)
    if (typeValue !== typeOther) {
      return false
    }
    if (typeValue == '[object Object]') {
      return isEqualObject(value, other)
    }
    if (typeValue == '[object Array]') {
      return isEqualArray(value, other)
    }
    return value == other
  
    function isEqualObject(value, other) {
      for (let key in value) {
        if (!isEqual(value[key],other[key])) {
          return false
        }
      }
      for (let key in other) {
        if (!isEqual(value[key],other[key])) {
          return false
        }
      }
      return true
    }
  
    function isEqualArray(value, other) {
      if (value.length != other.length) {
        return false
      }
      for(let i in value) {
        if (!isEqual(value[i], other[i])) {
          return false
        }
      }
      return true
    }
  }

  function isMatch(object, source) {
    if (typeof(source) !== 'object') {
      return false
    }
    let len = 0
    for (let key in source) {
      if (!isEqual(object[key],source[key])) {
        return false
      }
    }
    return true
  }

  function matches(source) {
    return function(obj) {
       return isMatch(obj, source)
    }
  }

  function matchesProperty(path, srcValue) {
    path = toPath(path)

    return function(obj) {
        for (let prop of path) {
          obj = obj[prop]
        }
        return obj === srcValue
    }
  }

  function property(path) {
    path = toPath(path)
    return function(obj) {
      for (let prop of path) {
        obj = obj[prop]
      }
      return obj
    }
  }

  function toPath(value) {
    if (Array.isArray(value))  {
      return value
    }
    let path = []
    if (typeof value == 'string') {
      parsePart()
      return path 
    }

    function parsePart() {
      let str = ''
      for (let i = 0; i < value.length; i++) {
        if (value[i] == '.' || value[i] == '[' || value[i] == ']') {
          if (str != '') path.push(str)
          str = ''
        } else {
          str += value[i]
        }
      }
      if (str != '') path.push(str)
    }
  }

  function split(string='', separator, limit = Infinity) {
    let res = []
    let str = ''
    for (let i = 0; i < string.length; i++) {
      if (string[i] == separator) {
        if (str != '') res.push(str)
        str = ''
      } else {
        str += string[i]
      }
      if (res.length == limit) {
        break
      }
    }
    if (res.length < limit && str !== '') {
      res.push(str)
    }
    return res
  }

  function Iteratee(func=identity) {
    let funcType = Object.prototype.toString.call(func)
    if (funcType == '[object Function]') {
      return func
    } else if (funcType == '[object String]') {
      return func = property(func)
    } else if (funcType == '[object Array]') {
      return func = matchesProperty(func[0], func[1])
    } else if (funcType == '[object Object]') {
      return func = matches(func)
    }
    return identity(func)
  }
  
  function get(object, path, defaultValue = 'default') {
    let value = object
    path = toPath(path)
    try {
      for (let prop of path) {
        value = value[prop]
      }
    } catch(e) {
      if (e instanceof TypeError) {
        return defaultValue
      } else {
        throw e
      }
    }
    return value
  }

  //实用型函数

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
      return flattenDepth(array)
  }

  function flattenDeep(array) {
    return flattenDepth(array, Infinity)
  }

  function flattenDepth(array, depth=1) {
    let res = array
    let temp = []
    while (true) {
      let hasArray = false
      for (let i of res) {
        if (isArray(i)) {
          temp.push(...i)
          hasArray = true
        } else {
          temp.push(i)
        }
      }
      res = temp
      temp = []
      depth--
      if (depth == 0 || hasArray == false) {
        break
      }
    }
    return res
  }

  function flatMap(collection, iteratee=identity) {
    return flatMapDepth(collection, iteratee)
  }

  function flatMapDeep(collection, iteratee=identity) {
    return flatMapDepth(collection, iteratee, Infinity)
  }

  function flatMapDepth(collection, iteratee=identity, depth=1) {
    iteratee = Iteratee(iteratee)
    let res = []
    for (let key in collection) {
      res.push(iteratee(collection[key]))
    }
    return flattenDepth(res,depth)
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
    let res = []
    for (let i = 0; i < array.length - 1; i++) {
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
    let res = []
    for (let i = 1; i < array.length; i++) {
      res.push(array[i])
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
    let map = {}
    for (let i of array) {
      if (map[i] === undefined) {
        result.push(i)
        map[i] = true
      }
    }
    return result
  }

  function uniqBy(array, iteratee = identity) {
    iteratee = Iteratee(iteratee)
    let result = []
    let map = {}
    for (let i in array) {
      let item = iteratee(array[i], i, array)
      if (map[item] == undefined) {
        map[item] = true
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

  function zip(...args) {
    let res = []
    for (let i in args[0]) {
      inner = []
      for (let j in args) {
        inner[j] = args[j][i]
      }
      res.push(inner)
    }
    return res
  }

  function unzip(array) {
    let res = []
    for (let i in array[0]) {
      let inner = []
      for (let j in array) {
        inner[j] = array[j][i]
      }
      res.push(inner)
    }
    return res
  }

  function sample(collection) {
    let random = Infinity
    while (random > collection.length - 1) {
      random = Math.floor(10 * Math.random())
    }
    return collection[random]
  }

  function size(collection) {
    if (collection.length) {
      return collection.length
    }    
    if (typeof(collection) == "boolean") {
      return 0
    }
    if (typeof(collection) == "number") {
      return 0
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

  function round(number, precision=0) {
    let x = 10 ** ( -precision )
    let remain = number % x
    if (!remain) {
      return number
    } else if (remain / x < 0.5) {
      return (number - remain)
    } else {
      return (number - remain) + x
    }
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

  function maxBy(array, iteratee=identity) {
    iteratee = Iteratee(iteratee)
    let max = iteratee(array[0])
    let maxItem = array[0]
    for (let i = 1; i < array.length; i++) {
      let it = iteratee(array[i], i, array)
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

  function sumBy(array, iteratee=identity) {
    iteratee = Iteratee(iteratee)
    let sum = iteratee(array[0])
    for (let i = 1; i < array.length; i++) {
      let it = iteratee(array[i], i, array)
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

  function concat(array, ...values) {
    let res = slice(array)
    values.forEach(it => {
      if (isArray(it)) {
        res.push(...it)
      } else {
        res.push(it)
      }
    })
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

  function remove(array, predicate=identity) {
    let removed = []
    let len =  array.length
    for (let i = len - 1; i >= 0; i--) {
      if (predicate(array[i], i, array)) {
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

  function map(collection, iteratee=identity) {
    iteratee = Iteratee(iteratee)
    let res = []
    for (let key in collection) {
      res.push(iteratee(collection[key], key, collection))
    }
    return res
  }

  function partition(collection, predicate=identity) {
    predicate = Iteratee(predicate)

    let T = []
    let F = []
    let res = [T, F]
    
    for (let key in collection) {
      let item = collection[key]
      predicate(item, key, collection) ? T.push(item) : F.push(item)
    }
    return res
  }

  function reduce(collection, iteratee=identity, accumulator) {
    let result = accumulator ?? 0
    for (let key in collection) {
      let it = collection[key]
      result = iteratee(result, it, key)
    }
    return result
  }

  function reduceRight(collection, iteratee=identity, accumulator) {
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

  function reject(collection, predicate=identity) {
    predicate = Iteratee(predicate)
    let res = []
    for (let key in collection) {
      it = collection[key]
      if (!predicate(it, key, collection)) {
        res.push(it)
      } 
    }
    return res
  }

  function some(collection, predicate=identity) {
    predicate = Iteratee(predicate)
    for (let key in collection) {
      it = collection[key]
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

  function every(collection, predicate=identity) {
    predicate = Iteratee(predicate)
    for (let key in collection) {
      if (!predicate(collection[key], key, collection)) {
        return false
      }
    }
    return true
  }

  function find(collection, predicate=identity, fromIndex=0)  {
    predicate = Iteratee(predicate)
    if (collection.length) {   //数组
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
    for (let key in collection) { //对象
      if (predicate(collection[key], key, collection)) {
        return collection[key]
      }
    }
  }

  function findKey (object, predicate=identity)  {
    predicate = Iteratee(predicate)
    for (let key in object) { //对象
      if (predicate(object[key], key, object)) {
        return key
      }
    }
  }

  function findIndex(array, predicate=identity, fromIndex=0) {
    predicate = Iteratee(predicate)
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

  function findLastIndex(array, predicate=identity, fromIndex=array.length-1) {
    predicate = Iteratee(predicate)
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

  function forEach(collection, iteratee=identity) {
    for (let key in collection) {
      iteratee(collection[key], key, collection)
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

  function countBy(collection, iteratee = identity) {
    iteratee = Iteratee(iteratee)
    let result = {}
      for (let key in collection) {
        let it = iteratee(collection[key] , key, collection)
        if (result[it] === undefined) {
          result[it] = 0
        }
        result[it]++
      }
      return result
  }

  function groupBy(collection, iteratee=identity) {
    iteratee = Iteratee(iteratee)
    let result = {}
    for (let key in collection) {
      let it = iteratee(collection[key], key, collection)
      if (result[it] === undefined) {
        result[it] = []
      }
      result[it].push(collection[key])
    }
    return result
  }

  function keyBy(array, iteratee=identity) {
    iteratee = Iteratee(iteratee)
    let result = {}
    for (let i in array) {
      let it = iteratee(array[i], i, array)
      result[it] = array[i]
    }
    return result
  }

  function dropRightWhile(array, predicate=identity) {
    predicate = Iteratee(predicate)
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

  function dropWhile(array, predicate=identity) {
    predicate = Iteratee(predicate)
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


  // function xor(...arrays) {

  //   let result = []
  //   let ary = arrays[0]
  //   let others = flatten(tail(arrays))
  //   let intersect = intersection(ary,others)

  //   arrays = flatten(arrays) 
  //   for (let i of arrays) {
  //     if (!intersect.includes(i)) {
  //       result.push(i)
  //     }
  //   }
  //   return result
  // } 

  function isArray(value) {
    return Object.prototype.toString.call(value) == '[object Array]'
  }

  function isArrayLike(value) {
    return value.length ? true : false
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

  function filter(collection, predicate=identity) {
    predicate = Iteratee(predicate)
    let res = []
    for (let key in collection) {
      let item = collection[key]
      if (predicate(item, key, collection)) {
        res.push(item)
      }
    }
    return res
  }

  function slice(array, start=0, end=array.length) {
    let res = []
    for (let i = start; i < end; i++) {
      res.push(array[i])
    }
    return res
  }

  function gt(value, other) {
    return value > other
  }

  function sortedIndex(array, value, idx=0) {
    // 用二分法
    if (array[0] >= value) {
      return 0 + idx
    }
    if (array[array.length - 1] < value) {
      return array.length + idx
    }
    let mid = array.length >> 1 
    if (array[mid] >= value) {
      return sortedIndex(array.slice(0, mid), value, idx)
    } else {
      return sortedIndex(array.slice(mid, array.length),value, idx+mid)
    }
  }

  function union(...arrays) {
    let res = []
    let map = {}
    for (let array of arrays) {
      for (let it of array) {
        if (map[it] === undefined) {
          map[it] = true 
          res.push(it)
        } 
      }
    }
    return res
  }

  function unionBy(...args) {
    let iteratee = args.pop()
    let arrays = args
    iteratee = Iteratee(iteratee)
    let res = []
    let map = {}
    for (let array of arrays) {
      for (let it of array) {
        let trans = iteratee(it)
        if (map[trans] === undefined) {
          map[trans] = true 
          res.push(it)
        } 
      }
    }
    return res
  }

  function assign(object, ...sources) {
    for (let source of sources) {
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          object[key] = source[key]
        }
      }
    }
    return object
  }

  function assignIn(object, ...sources) {
    for (let source of sources) {
      for (let key in source) {
          object[key] = source[key]
      }
    }
    return object
  }

  function defaults(object, ...sources) {
    for (let source of sources) {
      for (let key in source) {
          if (object[key] === undefined) {
            object[key] = source[key]
          }
      }
    }
    return object
  }

  function has(object, path) {
    let props = toPath(path) 
    for (let prop of props) {
      if (!object.hasOwnProperty(prop)) {
        return false
      }
      object = object[prop]
    }
    return true
  }

  function hasIn(object, path) {
    let props = toPath(path) 
    for (let prop of props) {
      if (object[prop] === undefined) {
        return false
      }
      object = object[prop]
    }
    return true
  }

  // function create(prototype, properties) {

  // }


  return {
    identity,
    isEqual,
    isMatch,
    property,
    matches,
    matchesProperty,
    toPath,
    get,
    split,
    Iteratee,
    filter,
    // xor,
    add,
    dropRightWhile,
    dropWhile,
    countBy,
    groupBy,
    keyBy,
    findIndex,
    findLastIndex,
    forEach,
    shuffle,
    every,
    find,
    findKey,
    map,
    partition,
    reduce,
    reduceRight,
    reject,
    some,
    chunk,
    compact,
    drop,
    dropRight,
    fill,
    flatten,
    flattenDeep,
    flattenDepth,
    flatMap,
    flatMapDeep,
    flatMapDepth,
    fromPairs,
    head,
    indexOf,
    initial,
    join,
    last,
    lastIndexOf,
    reverse,
    uniq,
    uniqBy,
    without,
    zip,
    unzip,
    size,
    isBoolean,
    ceil,
    min,
    max,
    maxBy,
    sum,
    sumBy,
    repeat,
    range,
    difference,
    concat,
    toArray,
    nth,
    intersection,
    pull,
    pullAll,
    remove,
    tail,
    take,
    takeRight,
    mapValues,
    isArray,
    isArrayLike,
    isArrayLikeObject,
    isBoolean,
    isDate,
    isFunction,
    isInteger,
    isNumber,
    isObject,
    isObjectLike,
    isString,
    slice,
    gt,
    sortedIndex,
    union,
    unionBy,
    sample,
    round,
    assign,
    assignIn,
    defaults,
    has,
    hasIn,
    // create,
    // reduce: reduce,
    // bind : bind, // 下划线（变量名)
    // parseInt: parseInt,
    // negate: negate,
    // spread: spread,
    // flip: flip,
    // reverse: reverse,
    // before: before,
    // after: after,
    // memorize: memorize,
    // shuffle用递归试试看: shuffle用递归试试看,
    // curry: curry,
    // value: value,
    // chunk: chunk,
    // chain: chain,
    // take: take,
    // isRegExp: isRegExp,
    // wrap,  

    // invert,
    // invoke,
    // keys,
    // mapKeys,
    // merge,
    // omit,
    // pick,
    // result,
    // set,
    // toPairs,
    // values,
    // escape,
    // unescape,
    // pad,
    // padEnd,
    // parStart,
    // bindAll,
    // mixin,
    // times,
    // uniqueId,
    // cloneDeep,
    // negate,
    // once,
    // spread,
    // curry,
    // memoize,
    // constant,
    // propertyOf,

    // sortBy,
    // defer,
    // delay,
    // random,
    // forin,
    // forinRight,
    // forOwn,
    // forOwnRight,
    // functions,


  }
}()
