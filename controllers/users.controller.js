const usersService = require("../services/users.service");
const jwt = require('jsonwebtoken');

module.exports = {
	async getUsers(req, res) {
		// /api/users/?limit=10
		try {
			let { limit, page } = req.query;
			limit = limit || 10;
			page = page || 1;
			const options = {};
			const users = await usersService.getUsers(options, limit, page);
      res.json({
        status: 200,
        data: users,
        limit,
      page
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message : error.message
      })
    }
	},

	async getUser(req, res) {
    try {
      const id = req.params.id
			const user = await usersService.getUser(id);
      res.json({
        status: 200,
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message : error.message
      })
    }
	},

	async addUser(req, res, next) {
    const user = req.body;
    try {
			const newUser = await usersService.addUser(user);
      res.json({
        status: 201,
        data: newUser
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message : error.message
      })
    }
	},
	async loginUser(req, res, next) {
    const {username, password} = req.body;
    try {
      const result = await usersService.loginUser(username, password)
      if (result) {
        const token = jwt.sign({
          username: result.username,
          role: result.role
        }, "secret123", {
          expiresIn: 60 * 60
        })
        res.json({
          status: 200,
          token
        });
      } else 
      res.json({
        status: 403,
        data : "Utilisateur ou mot de passe invalide"
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message : error.message
      })
    }
	},
	async updateUser(req, res, next) {
    const user = req.body;
    const id = req.params.id;
    try {
			const newUser = await usersService.updateUser(id, user);
      res.json({
        status: 203,
        data: newUser
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message : error.message
      })
    }
	},
	async removeUser(req, res, next) {
    const id = req.params.id;
    try {
			const oldUser = await usersService.removeUser(id);
      res.json({
        status: 207,
        data: oldUser
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message : error.message
      })
    }
	}

};
