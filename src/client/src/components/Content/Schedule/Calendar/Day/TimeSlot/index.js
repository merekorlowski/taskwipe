
import React, { Component } from 'react';
import './styles.css';
import Moment from 'react-moment';
import moment from 'moment';


class TimeSlot extends Component {
    constructor(props) {
        super(props);
        this.time = moment().hour(this.props.hour).minute(0);
    }

    render() {
        return (
            <div className="time-slot">
                <Moment format="HH:mm">
                    {this.time}
                </Moment>
            </div>  
        )
    }
}

export default TimeSlot;