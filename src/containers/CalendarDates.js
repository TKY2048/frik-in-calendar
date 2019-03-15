import React, {Component} from 'react';
import PropTypes from 'prop-types';
import appConstants from '../utils/appConstants';

const today = new Date(new Date().setHours(0,0,0,0));

class CalendarDates extends Component {
	constructor(props) {
		const year = today.getFullYear();
		const month = today.getMonth();
		const day = today.getDate();
		super(props);

		this.state = {
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
			date: new Date().getDate(),
			events: this.getMonthEvents(this.props.events),
		}
	}

	getMonthEvents = (events) => {
		let currentMonth = this.props.month;
		let currentYear = this.props.year;
		return events.filter(event => {
			const eventDate = new Date(event.start_date.replace(/-/g, '/'));
			return (eventDate.getMonth() === currentMonth) && (eventDate.getFullYear() === currentYear);
		});
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.month !== this.props.month) {
			console.log("getting month events");
			this.setState(
				{
					events: this.getMonthEvents(this.props.events),
				}
			);
		}
	}


	dayHasEvents = (day) => {
		const events = this.state.events;
		const category = this.props.category;
		let dayEvents = [];

		if (day >= today)
		{
			if (this.props.category.slug === 'main')
			{
				dayEvents = events.filter(event => {
					const eventDate = new Date(event.start_date.replace(/-/g, '/'));
					return ((eventDate.getDate() === day.getDate()))
				});
			}else {
				dayEvents = events.filter(event => {
					const eventDate = new Date(event.start_date.replace(/-/g, '/'));
					return ((eventDate.getDate() === day.getDate()) && event.categories.find(cat => cat === category.slug))
				});
			}
		}
		return dayEvents.length > 0;
	};


	render() {
		const weekStack = Array.apply(null, { length: 7 }).map(Number.call, Number); //     [1,2,3,4,5,6,7]
		const daysInMonth = this.props.daysInMonth;
		const startDay = this.props.firstOfMonth.getUTCDay();
		const first = this.props.firstOfMonth.getDay();
		/**
		 * Minimum row span of ANY given month
		 * @type {number}
		 */
		let rows = 5;

		let haystack, day, d, current, isDate, className, cells;

		/**
		 * If something something the month needs 6 rows, else, it needs 7 rows.
		 */
		if ((startDay === 5 && daysInMonth === 31) || (startDay === 6 && daysInMonth > 29 )) {
			rows = 6;
		} else if ((startDay === 0 && first === 7 && daysInMonth > 29) || (startDay === 0 && first === 6 && daysInMonth === 31)) {
			rows = 7;
		}

		/**
		 * Base row classname
		 * @type {string}
		 */
		className = 'r-dates rows-' + rows;


		haystack = Array.apply(null, { length: rows }).map(Number.call, Number);                  // Filling rows (weeks) with day numbers.

		// day of the week? monday?
		//day = zero for some reason + 1 - firstOfMoth's day of the week
		day = appConstants.eventsStartDay + 1 - first;

		//While there are still days in the week.
		while (day > 1) {
			// Something something weeks
			day -= 7;
		}
		//Okay
		day -= 1;

		let row = haystack.map((item, i) => {

			d = day + i * 7;
			cells = weekStack.map((item, i) => {
				d += 1;
				isDate = d > 0 && d <= this.props.daysInMonth;

				current = new Date(this.props.year, this.props.month, d);

				if (isDate) {
					const dayHasEvents = this.dayHasEvents(current);
					let catMarkers;

					if (dayHasEvents) {
						catMarkers = (
							<div className="day-categories">
								{ <span key={i} className={this.props.category.slug} />}
							</div>
						);
					}


					let cellClass = current.valueOf() !== today.valueOf() ? 'r-cell r-date' : 'r-cell r-date r-today';
					let isPast = false;
					let noEvents = false;
					if (appConstants.disablePastEvents && current < today) {
						cellClass += ' r-past';
						isPast = true;
					} else if (appConstants.minEventsDate !== null && current < appConstants.minEventsDate) {
						cellClass += ' r-past';
						isPast = true;
					}

					if (!dayHasEvents) {
						cellClass += ' no-events';
						noEvents = true;
					}

					if (!noEvents && !isPast && this.props.selectedDate.valueOf() === current.valueOf()) {
						cellClass += ' r-selected';
					}

					return (
						<div key={i} className={cellClass} role="button" onClick={this.props.onDateClick.bind(this, this.props.year, this.props.month, d)}>
							{d}
							{catMarkers}
						</div>
					);
				}

				return (<div key={i} className='r-cell' />);
			});

			return (
				<div key={i} className="r-row">
					{cells}
				</div>
			);
		});

		return (
			<div className={className}>
				{row}
			</div>
		);
	}
}

CalendarDates.propTypes = {
	category: PropTypes.object.isRequired,
	events: PropTypes.array.isRequired,
	year: PropTypes.number.isRequired,
	month: PropTypes.number.isRequired,
	selectedDate: PropTypes.object.isRequired,
	firstOfMonth: PropTypes.object.isRequired,
};

export default CalendarDates;
