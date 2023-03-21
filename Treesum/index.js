function treeSum(array) {
    count = 0;
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            count += treeSum(array[i])
        } else if (typeof array[i] === 'number') {
            count += array[i]
        }
    }
    return count;
}

console.log(treeSum([5, 7, [4, [2], 8, [1, 3], 2], [9, []], 1, 8]))
