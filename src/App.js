import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
// import logo from './logo.svg';
import './App.css';
import Flat from './components/flat';
import Marker from './components/marker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flats: [],
      allFlats: [],
      selectedFlat: null,
      search: ""
    };
  }

  componentDidMount(){
    const url = "https://raw.githubusercontent.com/geraldokandonga/react-airbnb-clone-app/master/flats.json";
    fetch(url)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        flats:data,
        allFlats: data
      });
    });
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      flats: this.state.allFlats.filter((flat) => new RegExp(event.target.value, "i").exec(flat.name))
    });
  }

  selectFlat = (flat) => {
    this.setState({
      selectedFlat: flat
    });
  }

  render(){
    let center = {
      lat: 48.8566,
      lng: 2.3522
    };

    if(this.state.selectedFlat) {
      center = {
        lat: this.state.selectedFlat.lat,
        lng: this.state.selectedFlat.lng
      }
    }
    return(
      <div className="app">
        <div className="main">
          <div className="search">
            <input
              type="text"
              palceholder="Search..."
              value={this.state.search}
              onChange={this.handleSearch}/>
          </div>
            <div className="flats">
              {this.state.flats.map((flat)=> {
                return <Flat 
                  key={flat.name} 
                  flat={flat} 
                  selectFlat={this.selectFlat}
                  />
              })}
            </div>
          </div>
          <div className="map">
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyDRsX35aort_XhjSu3F2vd8CQUiCJCl118"}}
              center={center}
              zoom={11}
            >
              {this.state.flats.map((flat)=> {
                return <Marker 
                key={flat.name} 
                lat={flat.lat} 
                lng={flat.lng} 
                text={flat.price}
                selected={flat === this.state.selectedFlat}/>
              })}
            </GoogleMapReact>
          </div>
      </div>
    );
  }
}

export default App;
