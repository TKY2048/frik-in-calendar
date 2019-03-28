export const sortEvents = events => {
	if (events.length > 0) return events.sort( (a, b) => {
				if (a.start_time < b.start_time) return -1;
				if (a.start_time > b.start_time) return 1;
				return 0;
		}); else return events;
};
