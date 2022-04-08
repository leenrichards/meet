import React from 'react';
import NumberOfEvents from '../NumberOfEvents';
import { shallow } from 'enzyme';

describe('<NumberOfEvents /> component', () => {

    let NumberOfEventsWrapper;

    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test('render input field for number of events', () => {
        expect(NumberOfEventsWrapper.find('.inputNumberOfEvents')).toHaveLength(1);
    });

    test('change numberOfEvents state when number input changes', () => {
        NumberOfEventsWrapper.setState({ numberOfEvents: "32" });
        NumberOfEventsWrapper.find('.inputNumberOfEvents').simulate('change', { target: { value: "20" } });
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual("20");
    });
});   
