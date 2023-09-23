import React from 'react';
import Item from './components/Item';
import ReactMarkdown from 'react-markdown';

import './Home.css'

export default function Home({isLoading, pages, events}){
	const upcomingEvents = events.length > 0 ? events.filter(el => Date.parse(el.fields['Date']) >= new Date()) : []
	const pastEvents = events.length > 0 ? events.filter(el => Date.parse(el.fields['Date']) < new Date()) : []


	return (
		<div>
	 		{ isLoading ? 'loading' : 
	 		<div>
	 			<h1>upcoming:</h1>
	 			{ upcomingEvents.length > 0 && upcomingEvents.map( (event) => {
			 			return <div>
			 				<h2>{ event.fields['Name'] }</h2>
			 				<ReactMarkdown>{ event.fields['Text'] }</ReactMarkdown>
			 			</div>
			 		})
	 			}

	 			<h1>past:</h1>
	 			{ pastEvents.length > 0 && pastEvents.map( (event) => {
			 			return <div>
			 				<h2>{ event.fields['Name'] }</h2>
			 				<ReactMarkdown>{ event.fields['Text'] }</ReactMarkdown>
			 			</div>
			 		})
	 			}
	 		</div>
			}
		</div>
	)
}
