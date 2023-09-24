import React, {useState, useEffect, useRef} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import dotenv from 'dotenv'; 
import './App.css';
import Home from './Home';
// import Archive from './Archive';
import News from './News';
import List from './List';
import Event from './Event';
import Contact from './Contact';
import About from './About';
import Item from './components/Item';
import Header from './components/Header';
// import Home from './Home';
const Airtable = require('airtable');

// configure env variables
dotenv.config()
const process_api_key = process.env.REACT_APP_AIRTABLE_API_KEY;
const airtable_base = process.env.REACT_APP_AIRTABLE_BASE;

function App() {

	const [title, setTitle] = useState('The Commission for New and Old Art * ');
	const titleRef = useRef(title);
	titleRef.current = title;
	const [events, setEvents] = useState([]);
	const [pages, setPages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [headers, setHeaders] = useState([])

	Airtable.configure({
			endpointUrl: 'https://api.airtable.com',
			apiKey: process_api_key
	});

	const base = Airtable.base(airtable_base);
	const upcomingEvents = events.length > 0 ? events.filter(el => Date.parse(el.fields['Date']) >= new Date()) : []
	const pastEvents = events.length > 0 ? events.filter(el => Date.parse(el.fields['Date']) < new Date()) : []


	const changeTitle = () => {
		document.title = titleRef.current;
		const newTitle = titleRef.current.substr(1) + titleRef.current.substr(0, 1)
		console.log(newTitle)
		setTitle(newTitle);
	}

	//get pages first
	useEffect(()=>{
			base('Pages').select().all().then(records => {
					console.log(records);
					setPages(records);
			})
			.then(setIsLoading(false))
			.catch(err => {
					console.error(err);
			});

	},[])

	//then get events
	useEffect(()=>{
			base('Events').select().all().then(records => {
					console.log(records);
					setEvents(records);
			})
			.catch(err => {
					console.error(err);
			});
	},[])


	//scroll title text
	useEffect(() => {
		const titleInterval = setInterval(() => changeTitle(), 100); 
		return () => {
			clearInterval(titleInterval);
		};
	}, []);

	return (
		<div className="App">
			<Router>
				<Helmet>
					<meta name="description" content="the Commission for New and Old Art" />
					<meta name="keywords" content="commission manchester vienna new york" />
				</Helmet>
				<div className="content">
					{/*<Header />*/}
					<Routes>
						<Route exact path="/" element={<Home isLoading={isLoading} pages={pages} events={events}/>}/>
						<Route exact path="/about" element={<About isLoading={isLoading} pages={pages}/>}/>
						<Route exact path="/archive" element={<List isLoading={isLoading} events={pastEvents} title="Archive"/>}/>
						<Route exact path="/calendar" element={<List isLoading={isLoading} events={upcomingEvents} title="Almanac"/>}/>
						<Route exact path="/contact" element={<Contact isLoading={isLoading}/>}/>
						<Route exact path="/recent" element={<News isLoading={isLoading}/>}/>
						<Route path="/:id" element={<Event isLoading={isLoading} events={events}/>}/>
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;