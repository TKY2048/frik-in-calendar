import React from 'react';
import appConstants from '../utils/appConstants'
import { sortEvents} from '../utils/sortEvents.js';
import Header from '../components/Header'
import '../styles/App.css';
import Calendar from "../components/Calendar";
import EventList from '../components/EventList';

const today = new Date(new Date().setHours(0,0,0,0));

/**
 *  Main App Container
 */
class App extends React.Component
{
	constructor(props) {
		super(props);
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();

		this.state = {
			year: new Date().getFullYear(),
			month: new Date().getMonth(),
			date: new Date().getDate(),
			events: [],
			toggleCalendar: false,
			category: appConstants.categories[0],//should be slug?
			dayEvents: [],
			selectedDate: new Date(year, month, day),
			currentCategory: appConstants.categories[0],
			catNavActive: false,
			firstOfMonth: new Date(year,month,1),
			daysInMonth: new Date(year, month + 1 , 0 ).getDate(),
			lastOfMonth: new Date(year, month, 0 ),
			daysWithEvents: [],
			dataIsLoaded: false,
			daysWithEventsIndex: 0
		};
	}
	slugToCategory = slug => {
		let category;
		
		switch (slug) {
			case 'main':
				category = appConstants.categories[0];
				break;
			case 'otaku':
				category = appConstants.categories[1];
				break;
			case 'comics':
				category = appConstants.categories[2];
				break;
			case 'gamer':
				category = appConstants.categories[3];
				break;
			case 'sci-fi-fantasia':
				category = appConstants.categories[4];
				break;
			case 'coleccionismo':
				category = appConstants.categories[5];
				break;
			case 'tabletop':
				category = appConstants.categories[6];
				break;
			default:
				category = appConstants.categories[0];
		}
		return category;
	};
	toggleCategories = () => {
		this.setState(prevState => ({
			catNavActive: !prevState.catNavActive
		}));
	};
	setCategory = (category) => {
	
	};
	getDaysWithEvents = () => {
		let daysWithEvents = [];
		let sortedDates;

		if(this.state.category.slug === 'main')
		{
			this.state.events.forEach( event =>
				{
					if (new Date(event.start_date.replace(/-/g, '/')) >= today)
					{
						if (!daysWithEvents.includes(new Date (event.start_date.replace(/-/g, '/'))))
						{
							daysWithEvents.push(new Date (event.start_date.replace(/-/g, '/')));
						}
					}
				}
			);
		}else {

			let eventsOfCategory = this.state.events.filter(event => event.categories.find(cat => cat === this.state.category.slug));
			eventsOfCategory.forEach( event =>
			{
				if (new Date(event.start_date.replace(/-/g, '/')) >= today)
				{
					if (!daysWithEvents.includes(new Date (event.start_date.replace(/-/g, '/'))))
					{
						daysWithEvents.push(new Date (event.start_date.replace(/-/g, '/')));
					}
				}
			});
		}
			sortedDates = daysWithEvents.sort(function (date1, date2) {
				if (date1 > date2) return 1;
				if (date1 < date2) return -1;
				return 0;
			});

		function removeDups(names) {
			let unique = {};
			names.forEach(function(i) {
				if(!unique[i]) {
					unique[i] = true;
				}
			});
			return Object.keys(unique);
		}

		let finalArray = removeDups(sortedDates);
		this.setState(
			{
				daysWithEvents: finalArray,
				selectedDate: new Date(finalArray[0]),
			}
		);
	};

	componentDidMount()
	{
		let params = new URLSearchParams(window.location.search);
		let slug = params.get('category');
		let category = this.slugToCategory(slug);
		this.setState(
			{
				category: category,
				currentCategory: category,
			});

		let dataURL = "https://frik-in.mx/wp-json/frik-in/v1/events";
		fetch(dataURL)
			.then(res => res.json())
				.then(res => this.setState({events: res}))
					.then(() => this.setState({dataIsLoaded: true}))
						.then(() => {this.getDaysWithEvents()});
	}

	componentDidUpdate(prevProps, prevState)
	{
		if (this.state.events !== prevState.events || this.state.selectedDate !== prevState.selectedDate)
		{
			this.filterEvents();
		}
	}

