import React, {useState} from 'react'
import Togglable from "./Togglable";
const BlogInputForm = ({
                        handleSubmit,
                        handleTitleChange,
                        handleAuthorChange,
                        handleUrlChange,
                        newTitle,
                        newAuthor,
                        newUrl
                   }) => {
    const [visible, setVisible] = useState (false);

    const hideWhenVisible = { display: visible ? 'none' : ''};
    const showWhenVisible = { display: visible ? '' : 'none'};

    const toggleVisibility = () => {
        setVisible(!visible);
    }

    return (
        <tr >
            <td >
                <input
                    style={showWhenVisible}
                    id={"titleField"}
                    placeholder="title..."
                    type="text"
                    value={newTitle}
                    name="Title"
                    onChange={handleTitleChange}
                />
                <button style={hideWhenVisible} onClick={toggleVisibility}>Add Blog</button>
            </td>
            <td >
                <input
                    style={showWhenVisible}
                    id={"authorField"}
                    placeholder="author..."
                    type="text"
                    value={newAuthor}
                    name="Author"
                    onChange={handleAuthorChange}
                />
            </td >
            <td >
                <input
                    style={showWhenVisible}
                    id={"urlField"}
                    placeholder="url..."
                    type="text"
                    value={newUrl}
                    name="Url"
                    onChange={handleUrlChange}
                />
            </td>
            <td >
                -
            </td>
            <td >
                <form
                    style={showWhenVisible}
                    onSubmit={handleSubmit}>
                    <button type="submit">Save</button>
                </form>
                <button
                    style={showWhenVisible}
                    onClick={toggleVisibility}>Cancel
                </button>
            </td>
        </tr>
    )
}

export default BlogInputForm;