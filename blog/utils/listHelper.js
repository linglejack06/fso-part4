const dummy = (blogs) => blogs.length;
const totalLikes = (blogs) => blogs.reduce((sum, acc) => sum + acc.likes, 0);
module.exports = {
  dummy, totalLikes
}