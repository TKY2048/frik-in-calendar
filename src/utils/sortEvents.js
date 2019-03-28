export const sortEvents = events => {
	let eventsByDay = [];
	
	const pushEvents = (event, startDate) => {
		const today = new Date();
		const newDay = startDate.getDate();
		const month = startDate.getMonth();
		const year = startDate.getFullYear();
		
		let dayItem = eventsByDay.findIndex(item => item['day'] === newDay);
		// If dayItem is not in eventsByDay AND date is valid, push dayItem to eventsByDay
		if ( dayItem === -1 && (newDay >= today.getDate() || month > today.getMonth() || year > today.getFullYear()) ) {
			eventsByDay.push({
				day: newDay,
				month: month,
				year: year,
				events: []
			});
		}
		
		dayItem = eventsByDay.findIndex(item => item['day'] === newDay);
		
		if (eventsByDay[dayItem]) {
			eventsByDay[dayItem]['events'].push(event);
		}
	};
	
	if (events.length > 0) {
		events.forEach(event => {
			const startDate = new Date(event.start_date.replace(/-/g, '/'));
			const endDate = event.end_date ? new Date(event.end_date.replace(/-/g, '/')) : startDate;
			pushEvents(event, startDate);
			
			//TODO: this is duplicating events. why?
			
			/*
			if (startDate < endDate) {
				startDate.setDate(startDate.getDate() + 1);
				while (startDate <= endDate) {
					pushEvents(event, startDate);
					startDate.setDate(startDate.getDate() + 1);
				}
			}
			*/
		});
		
		
		eventsByDay.forEach(function(day) {
			day['events'].sort(function(a, b) {
				if (a.start_time < b.start_time) {
					return -1;
				}
				if (a.start_time > b.start_time) {
					return 1;
				}
				
				return 0;
			});
		});
		
		
		// Sort events by date and time
		return eventsByDay.sort(function(a, b) {
			if (a.month < b.month) {
				return -1;
			} else if (a.month > b.month) {
				return 1;
			} else {
				return  a.day - b.day;
			}
		});
	} else {
		return events;
	}
};
