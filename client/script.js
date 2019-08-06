
const baseURL = 'http://localhost:5000/findPrice?album='
const total = document.getElementById('total')
const albumList = document.getElementById('collection')
const recordImgs = document.getElementById('record-imgs')
const addButton = document.getElementById('add-button')
const albumName = document.getElementById('album-name')

let numOfRecords = 0

// bind 'Add' button to enter key
document.onkeydown = function (e) {
    e = e || window.event;
    switch (e.which || e.keyCode) {
        case 13 : addButton.click()
    }
}

const updateTotal =(res)=> {
    total.innerHTML = (parseFloat(total.innerHTML) + parseFloat(res.price.substring(1))).toFixed(2)
}

const setAlbumArt =(res)=> {
    let imgNode = document.createElement('img')
    imgNode.src = res.album_art
    imgNode.style.zIndex = numOfRecords
    imgNode.classList.add('album')
    imgNode.style.position = 'relative'
    imgNode.style.marginLeft = numOfRecords == 0 ? 0 : '-75px'
    imgNode.addEventListener("mouseenter", function() {
        this.style.zIndex = 30
        this.width = 160
        this.height = 160
    })
    let currentNum = numOfRecords
    imgNode.addEventListener("mouseleave", function() {
        this.style.zIndex = numOfRecords
        this.width = 100
        this.height = 100
    })
    numOfRecords += 1
    imgNode.width = 100
    imgNode.height = 100
    return imgNode
}

const setNameAndPrice =(res)=> {
    let listNode = document.createElement('li');
    let textnode = document.createTextNode('   ' + res.album + ' : ' + res.price)
    listNode.appendChild(textnode)
    return listNode
}

const scrape =()=> {
    // let album = document.getElementById('albumName').value.replace(/ /g,'+')
    let album = albumName.value.replace(/ /g,'+')
    addButton.disabled = true
    fetch(baseURL + album)
        .then(response => {return response.json()})
        .then(response => {
            console.log(response)
            updateTotal(response)
            recordImgs.appendChild(setAlbumArt(response))
            albumList.appendChild(setNameAndPrice(response))
            addButton.disabled = false
            albumName.value = ''
        })
        .catch(err => console.error('Caught error: ', err))
}