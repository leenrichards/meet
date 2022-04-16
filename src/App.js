// src/App.js
import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';

class App extends Component {
  //create events state
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  //Update number of events based on numberofEvents parameter
  updateNumberOfEvents = (numberOfEvents) => {
    this.setState(
      {
        numberOfEvents,
      },
      this.updateEvents(null, numberOfEvents)
    );
  };

  //Update events based on location parameter
  updateEvents = (location, eventCount) => {

    this.mounted = true;

    getEvents().then((events) => {
      //console.log("test", eventCount);

      const locationEvents =
        location === "all"
          ? events
          : location !== "all" && eventCount === undefined

            ? events.filter((event) => event.location === location)
            : events.slice(0, eventCount);

      if (this.mounted) {
        this.setState({
          events: locationEvents,
          numberOfEvents: eventCount ?? this.state.numberOfEvents,
        });
      }
    });
  };

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
        <EventList events={events}
        />

      </div>
    );
  }
}

export default App;