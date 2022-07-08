// Autocomplete.js
import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  text-align: center;
  input {
    position: absolute;
    top: -27px;
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
  }
`;

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.clearSearchBox = this.clearSearchBox.bind(this);
  }

  componentDidMount({ map, mapApi } = this.props) {
    const options = {
      // restrict your search to a specific type of result
      types: ["address"],
      // restrict your search to a specific country, or an array of countries
      // componentRestrictions: { country: ['gb', 'us'] },
    };
    this.autoComplete = new mapApi.places.Autocomplete(
      this.searchInput,
      options
    );
    this.autoComplete.addListener("place_changed", this.onPlaceChanged);
    this.autoComplete.bindTo("bounds", map);
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchInput);
  }

  onPlaceChanged = ({ map, addplace } = this.props) => {
    const place = this.autoComplete.getPlace();

    if (!place.geometry) return;
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    addplace(place);
    this.searchInput.blur();
  };

  clearSearchBox() {
    this.searchInput.value = "";
    this.props.clearAddressFields();
  }

  render() {
    return (
      <Wrapper>
        <div className="col-sm-10">
          <input
            // className="search-input"
            className="form-control"
            ref={(ref) => {
              this.searchInput = ref;
            }}
            type="text"
            onFocus={this.clearSearchBox}
            placeholder="Enter a location"
          />
        </div>
      </Wrapper>
    );
  }
}

export default AutoComplete;
