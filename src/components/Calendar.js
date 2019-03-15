import React from 'react';
import PropTypes from 'prop-types';
import CalendarHeader from '../components/CalendarHeader';
import appConstants from '../utils/appConstants';
import '../styles/Calendar.css';
import CalendarDates from "../containers/CalendarDates";


const Calendar = (props) => {
	const calendarTitle = props.selectedDate.getDate()+ ' de ' + appConstants.monthNamesFull[props.selectedDate.getMonth()] + ' de ' + props.year;
	const haystack = Array.apply(null, { length: 7 }).map(Number.call, Number);
	let cells;
	const today = new Date(new Date().setHours(0,0,0,0));

	cells = haystack.map((item, i) => {
		return (
			<div key={i} className="r-cell">
				{appConstants.dayNames[(appConstants.eventsStartDay + i) % 7]}
			</div>
		);
	});

	let firstDate = new Date(props.daysWithEvents[0]);
	let lastDate = new Date(props.daysWithEvents.slice(-1)[0]);
	return (
		<div className="calendar">
			<div className="calendar-inner">
				<CalendarHeader
					title={calendarTitle}
					onHeaderClick={props.onHeaderClick}
                              onDayChange={props.onDayChange}
					first={firstDate.getTime() === props.selectedDate.getTime()}
					last={lastDate.getTime() === props.selectedDate.getTime()}
				/>
				<CalendarDates
					category={props.category}
					year={props.year}
					month={props.selectedDate.getMonth()}
					selectedDate={props.selectedDate}
					firstOfMonth={props.firstOfMonth}
					onDateClick={props.onDateClick}
					daysInMonth={props.daysInMonth}
					events={props.events}
				/>

				<div className="r-row r-weekdays">
					{cells}
				</div>
			</div>
		</div>
	);
};

Calendar.propTypes = {
	year: PropTypes.number.isRequired,
	month: PropTypes.number.isRequired,
	onDateClick: PropTypes.func.isRequired,
	onHeaderClick: PropTypes.func.isRequired,
};

export default Calendar;
