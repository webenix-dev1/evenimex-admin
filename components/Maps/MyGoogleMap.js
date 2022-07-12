// MyGoogleMaps.js
import React, { Component } from "react";

import GoogleMapReact from "google-map-react";

import styled from "styled-components";

import AutoComplete from "./Autocomplete";
import Marker from "./Marker";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

class MyGoogleMap extends Component {
  state = {
    mapApiLoaded: false,
    mapInstance: null,
    mapApi:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZZwNh3cghYUNzgQBSSQEeAXAnzfKxH8Q&libraries=places",
    geoCoder: null,
    places: [],
    center: [44.439663, 26.096306],
    zoom: 12,
    address: "",
    draggable: true,
    lat: 44.439663,
    lng: 26.096306,
  };

  componentWillMount() {
    this.setCurrentLocation();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        center: [
          this.props.isEdit ? Number(this.props.venueData.lat) : 44.439663,
          this.props.isEdit ? Number(this.props.venueData.long) : 26.096306,
        ],
        lat: this.props.isEdit ? Number(this.props.venueData.lat) : 44.439663,
        lng: this.props.isEdit ? Number(this.props.venueData.long) : 26.096306,
      });
    }, 1000);
  }

  onMarkerInteraction = (childKey, childProps, mouse) => {
    this.setState({
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng,
    });
  };
  onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
    this.setState({ draggable: true });

    this._generateAddress();
  };

  _onChange = ({ center, zoom }) => {
    this.setState({
      center: center,
      zoom: zoom,
    });
  };

  _onClick = (value) => {
    this.setState({
      lat: value.lat,
      lng: value.lng,
    });
  };

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });

    this._generateAddress();
  };

  addPlace = (place) => {
    console.log("Place ::", place);
    this.props.addressHandle(place);

    this.setState({
      places: [place],
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    this._generateAddress();
  };

  _generateAddress() {
    const { mapApi } = this.state;

    this.props.clearAddressFields();

    const geocoder = new mapApi.Geocoder();

    geocoder.geocode(
      { location: { lat: this.state.lat, lng: this.state.lng } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.props.addressHandle(results[0]);
            this.setState({ address: results[0].formatted_address });
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  // Get Current Location Coordinates
  setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: [
            this.props.isEdit
              ? Number(this.props.venueData.lat)
              : position.coords.latitude,
            this.props.isEdit
              ? Number(this.props.venueData.long)
              : position.coords.longitude,
          ],
          lat: this.props.isEdit
            ? Number(this.props.venueData.lat)
            : position.coords.latitude,
          lng: this.props.isEdit
            ? Number(this.props.venueData.long)
            : position.coords.longitude,
        });
      });
    }
  }

  render() {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;

    return (
      <Wrapper>
        {mapApiLoaded && (
          <div>
            <AutoComplete
              map={mapInstance}
              mapApi={mapApi}
              addplace={this.addPlace}
              clearAddressFields={this.props.clearAddressFields}
            />
          </div>
        )}
        <GoogleMapReact
          center={this.state.center}
          zoom={this.state.zoom}
          draggable={this.state.draggable}
          onChange={this._onChange}
          onChildMouseDown={this.onMarkerInteraction}
          onChildMouseUp={this.onMarkerInteractionMouseUp}
          onChildMouseMove={this.onMarkerInteraction}
          onChildClick={() => console.log("child click")}
          onClick={this._onClick}
          bootstrapURLKeys={{
            key: "AIzaSyCZZwNh3cghYUNzgQBSSQEeAXAnzfKxH8Q",
            libraries: ["places", "geometry"],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          <Marker
            text={this.state.address}
            lat={this.state.lat}
            lng={this.state.lng}
          />
        </GoogleMapReact>

        {/* <div className="info-wrapper">
          <div className="map-details">
            Latitude: <span>{this.state.lat}</span>, Longitude:{" "}
            <span>{this.state.lng}</span>
          </div>
          <div className="map-details">
            Zoom: <span>{this.state.zoom}</span>
          </div>
          <div className="map-details">
            Address: <span>{this.state.address}</span>
          </div>
        </div> */}
      </Wrapper>
    );
  }
}

export default MyGoogleMap;
