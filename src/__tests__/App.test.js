// src/__tests__/App.test.js

import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

//---------UNIT TESTING------------------
describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });

    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    test("testing to see if NumberOfEvents input box renders", () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });
});




//---------INTEGRATION TESTING------------------
describe('<App/> integration', () => {
    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });

    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });

    test("Passing the number of events (32 events)", async () => {
        const AppWrapper = mount(<App />);
        const AppNumberOfEventsState = AppWrapper.state("numberOfEvents");
        expect(AppNumberOfEventsState).not.toEqual(undefined);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(32);

        const eventObject = { target: { value: 1 } };
        await NumberOfEventsWrapper.find(".inputNumberOfEvents").simulate("change", eventObject);
        AppWrapper.update();
        expect(AppWrapper.state("numberOfEvents")).toEqual(1);

        AppWrapper.unmount();

    });

    test('get list of all events when user selects "See all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });



});


