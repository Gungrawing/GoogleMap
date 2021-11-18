import React, {useEffect, useState} from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';
// import {formatRelative} from "data-fns";
import "@reach/combobox/styles.css"
import mapStyle from "./components/style-map/style-map"
import "./App.css"

const libraries = ['places'];



export default function App() {
    const [isLat, setLat] = useState('')
    const [isLng, setLng] = useState('')
    const [isZoom,setZoom]= useState(8)
    const [center,setCenter]= useState({
        lat: 40.713051,
        lng: -74.007233,
    })
    const mapContainerStyle = {
        width: '100vw',
        height: '100vh'
    }
    const options = {
        style: mapStyle
    }
    useEffect(() => {
        const handleUserKeyPress = event => {
            const { key, keyCode } = event;
            if (keyCode === 32 || (keyCode >= 65 && keyCode <= 90)) {
                setZoom(isZoom => `${isZoom}${key}`);
                event.preventDefault()
            }

        };
        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
            window.removeEventListener("keydown", handleUserKeyPress);
        };
    }, );


    function getCenter(){
        setCenter({
            lat:+isLat,
            lng:+isLng,
            handleUserKeyPress: +isZoom,
        })

    }
    const {isLoaded,loadError} = useLoadScript(
        {
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEYS="AIzaSyBy_R5G2M6bR5H-ZDeeQNZQzMJx4Xuk4pY",
        libraries,
    });
    if(loadError) return "Error Loading maps";
    if(!isLoaded) return "Loading maps";

    return (
<div>
    <h6>
        <div>
            <label>Set Latitude</label>
            <input type="text"
                   required
                   value={isLat}
                   onChange={(e)=>setLat(e.target.value)}/>
            <label>Set Longitude</label>
            <input type="text"
                   required
                   value={isLng}
                   onChange={(e)=>setLng(e.target.value)}/>
            <input type="number"
                   required
                   onKeyDown={(e)=>setZoom(+e.target.value)}/>
        </div>
        <button onClick={getCenter}>Click To Change Center</button>
    </h6>
    <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={isZoom}
        center={center}
        options={options}>
    </GoogleMap>
</div>
    );
}
// <input type="number"
//        required
//        onChange={(e)=>{window.addEventListener('keypress',()=>{
//            setZoom(+e.target.value)
//        })}}/>