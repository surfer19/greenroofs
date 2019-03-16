
import React from 'react';
import { Map as LeafletMap, TileLayer, ImageOverlay,GeoJSON, LayersControl, Marker, Popup, FeatureGroup, Circle, LayerGroup, latLngBounds, Rectangle }  from 'react-leaflet';
import './Map.css';
import heatmapImg from '../assets/images/heatmap.jpg';
import axios from 'axios';
import hash from 'object-hash';

const center = [50.086385, 14.423693]
const bbOneBounds = [[50.090759 ,14.428063], [50.087322, 14.437146]]
const bbTwoBounds = [[50.086436 ,14.424331], [50.0795, 14.432383]]

// [14.424331, 50.086436, 14.432383,50.081072]

class Map extends React.Component {
    constructor(props) {
        super(props);        
    }
    state = { }
    
    componentDidMount() {
        axios.get('terrierObjects/bb_center_green_roofs.geojson') // JSON File Path
            .then(response => {
                console.log('respones', response.data)
                this.setState({
                    allBuildings: response.data
                });
            })            
            .catch(function (error) {
                console.log(error);
        });
        axios.get('terrierObjects/bb1_green_roofs.geojson')
            .then(response => {
                console.log('respones', response.data)
                this.setState({
                    // bounding box one
                    bbOneBuildings: response.data
                });
            })            
            .catch(function (error) {
                console.log(error);
        });
        axios.get('terrierObjects/bb2_green_roofs.geojson')
            .then(response => {
                console.log('respones', response.data)
                this.setState({
                    // bounding box one
                    bbTwoBuildings: response.data
                });
            })            
            .catch(function (error) {
                console.log(error);
        });
        axios.get('terrierObjects/bb1_cat_green_roofs.geojson')
            .then(response => {
                console.log('respones', response.data)
                this.setState({
                    // bounding box one
                    bbOneCatBuildings: response.data
                });
            })            
            .catch(function (error) {
                console.log(error);
        });
        axios.get('terrierObjects/bb2_cat_green_roofs.geojson')
            .then(response => {
                console.log('respones', response.data)
                this.setState({
                    // bounding box one
                    bbTwoCatBuildings: response.data
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

                    <LayersControl.Overlay name="Show buildings in first critical area">
                        <LayerGroup>
                            { this.state && this.state.allBuildings &&
                            <GeoJSON key={hash({a: Math.random() * 10})} data={this.state ? this.state.bbOneBuildings : null} 
                                style= {                        
                                    {                                        
                                        fillColor: 'red',
                                        weight: 2,
                                        //stroke-width: to have a constant width on the screen need to adapt with scale 
                                        opacity: 1,
                                        color: 'yellow',
                                        dashArray: '5',
                                        // fillOpacity: 0.5 
                                    }
                                }/>                            
                            }
                            <Rectangle bounds={bbOneBounds} color="blue" style ={{ dashArray: '4'}}/>
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Show buildings in second critical area">
                        <LayerGroup>
                            { this.state && this.state.allBuildings &&
                            <GeoJSON key={hash({a: Math.random() * 10})} data={this.state ? this.state.bbTwoBuildings : null} 
                                style= {                        
                                    {                                        
                                        fillColor: 'black',
                                        weight: 2,
                                        //stroke-width: to have a constant width on the screen need to adapt with scale 
                                        opacity: 1,
                                        color: 'black',
                                        dashArray: '5',                                         
                                    }
                                }/>
                            }
                            <Rectangle bounds={bbTwoBounds} color="purple"/>
                        </LayerGroup>

                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Show only 1. and 2. level buildings in first critical area">
                        <LayerGroup>
                            { this.state && this.state.allBuildings &&
                                <GeoJSON key={hash({a: Math.random() * 10})} data={this.state ? this.state.bbOneCatBuildings : null} 
                                style= {                        
                                    {                                        
                                        fillColor: 'blue',
                                        weight: 2,                                        
                                        opacity: 1,
                                        color: 'blue',                                    
                                    }
                                }/>
                            }                            
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Show only 1. and 2. level buildings in second critical area">
                        <LayerGroup>
                            { this.state && this.state.allBuildings &&
                                <GeoJSON key={hash({a: Math.random() * 10})} data={this.state ? this.state.bbTwoCatBuildings : null} style={                                                     
                                    {            
                                        fillOpacity: 1,
                                        weight: 2,                               
                                        opacity: 1,
                                        color: 'white',
                                    }                                
                                } />
                            }
                        </LayerGroup>
                    </LayersControl.Overlay>        
                    
                    <LayersControl.Overlay name="Show heatmap">
                        <ImageOverlay url={heatmapImg} 
                                        bounds={[[49.91156 ,13.90904], [50.2512, 14.89781]]}                                        
                                        opacity="0.7">
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