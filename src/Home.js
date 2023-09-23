import React from 'react';
import Item from './components/Item';
import ReactMarkdown from 'react-markdown';

import './Home.css'

export default function Home({isLoading, pages, events}){
	const upcomingEvents = events.length > 0 ? events.filter(el => Date.parse(el.fields['Date']) >= new Date()) : []
	const pastEvents = events.length > 0 ? events.filter(el => Date.parse(el.fields['Date']) < new Date()) : []
	const homeText = pages.length > 0 ? pages.find(el => el.fields['Name'] === 'Home').fields['Text'] : null

	return (

		<div>
		<h1>The Commission for New and Old Art</h1>

			<p>
				{ homeText }
			</p>
	 		{ isLoading ? 'loading' : 
	 		<div>
	 			<h2>upcoming:</h2>
	 			{ upcomingEvents.length > 0 && upcomingEvents.map( (event) => {
			 			return <div>
			 				<h3>{ event.fields['Name'] }</h3>
			 				<p>{ event.fields['Date'] } * { event.fields['Location'] }</p>
			 				<ReactMarkdown>{ event.fields['Text'] }</ReactMarkdown>
			 			</div>
			 		})
	 			}

	 			<h2>past:</h2>
	 			{ pastEvents.length > 0 && pastEvents.map( (event) => {
			 			return <div>
			 				<h3>{ event.fields['Name'] }</h3>
			 				<p>{ event.fields['Date'] } * { event.fields['Location'] }</p>
			 				<ReactMarkdown>{ event.fields['Text'] }</ReactMarkdown>
			 			</div>
			 		})
	 			}
	 		</div>
			}
		</div>
	)
}
