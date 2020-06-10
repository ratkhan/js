const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes;
    };

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
    const reducer = (a, b) => {
        return a.likes < b.likes
            ? b
            : a;
    };

    return blogs.reduce(reducer);
};

const mostBlogs = (blogs) => {
    var author_array = [];

    blogs.forEach(blog => {
        for (var i = 0; i < author_array.length; i++){
            if (blog.author === author_array[i].author) {
                author_array[i].blogs += 1;
                return;
            }
        }
        var newAuthor = {
            author: blog.author,
            blogs: 1
        };
        author_array.push(newAuthor);
    }
    );

    const reducer = (a, b) => {
        return a.blogs < b.blogs
            ? b
            : a;
    };

    return author_array.reduce(reducer);
};

const mostLikes = (blogs) => {
    var author_array = [];

    blogs.forEach(blog => {
        for (var i = 0; i < author_array.length; i++){
            if (blog.author === author_array[i].author) {
                author_array[i].likes += blog.likes;
                return;
            }
        }
        var newAuthor = {
            author: blog.author,
            likes: blog.likes
        };
        author_array.push(newAuthor);
    }
    );

    const reducer = (a, b) => {
        return a.likes < b.likes
            ? b
            : a;
    };

    return author_array.reduce(reducer);
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};