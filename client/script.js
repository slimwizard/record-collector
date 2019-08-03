
const baseURL = 'http://localhost:5000/findPrice?album='
const total = document.getElementById('total')
const albumList = document.getElementById('collection')

const scrape =()=> {
    let album = document.getElementById('albumName').value
    console.log(baseURL + album.replace(/ /g,'+'))
    fetch(baseURL + album)
        .then(response => {return response.json()})
        .then(response => {
            // set album name and price
            total.innerHTML = (parseFloat(total.innerHTML) + parseFloat(response.price.substring(1))).toFixed(2)
            let listNode = document.createElement('li');
            let textnode = document.createTextNode('   ' + album + ' : ' + response.price)

            // set album art
            let imgNode = document.createElement('img')
            imgNode.src = response.album_art
            imgNode.width = 100
            imgNode.height = 100
            
            // append name, price, and art to list
            listNode.appendChild(imgNode)
            listNode.appendChild(textnode)
            albumList.appendChild(listNode)  
        })
        .catch(err => console.error('Caught error: ', err))    
}