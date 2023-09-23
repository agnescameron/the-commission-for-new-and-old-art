import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Item from './components/Item';
// import Events from 'Events'
import ReactMarkdown from 'react-markdown';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

import './Home.css'

export default function Home({isLoading, pages, events}){
	
  const [timeManc, setTimeManc] = useState(new Date());
  const [timeNY, setTimeNY] = useState(new Date());
  const [timeVienna, setTimeVienna] = useState(new Date());

	function changeTimezone(date, ianatz) {

	  // suppose the date is 12:00 UTC
	  var invdate = new Date(date.toLocaleString('en-US', {
	    timeZone: ianatz
	  }));

	  // then invdate will be 07:00 in Toronto
	  // and the diff is 5 hours
	  var diff = date.getTime() - invdate.getTime();

	  // so 12:00 in Toronto is 17:00 UTC
	  return new Date(date.getTime() - diff); // needs to substract

	}

  const setTimes = () => {
  	const date = new Date();
  	setTimeManc(changeTimezone(date, "Europe/London")); 
  	setTimeNY(changeTimezone(date, "America/New_York")); 
  	setTimeVienna(changeTimezone(date, "Europe/Vienna"));
  }

	useEffect(() => {
		const interval = setInterval(() => setTimes(), 1000); 
		return () => {
			clearInterval(interval);
		};
	}, []);

	const homeText = pages.length > 0 ? pages.find(el => el.fields['Name'] === 'Home').fields['Text'] : null

	return (

		<div>
	 		{ isLoading ? 'loading' : 
	 		<div>

      		<div className='clocks'>

      		<div>
				<h2>Manchester</h2>
      			<Clock value={timeManc} /> 
      		</div>
      		<div>
      			<h2>New York</h2>
      			<Clock value={timeNY} /> 
      		</div>
      		<div>
				<h2>Vienna</h2>
      			<Clock value={timeVienna} />
      			</div>
      		</div>

      		<div className="homeText">
			<h1>The Commission for New and Old Art</h1>
				<p>
					<i>{ homeText }</i>
				</p>
				<h2><Link to='/calendar'> ↘ Calendar</Link></h2>
				<h2><Link to='/archive'> ↘ Archive</Link></h2>
				<h2><Link to='/about'> ↘ About</Link></h2>
	 		</div>
	 		</div>
			}
		</div>
	)
}
