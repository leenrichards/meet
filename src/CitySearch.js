import React, { Component } from 'react';
import NumberOfEvents from './NumberOfEvents';
import { CityAlert } from './Alert';

class CitySearch extends Component {
    state = {
        query: 'all',
        suggestions: [],
        showSuggestions: undefined,
        infoText: ''
    }


    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ showSuggestions: true });
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        if (suggestions.length === 0) {
            this.setState({
                query: value,
                infoText: '--- Please try another city  ---',
            });
        } else {
            return this.setState({
                query: value,
                suggestions,
                infoText: ''
            });
        };
    };

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false,
            infoText: ''
        });
        this.props.updateEvents(suggestion);
    }

    render() {
        return (
            <div className="CitySearch">

                <label className="CitySearchLabel">City:&nbsp; <input
                    type="text"
                    className="city"

                    value={this.state.query}
                    onChange={this.handleInputChanged}
                    onFocus={() => { this.setState({ showSuggestions: true }) }}
                />  </label>

                <ul className="suggestions"
                    style={this.state.showSuggestions ? {} : { display: 'none' }}>
                    {this.state.suggestions.map((suggestion) => (
                        <li
                            key={suggestion}
                            onClick={() => this.handleItemClicked(suggestion)}
                        >{suggestion}</li>
                    ))}
                    <li onClick={() => this.handleItemClicked("all")} key='all'>
                        <b>See all cities</b>
                    </li>
                </ul>
                <CityAlert text={this.state.infoText} />
            </div>

        );
    }
}


export default CitySearch;