
import React from 'react';
import { Map as LeafletMap, TileLayer, ImageOverlay, LayersControl, Marker, Popup, FeatureGroup, Circle, latLngBounds }  from 'react-leaflet';
import './Map.css';
import heatmapImg from '../assets/images/heatmap.jpg';
import BuildingsAll from '../assets/terrierObjects/green_roofs.json'

// import 'leaflet/dist/leaflet.css';

const center = [50.086385, 14.423693]

class Map extends React.Component {
    constructor(props) {
        super(props);        
    }
    // this.map = LeafletMap.map('mapid').setView([50.086385, 14.423693], 15)

    render() {
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
                    {/* <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
                        <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer> */}                    
                    
                    <LayersControl.Overlay name="Show heatmap">
                        <ImageOverlay url={heatmapImg} 
                                        bounds={[[49.91156 ,13.90904], [50.2512, 14.89781]]}                                        
                                        opacity="0.5">                            
                        </ImageOverlay>

                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Feature group">
                        <FeatureGroup color="purple">
                        <Popup>
                            <span>Popup in FeatureGroup</span>
                        </Popup>
                        <Circle center={center} radius={200} />
                        </FeatureGroup>
                    </LayersControl.Overlay>
                </LayersControl>
            </LeafletMap>            
            </div>
        )
    }
}

export default Map;