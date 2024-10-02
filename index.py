from flask import Flask, request, jsonify, render_template
import requests  # For making API calls

app = Flask(__name__, template_folder='.')

# Serve the frontend
@app.route('/')
def index():
    return render_template('index.html')

# API route to get nearby stores based on the product and location
@app.route('/get-store', methods=['POST'])
def get_store():
    data = request.get_json()
    product = data.get('product', '')
    lat = data.get('lat', 0.0)  # Latitude from the client
    lng = data.get('lng', 0.0)  # Longitude from the client

    # Call the Overpass API to get store information
    store_info = get_nearby_stores(product, lat, lng)

    return jsonify(store_info)

# Function to interact with the Overpass API to find stores
def get_nearby_stores(product, lat, lng):
    # Overpass API query for shops in the vicinity
    query = f"""
    [out:json];
    (
      node["shop"~"{product}"](around:5000,{lat},{lng});
    );
    out body;
    """
    
    response = requests.get("http://overpass-api.de/api/interpreter", params={'data': query})
    
    if response.status_code == 200:
        data = response.json()
        stores = []
        
        for element in data.get('elements', []):
            if 'tags' in element:
                store = {
                    'name': element['tags'].get('name', 'Unknown Store'),
                    'address': element['tags'].get('addr:full', 'No Address'),
                    'latitude': element['lat'],
                    'longitude': element['lon'],
                    'location_link': f"https://www.openstreetmap.org/?mlat={element['lat']}&mlon={element['lon']}#map=15/{element['lat']}/{element['lon']}"
                }
                stores.append(store)

        return {'stores': stores} if stores else {'error': f'No stores found for "{product}".'}
    else:
        return {'error': 'Failed to fetch store data from Overpass API.'}

if __name__ == '__main__':
    app.run(debug=True)