	filterEvents = () => {

		const currentCategory = this.state.category.slug;
		const events = this.state.events;
		let newEvents;                                                      // Array containing events filtered from events
		let selectedDate = this.state.selectedDate.getTime();
		if (currentCategory === 'main')
		{
			newEvents = events.filter(event => {
				const eventDate = new Date(event.start_date.replace(/-/g, '/'));  // current event starting date
				const eventEndDate = event.end_date ? new Date(event.end_date.replace(/-/g, '/')) : null; // current event starting date
				
				return( (eventDate.getTime() === selectedDate) || (eventDate < selectedDate && eventEndDate >= selectedDate));
				//return (eventDate.getTime() === selectedDate);
			});
		} else {
			newEvents = events.filter(event => {
				const eventDate = new Date(event.start_date.replace(/-/g, '/'));
				const eventEndDate = event.end_date ? new Date(event.end_date.replace(/-/g, '/')) : null;
				return ( ((eventDate.getTime() === selectedDate) || (eventDate < selectedDate && eventEndDate >= selectedDate)) && event.categories.find(cat => cat === currentCategory));
			});
		}
		newEvents = sortEvents(newEvents);
		this.setState({dayEvents: newEvents});
	};

	handleDateClick = (year, month, date) => {
		let selectedDate = new Date(year,month,date);
		this.setState({
			year: year,
			month: month,
			date: date,
			selectedDate: selectedDate,
			daysWithEventsIndex: this.state.daysWithEvents.indexOf(selectedDate.toString()),
		});
	};

	handleDayChange = (direction) => {
		let nextSelectedDay;
		let index;
		if (direction === 'next')
		{
			if (this.state.daysWithEventsIndex === (Array.from(this.state.daysWithEvents).length) - 1)
			{
				index = this.state.daysWithEventsIndex;
			}
			else {
				index = this.state.daysWithEventsIndex + 1;
			}
			nextSelectedDay = new Date(this.state.daysWithEvents[index]);
			this.setState({daysWithEventsIndex: index});
		}else{	// direction === 'prev'
			if (this.state.daysWithEventsIndex === 0)
			{
				index = this.state.daysWithEventsIndex;
			}
			else {
				index = this.state.daysWithEventsIndex - 1;
			}

			nextSelectedDay = new Date(this.state.daysWithEvents[index]);
			this.setState({daysWithEventsIndex: index})
		}

		let daysInMonth = new Date(nextSelectedDay.getFullYear(), nextSelectedDay.getMonth() +1, 0 ).getDate();
		let firstOfMonth =  new Date(nextSelectedDay.getFullYear(), nextSelectedDay.getMonth(),1);
		let lastOfMonth = new Date(nextSelectedDay.getFullYear(), nextSelectedDay.getMonth() + 1, 0);
		this.setState(
			{
				selectedDate: nextSelectedDay,
				month: nextSelectedDay.getMonth(),
				daysInMonth: daysInMonth,
				firstOfMonth: firstOfMonth,
				lastOfMonth: lastOfMonth,
				}
		);

	};

	handleCalendarHeaderClick = () => {
		this.setState(prevState => ({
			toggleCalendar: !prevState.toggleCalendar
		}));
	};

	render() {
		let appClassName ='app ' + this.state.currentCategory.slug + ' with-events' ;
		let className;
		this.state.toggleCalendar ? className = "events expanded" : className="events";
		let dataIsLoaded = this.state.dataIsLoaded;
		return(
				<div className={appClassName}>
						<div className={className}>

							{dataIsLoaded &&	<Header
								toggleCategories={this.toggleCategories}
								setCategory={this.setCategory}
								currentCategory={this.state.currentCategory}
								catNavActive={this.state.catNavActive}
								category={this.state.category}
								/>}
							{dataIsLoaded && <Calendar
								year={this.state.year}
								month={this.state.month}
								onDateClick={this.handleDateClick}
								onHeaderClick={this.handleCalendarHeaderClick}
								selectedDate={this.state.selectedDate}
								onDayChange={this.handleDayChange}
								toggleCalendar={this.state.toggleCalendar}
								category={this.state.currentCategory}
								events={this.state.events}
								firstOfMonth={this.state.firstOfMonth}
								daysInMonth={this.state.daysInMonth}
								daysWithEvents={this.state.daysWithEvents}
							/>}

							{dataIsLoaded && <EventList
							events={this.state.dayEvents}
							mode="days"
							selectedDate={this.state.selectedDate}
						/>}

					</div>
				</div>
		);
	}
}

export default App;
