/*
 * AUTHOR:  Adam Walters
 *
 * CREATED:  11/30/2021
 * MODIFIED: 11/30/2021
 */

import React from 'react';
import MenuItem from '../../classes/menu-item';
import MenuSectionEntry from './menu-section-entry';

import './styles.css';


interface MenuSection_Props {
	name: string,
	image: string,
	alt?: boolean,
	menuItems: MenuItem[],
	haveOptions: boolean
};

export default class MenuSection extends React.Component<MenuSection_Props, {}> {

	constructor(props: MenuSection_Props) {
		super(props);
	}

	render() {

		// Generate style
		let style: React.CSSProperties = {}
		if (this.props.alt) {
			style.flexDirection = "row-reverse";
		}
		if (this.props.haveOptions) {
			style.height = "700px";
		}
		
		// Return component with generated title/image and list of entries
		const haveOptions = this.props.haveOptions;
		return (
			<div className="menu-section" style={style}>
				<div className="menu-section-list">
					<span className="menu-section-title">{this.props.name}</span>
					{this.props.menuItems.map((x) => {
						return (
							<MenuSectionEntry menuItem={x} haveOptions={haveOptions} />
						);
					})}
				</div>
				<div className="menu-section-image-container">
					<img className="menu-section-image" src={this.props.image} />
				</div>
			</div>
		);

	}

};