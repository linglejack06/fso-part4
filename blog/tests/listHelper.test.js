const listHelper = require('../utils/listHelper');

test('dummy returns length of blogs', () => {
  const blogs = [1, 2, 3, 4, 5];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(5);
});
