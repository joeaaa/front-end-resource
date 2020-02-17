var set = new Set([1, 2])

// 类数组对象以及部署了遍历器接口的对象
Array.from(set)

[...set]

// 只能转化类数组对象 (arguments和Nodelist)
Array.prototype.slice.call(arguments)
