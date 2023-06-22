const listHelper = require('../utils/listHelper');

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
describe('most blogs', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0,
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0,
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0,
    },
  ];
  test('returns author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ name: 'Robert C. Martin', blogs: 3 });
  });
  test('handles length of 0', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe('Pass in array with atleast one blog');
  });
  test('returns first author that had highest blogs', () => {
    blogs.push({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    });
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ name: 'Edsger W. Dijkstra', blogs: 3 });
  });
});

describe('most likes', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0,
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0,
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0,
    },
  ];
  test('returns author with most likes', () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ name: 'Edsger W. Dijkstra', likes: 17 });
  });
  test('handles length of 0', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toBe('Pass in array with atleast one blog');
  });
  test('returns first author that had highest likes', () => {
    blogs.push({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Robert C. Martin',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 5,
      __v: 0,
    });
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ name: 'Edsger W. Dijkstra', likes: 17 });
  });
});
