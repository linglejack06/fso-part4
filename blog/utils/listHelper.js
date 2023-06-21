const dummy = (blogs) => blogs.length;
const totalLikes = (blogs) => (blogs.length === 0
  ? 0
  : blogs.reduce((sum, acc) => sum + acc.likes, 0));
module.exports = {
  dummy, totalLikes,
};
