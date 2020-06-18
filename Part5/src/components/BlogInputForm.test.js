import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import BlogInputForm from './BlogInputForm';

test ('clicking the button calls event handler once', () => {
    const blog =
        {
            content: {
                title: 'Blog2',
                author: 'Ratkhan Saginbazarov',
                url: 'local',
                likes: 29
            },
            user: {
                name: 'ratkhan',
                id: '5ee45042e6b79e258424dd71'
            },
            id: '5ee38c5ed0224f43f8a9e05f'
        };

    const user =
        {
            blogs: [],
            username: 'ratkhan',
            name: 'ratkhan',
            id: '5ee45042e6b79e258424dd71'
        };

    const mockHandler = jest.fn();

    const component = render  (<BlogInputForm
        newTitle={blog.content.title}
        newAuthor={blog.content.author}
        newUrl={blog.content.url}
        handleTitleChange={() => {}}
        handleAuthorChange={() => {}}
        handleUrlChange={() => {}}
        handleSubmit={mockHandler}
    />);

    const button = component.getByText('Save');

    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);




});