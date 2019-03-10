export default {
	siteURL: 'https://frik-in.com',
	shareURL: {
		news: 'https://noticias.frik-in.mx',
		cdmx: 'https://frik-in.mx',
		toluca: 'https://toluca.frik-in.mx',
	},
	developmentURL: 'http://localhost:3000',
	apiPath: '/wp-json/frik-in/v1/',
	siteTitle: 'Frik-in',
	siteDescription: 'La cara friki de tu ciudad.',
	siteImage: 'https://frik-in.io/wp-content/uploads/2018/06/Frik-in-FacebookShare.png',
	googleMapsUrl: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCiGXl87zmpx2fWkPb9dNJIitBkjHygdxw',
	facebookAppID: '521051611627486',
	twitterID: '@frik_in',
	categories: [
		{ id: 1, name: 'Todo', slug: 'main', color: '#990099', altColor: '#00cc99' },
		{ id: 35, name: 'Otaku', slug: 'otaku', color: '#ff0000', altColor: '#ff99ff' },
		{ id: 38, name: 'Cómics', slug: 'comics', color: '#ff6600', altColor: '#ffcc00' },
		{ id: 36, name: 'Gamer', slug: 'gamer', color: '#00bb00', altColor: '#ccff00' },
		{ id: 37, name: 'Sci-Fi & Fantasía', slug: 'sci-fi-fantasia', color: '#0000ee', altColor: '#33ffff' },
		{ id: 526, name: 'Coleccionismo', slug: 'coleccionismo', color: '#993300', altColor: '#c0c092' },
		{ id: 827, name: 'Tabletop', slug: 'tabletop', color: '#FFE840', altColor: '#00A0A0', inverted: true },
		//{ id: 636, name: 'Terror', slug: 'terror', color: '#000000', altColor: '#990000' }
	],
	routes: {
		site: {
			path: 'https://frik-in.com',
			title: 'Frik-in',
			image: 'https://frik-in.io/wp-content/uploads/2018/06/Frik-in-FacebookShare.png',
		},
		home: {
			path: '/',
			title: 'Frik-in'
		},
		collection: {
			path: '/coleccion',
			title: 'Álbum de Fribis'
		},
		places: {
			path: '/lugares',
			title: 'Lugares'
		},
		place: {
			path: '/lugares/:placeID',
			title: 'Lugar: '
		},
		subPlace: {
			path: '/lugares/:parentID/:placeID',
			title: 'Local: '
		},
		tempPlaces: {
			path: '/lugares/eventuales',
			title: 'Eventos Cerca de Ti'
		},
		tempPlace: {
			path: '/lugares/eventuales/:eventID',
			title: 'Evento: '
		},
		userPlaces: {
			path: '/lugares/favoritos',
			title: 'Mis Lugares Favoritos'
		},
		events: {
			path: '/eventos',
			title: 'Eventos'
		},
		event: {
			path: '/eventos/:eventID',
			title: 'Evento: '
		},
		userEvents: {
			path: '/eventos/mis-eventos',
			title: 'Mis Eventos Próximos'
		},
		news: {
			path: '/noticias',
			title: 'Noticias'
		},
		post: {
			path: '/noticias/:postID',
			title: 'Noticia: '
		}
	},
	defaultMapCenter: {
		lat:  19.432926,
		lng: -99.133208
	},
	defaultZoom: 17,
	launchDate: new Date(2018,5,1),
	minEventsDate: new Date(new Date().setHours(0,0,0,0)),
	disablePastEvents: true,
	eventsStartDay: 0,
	monthNamesFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
	monthNames: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
	dayNamesAbbr: ['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'],
	dayNames: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
	avatarParts: [
		{ name: 'Color 1', slug: 'color1' },
		{ name: 'Color 2', slug: 'color2' },
		{ name: 'Cabeza', slug: 'head' },
		{ name: 'Boca', slug: 'mouth' },
		{ name: 'Ojos', slug: 'eyes' },
		{ name: 'Orejas', slug: 'ears' },
		{ name: 'Cabello', slug: 'hair' },
		{ name: 'Extra', slug: 'extra' }
	],
	defaultOptions: {
		fav_category: 'main',
		hide_chains: 'false',
		avatar: '#990099,#00cc99,1,B-1,B-1,X,B-1,X',
		collection: 'B-1,B-2,B-3,B-4,B-5,B-6,B-7,B-8,B-9'
	},
	chainTag: 'Cadena',
	translation: {
		es: {
			'Sign In Account': 'Ingresa a tu Perfil',
			'Sign In': 'Iniciar Sesión',
			'Sign Up': 'Registro',
			'Sign Up Account': 'Registra tu Perfil',
			'Forgot Password': 'Recuperar Contraseña',
			'Resend Code': 'Reenviar Código',
			'Enter your username': 'Tu nombre de Usuario',
			'Reset your password': 'Restablece tu Contraseña'
		}
	},
};
