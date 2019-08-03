import requests
import json
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify
app = Flask(__name__)

disc_url_1 = 'https://www.discogs.com/'
disc_url_2 = 'search/?q='
disc_url_3 = '&type=release'

@app.route('/findPrice')
def get_album_price():
    album = request.args.get('album')
    full_url = disc_url_1 + disc_url_2 + album + disc_url_3
    result = scrape(full_url)
    #album_info = jsonify({'album': album})
    album_info = jsonify({'album': album, 'price': result[0], 'album_art': result[1]})
    album_info.headers.add('Access-Control-Allow-Origin', '*')
    return album_info

def scrape(url):
    # get album search results then find URL associated with first result
    results_page = requests.get(url)
    soup = BeautifulSoup(results_page.text, 'html.parser')
    album = soup.find(class_='search_result_title').get('href')

    # get album page and pull listed price
    page = requests.get(disc_url_1 + album)
    soup = BeautifulSoup(page.text, 'html.parser')
    price = soup.find(class_='price').contents[0]
    album_art = soup.find(class_='thumbnail_center').find('img').get('src')
    return  (price, album_art)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')