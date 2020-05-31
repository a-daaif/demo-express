const User = require("../models/user.model");
const md5 = require("md5");

module.exports = {
	// page = 3
	// limit = 10
	// offset = 20
	getUsers(options, limit, page) {
		const offset = (page - 1) * limit;
		return User.find(options).skip(offset).limit(Number(limit)).exec();
	},
	getUser(id) {
		return User.findById(id).exec();
	},

	addUser(user) {
		const newUser = new User();
		newUser.username = user.username;
		newUser.password = md5(user.password);
		user.role && (newUser.role = user.role);
		return newUser.save();
	},
	loginUser(username, password) {
		return User.findOne({username: username, password: md5(password)}).exec();
	},
	async updateUser(id, user) {
		const newUser = await User.findById(id);
		newUser.username = user.username;
		newUser.password = md5(user.password);
		user.role && (newUser.role = user.role);
		return newUser.save();
	},
	async removeUser(id) {
		return await User.findOneAndDelete({ _id: id });
	},
};
