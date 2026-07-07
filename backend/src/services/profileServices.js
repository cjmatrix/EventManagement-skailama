import Profile from '../models/Profile.js';

const create = async (name) => {
  const profile = await Profile.create({ name });

  return profile;
};

const getProfile = async (queryText) => {
   
  if (!queryText || queryText.trim() === '') {
   
    return await Profile.find({});
  }

  const escapedQuery = queryText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  const searchRegex = new RegExp(escapedQuery, 'i');
  
  return await Profile.find({
    name: { $regex: searchRegex },
  });
};

export default { create, getProfile };
