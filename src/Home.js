import React from 'react';
import Item from './components/Item';
// import Events from 'Events'
import ReactMarkdown from 'react-markdown';

import './Home.css'

export default function Home({isLoading, pages, events}){
const homeText = pages.length > 0 ? pages.find(el => el.fields['Name'] === 'Home').fields['Text'] : null

	return (

		<div>
	 		{ isLoading ? 'loading' : 
	 		<div>
			<h1>The Commission for New and Old Art</h1>
				<p>
					{ homeText }
				</p>
	 		</div>
			}
		</div>
	)
}
