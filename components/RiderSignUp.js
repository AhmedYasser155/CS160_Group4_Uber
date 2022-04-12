import React from 'react'
import { useState, useEffect } from 'react'
import tw from "tailwind-styled-components"
import Router from 'next/router'


export const RiderSignUp = () => {

    const initialValues = {firstName:"", lastName:"", email:"", password:"", phoneNumber:"", driver: false}
    const[formValues, setFormValues] = useState(initialValues)
    const[formErrors, setFormErrors] = useState({})
    const[isSubmit, setIsSubmit] = useState(false)

    const handleChange = (e) => {
        const{name, value} = e.target
        setFormValues({...formValues, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmit(true)
    };

    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit) {
            createUser();
        } else {
            setIsSubmit(false)
        }
    }, [formErrors])

    const createUser = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/data', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formValues)
            })
            Router.push('/home')
        } catch (error) {
            console.log(error);
        }
    }

    const validate = (values) => {
        const errors = {}
        if(!values.firstName){
            errors.firstName = "First Name is required!"
        }
        if(!values.lastName){
            errors.lastName = "Last Name is required!"
        }
        if(!values.email){
            errors.email = "Email is required!"
        }
        if(!values.password){
            errors.password = "Password is required!"
        }
        if(!values.phoneNumber){
            errors.phoneNumber = "Phone Number is required!"
        }
        return errors

    }

    return (
        <Wrapper>

        <Form onSubmit = {handleSubmit}>

                <InputContainer>
                    <InputBoxes>

                    <InputLabel> First Name </InputLabel>

                    <Input
                        placeholder = "Enter First Name"
                        value = {formValues.firstName}
                        name = "firstName"
                        type = "text"
                        onChange= {handleChange}
                    />
                    <ErrorMessage> {formErrors.firstName} </ErrorMessage>
                    <InputLabel> Last Name </InputLabel>
                    <Input
                        placeholder = "Enter Last Name"
                        value = {formValues.lastName}
                        name = "lastName"
                        type = "text"
                        onChange={handleChange}
                    />
                    <ErrorMessage> {formErrors.lastName} </ErrorMessage>
                    <InputLabel> Email </InputLabel>

                    <Input
                        placeholder = "Enter Email"
                        value = {formValues.email}
                        name = "email"
                        type = "text"
                        onChange={handleChange}
                    />
                    <ErrorMessage> {formErrors.email} </ErrorMessage>
                    <InputLabel> Password </InputLabel>
                    <Input
                        placeholder = "Enter Password"
                        value = {formValues.password}
                        name = "password"
                        type = "password"
                        onChange={handleChange}
                    />
                    <ErrorMessage> {formErrors.password} </ErrorMessage>
                    <InputLabel> Phone Number </InputLabel>

                    <Input
                        placeholder = "Enter Phone Number"
                        value = {formValues.phoneNumber}
                        name = "phoneNumber"
                        type = "text"
                        onChange= {handleChange}
                    />
                    <ErrorMessage> {formErrors.phoneNumber} </ErrorMessage>
      
                    </InputBoxes>

                </InputContainer>

                

                <ActionButton>
                    Sign up
                </ActionButton>

            </Form>

    
    </Wrapper>
       
    
    )
}
const InputLabel = tw.label`
    text-gray-700 font-bold
`
const SuccessMessage = tw.p`
    text-center pb-4
`

const InputContainer = tw.div`
    bg-white flex items-center px-4 mb-2 py-4
`

const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 p-4
`

const ActionButton = tw.button`
flex bg-white justify-center transform hover:scale-105 transition text-xl w-full 
`
const Form = tw.form`
    flex-1
`
const ErrorMessage = tw.div`
    text-red-600 text-sm
`
const InputBoxes = tw.div`
    flex flex-col flex-1
`
const Input = tw.input`
    h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none
`