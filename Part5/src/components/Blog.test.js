import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { prettyDOM } from '@testing-library/dom';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
import BlogInputForm from "./BlogInputForm";

test (' renders content', () => {
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

    const component = render (
        <Blog
            user={user}
            blog={blog}
            likeBlog={ () => {}}
            removeBlog={ () => {} }
        />
    );
    const li = component.container.querySelector('li');

    console.log(prettyDOM(li));

    //method 1
    expect(component.container).toHaveTextContent(
        'Ratkhan Saginbazarov'
    );

    //method 2
    const element = component.getByText(
        'Ratkhan Saginbazarov'
    );
    expect(element).toBeDefined();

    /*
    //method 3
    const div = component.container.querySelector('.blog');
    expect(div).toHaveTextContent(
        'Ratkhan Saginbazarov'
    );
    */
    component.debug();
});

test('pressing the like button twice, calls the function twice', () => {
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

    const component = render (
        <Blog
            user={user}
            blog={blog}
            likeBlog={mockHandler}
            removeBlog={ () => {} }
        />
    );

    const button = component.getByText('Like');

    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
});




