// src/Event.js

import React, { Component } from "react";
import { Button } from "../node_modules/react-bootstrap";


class Event extends Component {

    //Initial state: all events are collapsed
    state = {
        event: {},
        collapsed: true
    }

    //On click, uncollapse event details
    handleClick = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    render() {
        const { event } = this.props;
        const { collapsed } = this.state;
        return (
            <div className="event">
                <p className="summary">{event.summary}</p>
                <p className="start-date">{event.start.datetime}</p>
                <p className="location">{event.location}</p>

                <Button className={`${collapsed ? "show" : "hide"}-details`}
                    onClick={this.handleClick}>{collapsed ? "Show Details" : "Hide Details"}</Button>

                {!collapsed && (
                    <div className={`extra-details ${this.state.collapsed ? "hide" : "show"}`} >
                        <p className='card-title'>About the event:</p>
                        <a className='event-link' href={event.htmlLink} rel="noreferrer" target="_blank">
                            See details
                        </a>
                        <p className="event-description">{event.description}</p>
                    </div>


                )};
            </div>)
    }
}


export default Event;