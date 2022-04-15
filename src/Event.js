// src/Event.js

import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { format } from 'date-fns';

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

    /*<Button className={`${collapsed ? "show" : "hide"}-details`}
                    onClick={this.handleClick}>{collapsed ? "Show Details" : "Hide Details"}</Button>
                    <p className='card-title'>About the event:</p>
                       <div className="location" >{event.location}</div>*/

    render() {
        const { event } = this.props;
        const { collapsed } = this.state;
        const { formatteddate } = event.start.dateTime.slice(0, 10);
        return (
            <div className="event">

                <div className="summary" onClick={this.handleClick}>{event.summary}

                    <div className="location">{event.location} </div>

                    <div className="start-date">{event.start.dateTime.slice(0, 10)}
                        at {event.start.dateTime.slice(11, 16)} ({event.start.timeZone})
                    </div>
                </div>







                {!collapsed && (
                    <div className={`extra-details ${this.state.collapsed ? "hide" : "show"}`} >



                        <p className="event-description">{event.description}</p>

                        <a className='event-link' href={event.htmlLink} rel="noreferrer" target="_blank">
                            View details
                        </a>
                    </div>

                )}
                <hr />
            </div>)
    }
}


export default Event;