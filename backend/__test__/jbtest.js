
haha = new Date('06 10 2001')
console.log(haha)

var arr = [
    {
        tag: 1,
        name: "haha"
    },
    {
        tag: 1,
        name: "haha"
    },
    {
        tag: 2,
        name: "hehe"
    }
]

map = {}
for (let i = 0; i < arr.length; i++) {
    map[arr[i].tag] = []
}

for (let i = 0; i < arr.length; i++) {
    map[arr[i].tag].push(arr[i])
}

console.log(map)
