import React from 'react';
import IconFestival from '../icons/IconFestival';
import IconMovies from '../icons/IconMovies';
import IconMusic from '../icons/IconMusic';
import IconCommercial from '../icons/IconCommercial';
import IconAcademic from '../icons/IconAcademic';

const EventIcon = (props) => {
	const types = props.types;
	let icon;

	if (types.includes('academico')) {
    icon = <IconAcademic />;
  } else if (types.includes('cine')) {
    icon = <IconMovies />;
  } else if (types.includes('comercial')) {
    icon = <IconCommercial />;
  } else if (types.includes('musical')) {
    icon = <IconMusic />;
  } else {
    icon = <IconFestival />;
  }
	return icon;
};

export default EventIcon;
