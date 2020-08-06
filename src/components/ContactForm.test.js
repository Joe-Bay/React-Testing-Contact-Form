import React from 'react'
import {render, screen, fireEvent, act} from '@testing-library/react'
import ContactForm from './ContactForm'

test('making sure it renders without error', () => {
    render(<ContactForm />)
})

test('add a first name, last name, email, and message and submitting the form', async () => {
    // step 1 render the form 
    render(<ContactForm />)
    // query for the different inputs!
    // since they are inputs I am going to use getLabelByText because all inputs should have labels


    // found an error with accessibility with the 'htmlFor' in the HTML that should be linked to an id, corrected and all pass now

    // finding all the inputs
    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    // firing an event which types in the value i choose
    fireEvent.change(firstNameInput, {target:{value: 'joe'}})
    expect(firstNameInput).toHaveValue('joe') // verifying that its the correct value
    fireEvent.change(lastNameInput, {target:{value: 'Bay'}})
    expect(lastNameInput).toHaveValue('Bay')
    fireEvent.change(emailInput, {target:{value: 'joe@joe.com'}})
    expect(emailInput).toHaveValue('joe@joe.com')
    fireEvent.change(messageInput, {target:{value: 'Testing 1 2 3..'}})
    expect(screen.getByDisplayValue(/Testing 1 2 3../))
    // getting the submit button
    const submitBtn = screen.getByRole('button', {type: /Submit/i})
    // time to click the submit button by using another fire event but for a click

        fireEvent.click(submitBtn)
    // // // time to assert that the changes happened by verifying that the object appears when submitted
    expect(await screen.findByTestId(/result/i)).toBeInTheDocument()


})