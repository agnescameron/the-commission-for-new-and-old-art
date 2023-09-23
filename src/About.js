import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";
import Footer from './components/Footer';

export default function About({isLoading, pages}){
	const aboutText = pages.length > 0 ? pages.find(el => el.fields['Name'] === 'About').fields['Text'] : null


	return (
		<div>
		{ isLoading ? 'loading' :
      	<div className='aboutContainer'>
			<h1>About the Commission</h1>
				<ReactMarkdown>
					{ aboutText }
				</ReactMarkdown>

		 </div>
		}
		<Footer/>
		</div>
	)
}