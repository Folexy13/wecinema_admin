const User = require('../models/User');

const getUser = async (query) => {
  try {
    const user = await User.findOne(query).select('+password');
    if (!user || !user.status) {
      throw Error('User not found or not active');
    }

    return user;
  } catch (err) {
    throw Error(err);
  }
};
const getUsers = async () => {
  try {
    const users = await User.find().select('+password');
    return users;
  } catch (err) {
    throw Error(err);
  }
};

const getAndEditUser = async (query, newData) => {
  try {
    const user = await User.findOneAndUpdate(query, newData, {
      new: true,
      runValidators: true
    });

    return user;
  } catch (err) {
    throw Error(err);
  }
};

const getSingleUserService = async (query) => {
  try {
    const user = await User.findOne(query).select('+password');
    return user;
  } catch (err) {
    throw Error(err);
  }
};

const getAdmins = async (query) => {
  try {
    const users = await User.find(query);
    return users;
  } catch (err) {
    throw Error(err);
  }
};

const getActiveUsers = async (query) => {
  try {
    const user = await User.find(query).find({ role: ['member', 'staff'] });
    return user;
  } catch (err) {
    throw Error(err);
  }
};

module.exports = {
  getUser,
  getAdmins,
  getActiveUsers,
  getSingleUserService,
  getAndEditUser,
  getUsers
};
