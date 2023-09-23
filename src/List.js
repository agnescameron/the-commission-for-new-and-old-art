import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown'
import Footer from './components/Footer'
import { Link } from "react-router-dom";
import './List.css'

function onlyUnique(value, index, array) {
 	return array.indexOf(value) === index;
}

function getEventsInMonth(month, events) {
	let eventsInMonth = []

	events.forEach( (event) => {
		const eventDate = new Date(Date.parse(event.fields['Date']))
		const dateFormat = eventDate.getMonth() + ' ' + eventDate.getFullYear()
		if(dateFormat === month) eventsInMonth.push(event)
	})
	return eventsInMonth
}


function getEventOnDate(day, events) {
	let foundEvent = null
	events.forEach( (event) => {
		const eventDate = new Date(Date.parse(event.fields['Date']))
		const dateFormat = eventDate.getDate()
		if(dateFormat === day) {
			foundEvent = event
		}
	})
	return foundEvent
}


function daysInMonth (month, year) {
	console.log('month is', month, 'year is', year)
    return new Date(parseInt(year), parseInt(month) + 1, 0).getDate();
}

export default function List({isLoading, events}){

	// const [dates, setDates] = React.useState([])
	const [dates, setDates] = React.useState([])
	const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];

	useEffect(() => {
		let tempDates = []

		events.sort(function(a, b) {
		    return Date.parse(a.fields['Date']) - Date.parse(b.fields['Date']);
		});

		events.forEach( (event) => {
			const eventDate = new Date(Date.parse(event.fields['Date']))
			tempDates.push(eventDate.getMonth() + ' ' + eventDate.getFullYear())
		})

		tempDates = tempDates.filter(onlyUnique)
		console.log('dates is', tempDates, 'events is', events)
		setDates(tempDates)

	}, [events])

	return (
		<div>
	 		{ isLoading ? 'loading' : 
	 		<div className='pageContainer'>
	 		<h1>Almanac</h1>
	 			{ dates.length > 0 && dates.map( (month) => {
	 					const monthEvents = getEventsInMonth(month, events)
	 					const monthDates = monthEvents.map(event => event.fields["Date"])
	 					const numDays = daysInMonth(month.substring(0, month.length - 5), month.substring(month.length-4, month.length))

			 			return <div>
				 			<h2>{ monthList[month.substring(0, month.length - 5)] + ' ' + month.substring(month.length-4, month.length) }</h2>
				 			<div className='cal'>
				 				{[...Array(numDays)].map((e, i) => {
						 			const dateEvent = getEventOnDate(i+1, monthEvents)
						 			return  dateEvent !== null ? 
						 			<div className="eventElement" key={i}>
						 				<p className="eventTitle"><Link to={"/" + dateEvent.id}>{ (i+1) + " ⇍ " + dateEvent.fields['Name'] }</Link></p>
						 			</div> :
						 			<div className="calElement" key={i}><p>{i+1}</p></div>}
						 			)}
						 			</div>
				 			</div>
			 		// })
	 			})
	 			}
	 		</div>
			}
			<Footer/>
		</div>
	)
}

