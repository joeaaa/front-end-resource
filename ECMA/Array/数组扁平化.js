flat(Infinity)
var arr = [1, 2, [3, [4, 5]]]
arr.flat(Infinity)


// JSON.parse + 正则 + JSON.stringify
var arr = [1, 2, [3, [4, 5]]]
var str = JSON.stringify(arr)
// "[1,2,[3,[4,5]]]"
var newStr = str.replace(/(\[|\])/g, "")
// "1,2,3,4,5"
arr = `[${newStr}]`
// "[1,2,3,4,5]"
JSON.parse(arr)
// [1,2,3,4,5]


// 递归
function flatter(arr) {
	let newArr = []
	arr.forEach(item => {
		if (Array.isArray(item)) {
			// newArr.push(...flatter(item))
			newArr = newArr.concat(flatter(item))
		}
		else {
			newArr.push(item)
		}
	})
	return newArr
}


// Reduce + 递归
var arr = [1, 2, [3, [4, 5]]]
function flatter(arr) {
	return arr.reduce((prev, next) => {
		return prev.concat(Array.isArray(next) ? flatter(next) : next)
	}, [])
}
[].concat(...arr)

var arr = [1, [2, [3, 4]]];
console.log([].concat(...arr)); // [1, 2, [3, 4]]
// 该操作可以拍平一层
var arr = [1, [2, [3, 4]]];
function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
console.log(flatten(arr))
