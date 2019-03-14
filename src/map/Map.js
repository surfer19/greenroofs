
import React from 'react';
import { Map as LeafletMap, TileLayer, ImageOverlay,GeoJSON, LayersControl, Marker, Popup, FeatureGroup, Circle, latLngBounds }  from 'react-leaflet';
import './Map.css';
import heatmapImg from '../assets/images/heatmap.jpg';
import axios from 'axios';
import hash from 'object-hash';

// import BuildingsAll from '../assets/terrierObjects/green_roofs.json'
// import { LazyLog } from 'react-lazylog';
// const OtherComponent = React.lazy(() => import('../assets/terrierObjects/buildingsAll'));

// import BuildingsAll from '../assets/terrierObjects/buildingsAll'

// import 'leaflet/dist/leaflet.css';

const center = [50.086385, 14.423693]

class Map extends React.Component {
    constructor(props) {
        super(props);        
    }
    state = { }
    // componentDidMount() {
        
    // }
    componentDidMount() {
        axios.get('terrierObjects/green_roofs.json') // JSON File Path
            .then(response => {
                console.log('respones', response.data)
                this.setState({
                    allBuildings: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
        });
    }

    // this.map = LeafletMap.map('mapid').setView([50.086385, 14.423693], 15)

    render() {
        // console.log('ahoj', this.state.allBuildings)
        
        return (
            <div>
            <LeafletMap
                center={center}
                zoom={15}            
                attributionControl={true}
                zoomControl={true}
                >
                <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'></TileLayer>
                
                {/* <Circle center={center} color="red" fillColor="none" radius={1000} /> */}                

                <LayersControl position="topright">                          
                    <LayersControl.Overlay name="Show all possible buildings">
                        { this.state && this.state.allBuildings &&
                        <GeoJSON key={hash({a: Math.random() * 10})} data={this.state ? this.state.allBuildings : {'':''}} />                        
                        }
                    </LayersControl.Overlay>
                    
                    <LayersControl.Overlay name="Show heatmap">
                        <ImageOverlay url={heatmapImg} 
                                        bounds={[[49.91156 ,13.90904], [50.2512, 14.89781]]}                                        
                                        opacity="0.5">                            
                        </ImageOverlay>

                    </LayersControl.Overlay>                    
                </LayersControl>
            </LeafletMap>            
            </div>
            // <div></div>
        )
    }
}

export default Map;