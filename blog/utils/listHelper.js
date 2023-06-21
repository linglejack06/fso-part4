const dummy = (blogs) => blogs.length;
const totalLikes = (blogs) => (blogs.length === 0
  ? 0
  : blogs.reduce((sum, acc) => sum + acc.likes, 0));
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 'Pass in array with atleast one blog';
  let fav = { likes: 0 };
  blogs.forEach((blog) => {
    if (fav.likes < blog.likes) {
      fav = blog;
    }
  });
  return fav;
};
module.exports = {
  dummy, totalLikes, favoriteBlog,
};
