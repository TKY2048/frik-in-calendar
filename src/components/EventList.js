import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import EventIcon from '../components/EventIcon';
import appConstants from '../utils/appConstants';
import '../styles/EventList.css';

const EventList = (props) => {
    const listID = 'the-event-list';
    let events = <div className="single-day-events no-events">No hay eventos</div>;
    let listClass = 'event-list tab-content';

    if (props.events.length > 0) {

        events = props.events.map((event, index) => {
            const key = event.id;
            const basePath = appConstants.routes.events.path;
            const path = basePath + '/' + key;
            const name = Parser(event.title.split( ' (' )[0]);
            const startTime = event.start_time;
            const endTime = event.end_time;
            let eventCategories = [];
            let hours = '';
    
            if (startTime && startTime !== '') {
                hours += startTime;
        
                if (endTime && endTime !== '') {
                    hours += ' - ' + endTime;
                }
            }
    
            if (event.categories) {
                const rawCats = event.categories;
                rawCats.forEach(function(rawCat) {
                    const newCat = appConstants.categories.find(cat => cat.slug === rawCat);
                    if (newCat) {
                        eventCategories.push(newCat);
                    }
                });
            }
    
            const eventLink = 'https://frik-in.com' + path;
            
            return(
                <div className="single-day-events" key={index}>
                    <ul>
                                <li key={key}>
                                    <a href={eventLink} target="_blank">
                                        <EventIcon types={event.types} />
                                        <h3>{name}</h3>
                                        <span className="event-hours">{hours}</span>
                                        <div className="day-categories">
                                            {eventCategories.map((cat, index) => (
                                                  <span className={'category ' + cat['slug']} key={cat['id']} />
                                            ))}
                                        </div>
                                    </a>
                                    
                                </li>
                    </ul>
                </div>
            );
        });
    }

    return<div className={listClass} id={listID}>
            {events}
        </div>;
};

EventList.propTypes = {
    events: PropTypes.array.isRequired,
};

export default EventList;
