import React from 'react';
import PropTypes from 'prop-types';
import IconArrow from '../icons/IconArrow';
import '../styles/CalendarHeader.css';


const CalendarHeader = (props) => {

	const prevClass = props.first === true ? 'r-cell r-prev disabled' : 'r-cell r-prev';
	const nextClass = props.last === true ? 'r-cell r-next disabled' : 'r-cell r-next';

	return(
		<div className="calendar-header r-row r-head">
			<div className={prevClass} role="button" tabIndex="0" onClick={() => {props.onDayChange('prev')}}>
				<IconArrow />
			</div>
			<div className="r-cell r-title" onClick={props.onHeaderClick}>
				<h2>
					{props.title}
					<IconArrow/>
				</h2>
			</div>
			<div className={nextClass} role="button" tabIndex="0" onClick={() => {props.onDayChange('next')}}>
				<IconArrow />
			</div>
		</div>
	);

};


CalendarHeader.propTypes = {
	title: PropTypes.string.isRequired,
	onDayChange: PropTypes.func.isRequired,
	onHeaderClick: PropTypes.func.isRequired,
	first: PropTypes.bool,
	last: PropTypes.bool
};

export default CalendarHeader;
