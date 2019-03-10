import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import EventIcon from '../components/EventIcon';
import appConstants from '../utils/appConstants';
import IconArrow from '../icons/IconArrow';
import '../styles/EventList.css';

const EventList = (props) => {
    const location = props.location;
    const openTabs = props.openTabs ? props.openTabs : null;
    const listID = 'the-event-list';
    const title = props.title;
    let events = <div className="single-day-events no-events">No hay eventos</div>;
    let tabHeader;
    let listClass = 'event-list tab-content';

    if (openTabs && openTabs.includes('events')) {
        listClass = 'event-list tab-content open';
    }

    if (props.onTabClick && title) {
        tabHeader = (
            <h2 onClick={() => props.onTabClick('events')}>
                {title}
                <IconArrow />
            </h2>
        );
    } else if (title) {
        tabHeader = <h2>{title}</h2>;
    } else {
        tabHeader = (
            <h2>
                {title}
                <IconArrow />
            </h2>
        );
    }

    if (props.events.length > 0) {
        events = props.events.map((day, index) => {
            let daySubtitle = null;

            if ( props.mode === 'days' ) {
                const date = new Date(day.year, day.month, day.day);
                const weekday = date.getDay();
                daySubtitle = <span>{appConstants.dayNamesAbbr[weekday]}</span>
            } else if (day.month) {
                daySubtitle = <span>{appConstants.monthNames[day.month]}</span>;
            }

            return(
                <div className="single-day-events" key={index} id={day.day}>
      
                    <ul>
                        {day.events.map((event, index) => {
                            const key = event.id;
                            const eventsRoute = appConstants.routes.events.path;
                            const tempPlacesRoute = appConstants.routes.tempPlaces.path;
                            const basePath = location && location.includes(tempPlacesRoute) ? tempPlacesRoute : eventsRoute;
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
                            );
                        })}
                    </ul>
                </div>
            );
        });
    }

    return(
        <div className={listClass} id={listID}>
            {tabHeader}
            {events}
        </div>
    );
}

EventList.propTypes = {
    events: PropTypes.array.isRequired,
    openTabs: PropTypes.array,
    location: PropTypes.string,
    title: PropTypes.string,
    mode: PropTypes.string,
    onTabClick: PropTypes.func
}

export default EventList;
