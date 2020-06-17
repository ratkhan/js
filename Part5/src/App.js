import React, { useState, useEffect } from 'react';
import Blog from './components/Blog'
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogInputForm from "./components/BlogInputForm";
import './App.css';

const App = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [newTitle, setTitle] = useState('');
    const [newAuthor, setAuthor] = useState('');
    const [newUrl, setUrl] = useState('');
    const [loginVisible, setLoginVisible] = useState(false);

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
            setErrorMessage('Could not log in')
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

    const togglableLoginForm = () => {
        return <Togglable buttonLabel='login'>
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
            />
        </Togglable>
    }

    const logOut = async (event) => {
        event.preventDefault();
        try{
            window.localStorage.removeItem('loggedBlogappUser')
            setUser(null)
        } catch (exception) {
            setErrorMessage('Could not log out')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
        }
    }

    const addBlog = async (event, title, ) => {
        event.preventDefault()
        const blogObject = {
            content: {
                title: newTitle,
                author: newAuthor,
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
            setErrorMessage(`Entry could not be saved`)
            console.log(exception)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const likeBlog = async (id) => {
        try {
            let blogObject = await blogService.find(id);
            console.log('found', blogObject)
            blogObject.data.content.likes += 1;
            console.log('updated', blogObject)
            const response = await blogService.update(id,blogObject.data);

            setTimeout( () => {
                setMessage(null)
            }, 5000)
            const blogs = await blogService.getAll();
            setBlogs(blogs);
        } catch (exception) {
            setErrorMessage(`Could not perform the action`)
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
            <BlogInputForm
                newTitle={newTitle}
                newAuthor={newAuthor}
                newUrl={newUrl}
                handleTitleChange={({ target }) => setTitle(target.value)}
                handleAuthorChange={({ target }) => setAuthor(target.value)}
                handleUrlChange={({ target }) => setUrl(target.value)}
                handleSubmit={addBlog}
            />)
    }

    return (
        <div>
            <p>{errorMessage}</p>
            { user === null ? togglableLoginForm()
                :
                (<div>
                    <p>Logged in as {user.name}</p>
                    <form onSubmit={logOut}>
                        <button className="logout" type="submit">logOut</button>
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
                            <Blog
                                key={blog.id}
                                user={user}
                                blog={blog}
                                likeBlog={likeBlog}
                                removeBlog={removeBlog} />
                        )}
                        {BlogForm()}
                        </tbody>
                    </table>
                </div> )}
        </div>
    )
};

export default App;