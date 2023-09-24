import React from 'react';
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import Footer from './components/Footer';

export default function Event({isLoading, events}){

	let params = useParams();

	const { id } = params ? params : 1;
	const event = events.length > 0 ? events.find(el => el.id === id) : null

	return (
		<div>
	 		{ isLoading ? 'loading' : 
	 		<div className='pageContainer'>
	 		{ event && 
		 		<div>
		 			{event.fields['Images'] && <img src={event.fields['Images'][0].url} />}
		 			<h1>{event.fields['Name']}</h1> 
		 			<h2>{event.fields['Date']} // {event.fields['Location']}</h2>
		 			<p><b>featuring:</b></p>
		 			<p>{event.fields['Performers']}</p>
		 		</div>
		 		}
	 		</div>
			}
		<Footer />
		</div>
	)
}

