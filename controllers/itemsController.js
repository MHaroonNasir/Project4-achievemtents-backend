const Item = require('../models/Item.js');
const User = require('../models/User.js');

async function displayAllItems(req, res) {
    try {
        const items = await Item.getAllItems();
        res.status(200).json(items);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

async function displayItem(req, res) {
    const { id } = req.params;

    try {
        const item = await Item.getItemById(id);
        res.status(200).json(item);
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

async function purchaseItem(req, res) {
    const { id } = req.params;
    const user = await User.getUserById(req.session.userid);
    const item = await Item.getItemById(id);

    if(!item.quantity) {
        console.log("no stock")
        res.status(400).json({error: "Item out of stock!"});
        return;
    }

    if(user.currency >= item.price) {
        const newCurrency = user.currency - item.price;
        const newQuantity = item.quantity - 1;

        const updatedUser = await user.updateCurrency(newCurrency);
        const updatedItem = await item.buyItem(newQuantity);

        res.status(200).json({user: updatedUser, item: updatedItem});
    } else {
        res.status(400).json({error: "Not enough currency!"});
    }
}

module.exports = {
    displayAllItems,
    displayItem,
    purchaseItem,
}
