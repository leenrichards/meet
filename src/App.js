// src/App.js
import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { OfflineAlert } from './Alert';
import { EventGenre } from './EventGenre';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


class App extends Component {

  //------CREATE STATE EVENTS--------------
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: "all",
    warningText: ""
  }


  //------GET NUMBER OF EVENTS PER CITY FOR CHART---------
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  //------COMPONENT MOUNTED---------------
  componentDidMount() {
    this.setState({
      warningText: ''
    });

    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events),
        });
      }
      if (!navigator.onLine) {
        this.setState({
          warningText: 'Warning: You are offline. List of events may not be the most current',
        });
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

    const { events, locations, numberOfEvents, warningText } = this.state;
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


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
        <div className="ChartArea">
          <h4 className="ChartTitle"> Number of Events per City</h4>
          <div className="ChartWrapper">

            <EventGenre events={events} />



            <ResponsiveContainer height={400} width={800} style="width: 100%; height: 400px;">
              <ScatterChart
                margin={{
                  top: 20, right: 20, bottom: 20, left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="city" />
                <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={this.getData()} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
        <OfflineAlert text={warningText} />
        <EventList events={events} />



      </div>
    );
  }
}

export default App;