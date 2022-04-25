import React, { Component } from 'react';


class CityAlert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
    }

    render() {
        return (
            <div className="CityAlert" >{this.props.text}</div>
        );
    }
}

class NumberAlert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
    }

    render() {
        return (
            <div className="NumberAlert" >{this.props.text}</div>
        );
    }
}


export { CityAlert, NumberAlert };