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
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 'Pass in array with atleast one blog';
  }
  const authors = [];
  blogs.forEach((blog) => {
    let author = authors.find((a) => a.name === blog.author);
    if (author) {
      author.blogs += 1;
    } else {
      author = {
        name: blog.author,
        blogs: 1,
      };
      authors.push(author);
    }
  });
  let top = authors[0];

  authors.forEach((author) => {
    if (top.blogs < author.blogs) {
      top = author;
    }
  });
  return top;
};
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 'Pass in array with atleast one blog';
  }
  const authors = [];
  blogs.forEach((blog) => {
    let author = authors.find((a) => a.name === blog.author);
    if (author) {
      author.likes += blog.likes;
    } else {
      author = {
        name: blog.author,
        likes: blog.likes,
      };
      authors.push(author);
    }
  });
  let top = authors[0];

  authors.forEach((author) => {
    if (top.likes < author.likes) {
      top = author;
    }
  });
  return top;
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
};
