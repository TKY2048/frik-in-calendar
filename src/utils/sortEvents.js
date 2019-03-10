export const sortEvents = (events, month = false) => {
	let eventsByDay = [];
	const pushEvents = (event, date) => {
		const today = new Date();
		const newDay = date.getDate();
		const month = date.getMonth();
		const year = date.getFullYear();
		let dayItem = eventsByDay.findIndex(item => item['day'] === newDay);
		if (dayItem === -1 && (newDay >= today.getDate() || month > today.getMonth() || year > today.getFullYear())) {
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
	}
	
	if (events.length > 0) {
		events.forEach(function(event) {
			const startDate = new Date(event.start_date.replace(/-/g, '/'));
			const endDate = event.end_date ? new Date(event.end_date.replace(/-/g, '/')) : startDate;
			
			if (Object.prototype.toString.call(startDate) === '[object Date]') {
				if (month === false || month === startDate.getMonth()) {
					pushEvents(event, startDate);
				}
			}
			
			if (Object.prototype.toString.call(endDate) === '[object Date]' &&  startDate < endDate) {
				startDate.setDate(startDate.getDate() + 1);
				while (startDate <= endDate) {
					if (month === false || month === startDate.getMonth()) {
						pushEvents(event, startDate);
					}
					startDate.setDate(startDate.getDate() + 1);
				}
			}
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
}
