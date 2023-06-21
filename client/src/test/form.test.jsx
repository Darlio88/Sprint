import React from 'react'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom';
import { render, screen, userEvent } from '../utils/test-utils'

// import Form from '../components/Form'
import Form from "../components/Form"

function toJson(component) {
  const result = component.toJSON()
  expect(result).toBeDefined()
  expect(result).not.toBeInstanceOf(Array)
  return result;
}

test('form contains onsubmit function', () => {
  const component = renderer.create(
    <BrowserRouter>
      <Form type="signin" />
    </BrowserRouter>,
  )
  let tree = toJson(component)
  expect(tree).toMatchSnapshot()
})


describe("form renders well",()=>{
  it("title of form displayed well",()=>{
    render(<BrowserRouter><Form type="signin"/></BrowserRouter>)
    expect(screen.getByText(/Log Into Your Account/i)).toBeInTheDocument()
  })

  
})


