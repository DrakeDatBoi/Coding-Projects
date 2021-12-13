/*
 * AUTHOR:  Adam Walters
 *
 * CREATED:  12/06/2021
 * MODIFIED: 12/06/2021
 */

import MenuItem from './menu-item';

export default class Cart {

	private static itemList: { id: string, count: number }[];
	private static detailCache: { [id: string]: MenuItem } = {};

	private static _ = (() => {

		// Retrieve item list from session storage and parse
		let itemList_raw = window.sessionStorage.getItem('Cart_ItemList');
		if (itemList_raw != null && itemList_raw != '') {
			this.itemList = JSON.parse(itemList_raw);
		} else {
			this.itemList = [];
		}

	})();

	static addItem(item: MenuItem): void {

		// Find and increment or add to list
		const obj = this.itemList.find((x) => x.id == item.id);
		if (obj != null) {
			obj.count += 1;
		} else {
			this.itemList.push({
				id: item.id,
				count: 1
			});
		}

		// Update storage
		window.sessionStorage.setItem('Cart_ItemList', JSON.stringify(this.itemList));

	}

	static removeItem(item: MenuItem, all: boolean = false): void {

		// Find in list and decrement/remove
		const index = this.itemList.findIndex((x) => x.id == item.id);
		const obj = this.itemList[index];
		obj.count = all ? 0 : obj.count - 1;
		if (obj.count <= 0) {
			this.itemList.splice(index, 1);
		}

		// Update storage
		window.sessionStorage.setItem('Cart_ItemList', JSON.stringify(this.itemList));

	}

	static clearItems(): void {

		// Clear list
		this.itemList = [];

		// Update storage
		window.sessionStorage.setItem('Cart_ItemList', JSON.stringify(this.itemList));

	}

	static getItemCount(): number {

		// Total items and return
		let total = 0;
		this.itemList.forEach((x) => {
			total += x.count;
		});
		return total;

	}

	static getItems(callback: (contents: { item: MenuItem, count: number }[]) => void): void {

		// Put together list of needed details
		let details: { [key: string]: MenuItem } = {};
		let detailsToFetch: string[] = [];
		this.itemList.forEach((x) => {
			let cached = this.detailCache[x.id];
			if (cached != null) {
				details[x.id] = cached;
			} else {
				detailsToFetch.push(x.id);
			}
		});

		// Define final processor
		const finalProcess = function() {

			// For each item, convert ID to details
			let contents: { item: MenuItem, count: number }[] = [];
			Cart.itemList.forEach((x) => {
				const detail = details[x.id];
				if (detail != null) {
					contents.push({
						item: details[x.id],
						count: x.count
					});
				}
			});

			// Replace details cache
			Cart.detailCache = details;

			// Finally invoke callback
			callback(contents);

		};

		// Check if a fetch is needed
		if (detailsToFetch.length > 0) {
			
			// Request missing item details from backend server, invoking final process at end regardless
			fetch('/api/menu/itemDetails', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(detailsToFetch)
			})
			.then((res) => res.json())
			.then((body) => {

				// Insert into details
				let couldNotLoadCount = 0;
				Object.keys(body.items).forEach((x: string) => {
					const rawDetail = body.items[x];
					if (rawDetail != null) {
						details[x] = new MenuItem(rawDetail.id, rawDetail.name, rawDetail.calories, rawDetail.price, rawDetail.qualities, rawDetail.allergens);
					} else {
						couldNotLoadCount += 1;
					}
				});
				if (couldNotLoadCount > 0) {
					console.error(`${couldNotLoadCount} item(s) were not found by the API`);
				}

			})
			.catch((err) => {

				// Log issue
				console.error(`Failed to retrieve cart item details from API: ${err}`);

			})
			.finally(finalProcess);

		} else {

			// Process immediately
			finalProcess();

		}

	}

}
