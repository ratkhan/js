import React, { useState, useEffect } from 'react';
import Blog from './components/Blog'
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({'username':'empty',
                                                'name':'empty'});
    const [newTitle, setTitle] = useState('');
    const [newAuthor, setAuthor] = useState('');
    const [newUrl, setUrl] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try{
            const user = await loginService.login({
                username, password,
            });

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
        }
    };

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, []);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        );
    }, []);

    const loginForm = () => (
        <div class="loginForm">
        <form onSubmit = {handleLogin}>
            <div className="row">
                <label htmlFor="loginField">username</label>
                <input
                    id="loginField"
                    placeholder="..."
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => setUsername(target.value)}
                />
                <label htmlFor="passwordField">password</label>
                <input
                    id="passwordField"
                    placeholder="..."
                    type="text"
                    value={password}
                    name="Password"
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
        </div>
    )

    const logOut = async (event) => {
        event.preventDefault();
        try{
            window.localStorage.removeItem('loggedNoteappUser')
            setUser(null)
        } catch (exception) {
            setErrorMessage('Could not log out')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
        }
    }

    const addBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
            content: {
                title: newTitle,
                author: newTitle,
                url: newUrl,
                likes: 0
            }
        }

        try {
            const response = await blogService.save(blogObject);
            setTitle('');
            setAuthor('');
            setUrl('');
           // setMessage(`Added ${response.body.content.title} blog`)
            setTimeout( () => {
                setMessage(null)
            }, 5000)
            blogService.getAll().then(blogs =>
                setBlogs(blogs)
            );
        } catch (exception) {
            setErrorMessage(`Entry could not be saved '${exception.response}'`)
            console.log(exception)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }

    }

    const removeBlog = async (id) => {
        try {
            await blogService.remove(id);
            blogService.getAll().then(blogs =>
                setBlogs(blogs)
            );
        } catch (error) {
            console.log(error)
                setErrorMessage(`Entry could not be deleted`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const BlogForm = () => {
        return (
        <tr>
            <td>
                <input
                id={"titleField"}
                placeholder="title..."
                type="text"
                value={newTitle}
                name="Title"
                onChange={({target}) => setTitle(target.value)}
                />
            </td>
            <td>
                <input
                id={"authorField"}
                placeholder="author..."
                type="text"
                value={newAuthor}
                name="Author"
                onChange={({target}) => setAuthor(target.value)}
                />
            </td>
            <td>
                <input
                    id={"urlField"}
                    placeholder="url..."
                    type="text"
                    value={newUrl}
                    name="Url"
                    onChange={({target}) => setUrl(target.value)}
                />
            </td>
            <td>
                -
            </td>
            <td>
                <form onSubmit={addBlog}>
                    <button type="submit">save</button>
                </form>
            </td>
        </tr>
        )
    }

    return (
        <div>
            <p>{errorMessage}</p>
            {user === null ? loginForm()
            :
            (<div>
                <p>{user.name} logged in</p>
                <form onSubmit={logOut}>
                    <button type="submit">logOut</button>
                </form>

            <strong>Blogs</strong>
            <table>
                <thead>
                <tr>
                    <th>title</th>
                    <th>author</th>
                    <th>link</th>
                    <th>likes</th>
                    <th>---</th>
                </tr>
                </thead>
                <tbody>
                {blogs.map(blog =>
                    <Blog key={blog.id} user={user} blog={blog} removeBlog={removeBlog} />

                )}
                {BlogForm()}
                </tbody>
            </table>
            </div> )}
        </div>
    )
};

export default App;