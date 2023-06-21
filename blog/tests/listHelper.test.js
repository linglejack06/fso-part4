const listHelper = require('../utils/listHelper');

test('dummy returns length of blogs', () => {
  const blogs = [1, 2, 3, 4, 5];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(5);
});
describe('total likes', () => {
  const blogs = [
    { likes: 5 },
    { likes: 2 },
    { likes: 4 },
  ];

  test('adds up all likes', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(11);
  });
  test('handles length of 1', () => {
    blogs.pop();
    blogs.pop();
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(5);
  });
  test('handles empty array', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
});
describe('favorite blog', () => {
  const blogs = [
    { likes: 5 },
    { likes: 2 },
    { likes: 4 },
  ];
  test('finds favorite and returns it', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({ likes: 5 });
  });
  test('Handles length of 0', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe('Pass in array with atleast one blog');
  });
});
