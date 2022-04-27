// src/App.js
import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { OfflineAlert } from './Alert';

class App extends Component {

  //------CREATE STATE EVENTS--------------
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: "all"
  }

  //------COMPONENT MOUNTED---------------
  componentDidMount() {
    let warningText = '';

    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events),
        });
      }
      if (!navigator.onLine) {
        warningText = 'Warning: You are offline. List of events may not be the most current'
      }
    });

  }

  //------COMPONENT UNMOUNTED---------------
  componentWillUnmount() {
    this.mounted = false;
  }

  //------UPDATE NUMBER OF EVENTS -------------
  updateNumberOfEvents = (numberOfEvents) => {

    this.setState(
      {
        numberOfEvents,
      },
      this.updateEvents(null, numberOfEvents)
    );
  };

  //------UPDATE LIST OF EVENTS -------------
  updateEvents = (location, eventCount) => {


    this.mounted = true;

    getEvents().then((events) => {

      // if eventCount is set we use that value, if not we use the state value
      const limit = eventCount ?? this.state.numberOfEvents;

      // if currentLocation is set we use that value, if not we use the state value
      const currentLocation = location ?? this.state.currentLocation;


      // return all the events or just the filtered slice
      const locationEvents =

        //If currentlocation is set to all 
        currentLocation === "all"

          //Then return all events
          ? events.slice(0, limit)


          //Otherwise filter location based on user location and limit set by user  
          : events
            .filter((event) => event.location === currentLocation)
            .slice(0, limit);

      if (this.mounted) {
        this.setState({
          events: locationEvents,
          numberOfEvents: limit,
          currentLocation: currentLocation,
        });
      }
    });
  };

  //------RENDER PAGE -------------
  render() {

    const { events, locations, numberOfEvents } = this.state;
    return (
      <div className="App">

        <div className="searchboxes">
          <CitySearch
            locations={locations}
            updateEvents={this.updateEvents}
          />

          <NumberOfEvents
            numberOfEvents={numberOfEvents}
            updateNumberOfEvents={this.updateNumberOfEvents}
          />
        </div>
        <EventList events={events} />
        <OfflineAlert text={this.state.warningText} />


      </div>
    );
  }
}

export default App;