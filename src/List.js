import React from 'react';
import ReactMarkdown from 'react-markdown'
import Footer from './components/Footer'
import { Link } from "react-router-dom";
import './List.css'

export default function List({isLoading, events}){

	const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

	return (
		<div>
	 		{ isLoading ? 'loading' : 
	 		<div className='pageContainer'>
	 		<h1>Almanac</h1>
	 			{ events.length > 0 && events.map( (event) => {
			 			const eventDate = new Date(Date.parse(event.fields['Date']))
			 			console.log(eventDate.getDate())
			 			return <div>
			 			<h2>{ month[eventDate.getMonth()] + ' ' + eventDate.getFullYear() }</h2>
			 			<div className='cal'>
			 				{[...Array(30)].map((e, i) => 
				 			i === eventDate.getDate() ? 
				 			<div className="eventElement">
				 				<p className="eventTitle"><Link to={"/" + event.id}>{ i + " ⇍ " + event.fields['Name'] }</Link></p>
				 			</div> :
				 			<div className="calElement"><p>{i}</p></div>)}
				 			</div>
			 			</div>
			 		})
	 			}
	 		</div>
			}
			<Footer/>
		</div>
	)
}

