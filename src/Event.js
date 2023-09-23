import React from 'react';
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'

export default function Event({isLoading, events}){

	let params = useParams();

	const { id } = params ? params : 1;
	const event = events.length > 0 ? events.find(el => el.id === id) : null
	console.log('location is', params, 'event is', event)

	return (
		<div>
	 		{ isLoading ? 'loading' : 
	 		<div>

	 		</div>
			}
		</div>
	)
}

