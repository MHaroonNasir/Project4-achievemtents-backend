const db = require('../database/connect.js');

class Item {
    constructor(item) {
        this.item_id = item.item_id;
        this.item_name = item.item_name;
        this.price = item.price;
        this.item_icon = item.item_icon;
        this.quantity = item.quantity;
    }

    static async getAllItems() {
        const results = await db.query("SELECT * FROM items;");

        if(results.rows.length === 0) {
            throw new Error("There are currently no items in the store!");
        }

        return results.rows.map((item) => new Item(item));
    }

    static async getItemById(id) {
        const result = await db.query("SELECT * FROM items WHERE item_id = $1;", [id]);

        if(result.rows.length != 1) {
            throw new Error("No item with that item id found!");
        }

        return new Item(result.rows[0]);
    }

    async buyItem(newQuantity) {
        const result = await db.query(
            "UPDATE items SET quantity = $1 WHERE item_id = $2 RETURNING *;",
            [newQuantity, this.item_id]
        );
        return new Item(result.rows[0]);
    }
}

module.exports = Item;
