import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let EventWrapper;

    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[1]} />);
    });

    test('render an event', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1);
    })

    test('render a location', () => {
        expect(EventWrapper.find('.location')).toHaveLength(1);
    })

    test('render the summary', () => {
        expect(EventWrapper.find('.summary')).toHaveLength(1);
    })

    test('render the date', () => {
        expect(EventWrapper.find('.start-date')).toHaveLength(1);
    })

    //collapse button

    // -----------Show detail button removed------------- 
    // test('render the show details button', () => {
    //     expect(EventWrapper.find('.show-details')).toHaveLength(1);
    // })

    test('details are collapsed by default', () => {
        expect(EventWrapper.state('collapsed')).toBe(true);
    })

    /* -----------Show detail button removed-------------  
    test('open details when details button is clicked', () => {
        EventWrapper.setState({
            collapsed: true
        });
        EventWrapper.find('.show-details').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(false);
    });

    test('hide details when clicking button again after details are displayed', () => {
        EventWrapper.setState({
            collapsed: false
        });
        EventWrapper.find('.hide-details').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(true);
    });*/
})