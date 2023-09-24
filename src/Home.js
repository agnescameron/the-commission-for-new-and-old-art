import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Item from './components/Item';
// import Events from 'Events'
import ReactMarkdown from 'react-markdown';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

import './Home.css'

export default function Home({isLoading, pages, events, dimensions}){
	
  const [timeManc, setTimeManc] = useState(new Date());
  const [timeNY, setTimeNY] = useState(new Date());
  const [timeVienna, setTimeVienna] = useState(new Date());

	function changeTimezone(date, ianatz) {
	  var invdate = new Date(date.toLocaleString('en-US', {
	    timeZone: ianatz
	  }));
	  var diff = date.getTime() - invdate.getTime();
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

      		{ dimensions.height > 850 &&

      		<> 
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
		 	</>
		 	}
	      		<div className="homeText">
				<h1>The Commission for New and Old Art</h1>
					<p>
						<i><Link to="https://c2bd3675.sibforms.com/serve/MUIFAJvfkE6fRqQ-NRa08DTvJRGHirQpaaeF7ltFfs2xZXjTzXeRMI0jV509AXrm_ffO-jXvA-BKaw3Rgln7K_D-U5QygExNiEvK3Ni5tbxpB4N_Eqt_lx5kDX41CD9aW2NawMo9R1zcg7AG3FetF2XZbsQjRyxUjX35s7tDn_NwyvrEb-1Mx8owj9ufHf1n-EFEVGg_hZwdyhIV">{ homeText }</Link></i>
					</p>
					<h2><Link to='/calendar'> ↘&#xFE0E; Calendar</Link></h2>
					<h2><Link to='/archive'> ↘&#xFE0E; Archive</Link></h2>
					<h2><Link to='/about'> ↘&#xFE0E; About</Link></h2>
		 		</div>
	 		</div>
			}
		</div>
	)
}
