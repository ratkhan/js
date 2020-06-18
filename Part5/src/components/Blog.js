import React from 'react';

const Blog = ({ user, blog, likeBlog, removeBlog }) => (
    <tbody>
        <tr>
            <td> {blog.content.title} </td>
            <td> {blog.content.author} </td>
            <td> {blog.content.url}</td>
            <td> {blog.content.likes}
                <button onClick={() => likeBlog(blog.id)}>Like</button>
            </td>
            {
                user.name && blog.user && (blog.user.name === user.name) ?
                    <td>
                        <button onClick={() => removeBlog(blog.id)}>delete</button>
                    </td>
                    : <td> - </td>
            }
        </tr>
    </tbody>
);

export default Blog;
