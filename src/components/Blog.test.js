import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


// test('renders title', () => {
//   const blog = {
//     title: 'Component testing is done with react-testing-library',
//     author: 'Sara',
//     url: 'test.com',
//     likes: 5,
//     user: {
//       username: 'SuperTestUser',
//       name: 'testroot',
//       id: '123547'
//     },
//     id: '1323871'
//   }

//   const component = render(
//     <Blog blog={blog} onLike={(blog) => console.log(blog)} onRemove={null}/>
//   )

//   expect(component.container).toHaveTextContent(
//     'Component testing is done with react-testing-library'
//   )


//   // method 2
//   const element = component.getByText(
//     'Component testing is done with react-testing-library'
//   )
//   expect(element).toBeDefined()


//   // method 3
//   const div = component.container.querySelector('.blog')
//   expect(div).toHaveTextContent(
//     'Component testing is done with react-testing-library'
//   )
// })

test('renders the blogs title and author, but does not render its url or number of likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Sara',
    url: 'test.com',
    likes: 5,
    user: {
      username: 'SuperTestUser',
      name: 'testroot',
      id: '123547'
    },
    id: '1323871'
  }

  const component = render(
    <Blog blog={blog} onLike={(blog) => console.log(blog)} onRemove={null}/>
  )

  // method 3
  const div = component.container.querySelector('.default')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(div).toHaveTextContent(
    'Sara'
  )
  expect(div).not.toHaveTextContent(
    'test.com'
  )
  expect(div).not.toHaveTextContent(
    'likes: '
  )

})


test('blogs url and number of likes are shown when the button controlling the shown details has been clicked', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Sara',
    url: 'test.com',
    likes: 5,
    user: {
      username: 'SuperTestUser',
      name: 'testroot',
      id: '123547'
    },
    id: '1323871'
  }

  const component = render(
    <Blog blog={blog} onLike={(blog) => console.log(blog)} onRemove={null}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)
  const div = component.container.querySelector('.hide')
  expect(div).toHaveTextContent(
    'test.com'
  )
  expect(div).toHaveTextContent(
    'likes: '
  )

})


test('clicking the button twice calls event handler twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Sara',
    url: 'test.com',
    likes: 5,
    user: {
      username: 'SuperTestUser',
      name: 'testroot',
      id: '123547'
    },
    id: '1323871'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} onLike={mockHandler} onRemove={null}/>
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})