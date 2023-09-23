import React from 'react';
import { Link } from "react-router-dom";

export default class Item extends React.Component{

	constructor(props) {
		super(props);
	}

	render() {
		console.log('props is', this.props)
		return (
			<div>
				<Link to={"/" + this.props.id }>{ this.props.fields.Name }</Link>
			</div>
		)
	}
}