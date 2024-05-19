
import './startingView.css';
import "leaflet/dist/leaflet.css";
import {MapContainer, Marker, TileLayer, useMap} from "react-leaflet";
import {useEffect, useState} from "react";
import {Icon} from "leaflet/src/layer";
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../DataContext/DataContext.js';


const Localization = ({onValidateUserData}) => {

    const navigation = useNavigate();
    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776067.png",
        iconSize: [38,38]

    })
    const [latitudeError, setLatitudeError] = useState(false);
    const [longitudeError, setLongitudeError] = useState(false);
    const [latitude, setLatitude] = useState(50.0614300);
    const [longitude, setLongitude] = useState(19.9365800);
    const [markerPosition, setMarkerPosition] = useState([50.0614300, 19.9365800]);
    const { fetchData } = useDataContext();
    const validation = () => {
        if(latitude > 90 || latitude < -90){
            onValidateUserData(false);
            return false;
        }
        else if(longitude > 180 || longitude < -180){
            onValidateUserData(false);
            return false;
        }
        else if(latitude == null || longitude == null){
            onValidateUserData(false);
            return false;
        }
        else if (!isDouble(latitude) || !isDouble(longitude)) {
            onValidateUserData(false);
            return false;
        }
        else{
            onValidateUserData(true);
            return true;
        }
    }
    function isDouble(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
    const handleConfirm = async () => {

        if(validation()){
           if(await fetchData(latitude, longitude)){
               navigation("/weather");
           }
           else{
               navigation("/");
           }
        }
        else{
            alert("Please provide valid data");
        }
    }
    const RecenterMap = ({ center }) => {
        const map = useMap();
        useEffect(() => {
            map.setView(center);
        }, [center, map]);
        return null;
    };

    const handleMarkerDrag = (e) => {
        const newLatLng = e.target.getLatLng();
        const latitude = newLatLng.lat
        const longitude = newLatLng.lng
        if(latitude > 90 || latitude < -90) {
            setLatitudeError(true)
            setLatitude(latitude);
        }
        else{
            setLatitudeError(false);
            setLatitude(latitude);
            setMarkerPosition([latitude, longitude]);
        }
        if(longitude > 180 || longitude < -180){
            setLongitudeError(true);
            setLongitude(longitude);
        }
        else{
            setLongitudeError(false);
            setLongitude(longitude);
            setMarkerPosition([latitude, longitude]);
        }
    };

    const getCurrentLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setLatitude(latitude);
                setLongitude(longitude);
                setLatitudeError(false);
                setLongitudeError(false);
                setMarkerPosition([latitude, longitude]);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleLatitudeChange = (e) => {
        const latitude = e.target.value;
        if(latitude > 90 || latitude < -90){
            setLatitudeError(true);
            setLatitude(latitude);
        }
        else{
            setLatitudeError(false)
            setLatitude(latitude);
            setMarkerPosition([latitude, longitude])
        }

    };

    const handleLongitudeChange = (e) => {
        const longitude = e.target.value;
        if(longitude>180 || longitude <-180){
            setLongitudeError(true);
            setLongitude(longitude);
        }
        else{
            setLongitudeError(false);
            setLongitude(longitude);
            setMarkerPosition([latitude, longitude])
        }

    };
    useEffect(() => {
        getCurrentLocation();
    }, []);


    return (

            <div className='container'>
                <div className='header'>
                    <div className='text'>
                        Provide your location
                    </div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    <div className='error'>
                        <div className='input'>
                            <input id='latitudeInput' type='number' step='0.000000001'  value={latitude} onChange={handleLatitudeChange}/>
                            <div className="placeholder">
                                <text>Latitude</text>
                            </div>
                        </div>
                        {latitudeError && <div className='latitudeError'> Latitude must be in range from -90 to 90 </div>}
                    </div>
                    <div className='error'>
                        <div className='input'>
                            <input id='longitudeInput' type='number' step='0.000000001' value={longitude} onChange={handleLongitudeChange}/>
                            <div className="placeholder">
                                <text>Longitude</text>
                            </div>
                        </div>
                        {longitudeError && <div className='latitudeError'> Longitude must be in range from -180 to 180 </div>}
                    </div>


                </div>
                <div className='currentLocation'>
                    <button className='currentButton' onClick={getCurrentLocation}>
                        <div className='text1'>
                             Your current location
                        </div>
                    </button>
                </div>
                <MapContainer center={markerPosition} zoom={11}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <Marker position = {markerPosition} icon={customIcon} draggable={true} eventHandlers={{dragend: handleMarkerDrag}}></Marker>
                    <RecenterMap center={markerPosition} />
                </MapContainer>

                <div className="confirm">
                    <button className="confirmButton" onClick={handleConfirm}>
                        <text className="text1">Check the weather Forecast! </text>
                    </button>
                </div>

            </div>
    );
};

export default Localization;
