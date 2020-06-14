import React from 'react';

const Blog = ({user, blog,removeBlog}) => (
    <tr>
        <td> {blog.content.title} </td>
        <td> {blog.content.author} </td>
        <td> {blog.content.url}</td>
        <td> {blog.content.likes }</td>
            {
                user.name && blog.user && (blog.user.name === user.name) ?
                    <td><button onClick= {() => removeBlog(blog.id)}>delete</button> </td>
                :   <td> - </td>
            }
    </tr>
)

export default Blog;
