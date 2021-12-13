/*
* AUTHOR:  Jaden Ciesielski, Adam Walters
*
* CREATED:  11/30/2021
* MODIFIED: 12/06/2021
*/

export default class MenuItem {

	id: string;
	name: string;
	calories: number;
	price: number;
	qualities: string[];
	allergens: string[];

	constructor(id: string, name: string, calories: number, price: number, qualities: string[], allergens: string[]){
		this.id = id;
		this.name = name;
		this.calories = calories;
		this.price = price;
		this.qualities = qualities;
		this.allergens = allergens;
	}
	
};