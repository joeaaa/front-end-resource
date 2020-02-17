var arr = [1, 2, 2, 4, 9, 6, 7, 5, 2, 3, 5, 6, 5]

// Set
Array.from(new Set(arr))

//缺点： indexOf或者includes都是遍历数组，时间复杂度高
function unique(arr) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (!newArr.includes(item)) {
            newArr.push(item)
        }
    }
    return newArr
}

// 把数组的值放在对象的键值里， 对于 数组中的 1 和 “1” ， 要再一次对比
// 空间复杂度高， 所谓的空间换时间
function unique(arr) {
    let newArr = []
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        let type = typeof item
        if (!obj[item]) {
            newArr.push(item)
            obj[item] = [type]
        } else if (!obj[item].includes(type)){
            newArr.push(item)
            obj[item].push(type)
        }
    }
    return newArr
}

// 排序法，先用sort排序再比较
// 相比前两种，时间和空间用的都没那么多
// 缺点：排序了
function unique(arr) {
    arr.sort()
    let newArr = [arr[0]]
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (newArr[newArr.length - 1] !== item) {
            newArr.push(item)
        }
    }
    return newArr
}
