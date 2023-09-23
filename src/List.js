import React from 'react';
import ReactMarkdown from 'react-markdown'

export default function List({isLoading, events}){

	return (
		<div>
	 		{ isLoading ? 'loading' : 
	 		<div>
	 			{ events.length > 0 && events.map( (event) => {
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

