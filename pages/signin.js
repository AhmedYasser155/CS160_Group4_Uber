import React from 'react'
import { useState, useEffect } from 'react'
import { Router,useRouter } from "next/router"
import tw from "tailwind-styled-components"
import { BackHomeButton } from '../components/BackHomeButton'
import Link from 'next/Link'
import { authenthicateUser } from '../APIFunctions/DbFunctions'
import {Footer} from '../components/Footer'

const SignIn = () => {

    const initialValues = {email:"", password:""} 
    const[formValues, setFormValues] = useState(initialValues)
    const[formErrors, setFormErrors] = useState({})
    const[isSubmit, setIsSubmit] = useState(false)
    const router = useRouter()

    const handleChange = (e) => {
        const{name, value} = e.target
        setFormValues({...formValues, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmit(true)
    }

    async function login()
    {
        const accountDetails = { 
            email:formValues.email,
            password:formValues.password
        }
        const res = await authenthicateUser(accountDetails.email,accountDetails.password);
        if(res.error) {
            console.log("Could not find user!");
            const error={}
            error.failedAuth="Incorrect Username or Password"
            setFormErrors(error)

        }
        else {
            console.log(res.responseData);

            const userType= res.responseData.userType
            const id =res.responseData.id;

            if(userType==1)
            {
                router.push(`/Driver/${id}`)

            }
            else{
                router.push(`/Rider/${id}`)
            }
           

        }

    }
    

    useEffect(() => {
        if(Object.keys(formErrors).length == 0 && isSubmit){
            login();
        }

    },[formErrors])

    const validate = (values) => {
        const errors = {}
        if(!values.email){
            errors.email = "Email is required!"
        }
        if(!values.password){
            errors.password = "Password is required!"
        }

        return errors

    }

    return(
        <Wrapper>
            <BackHomeButton/>

            <Header> 
                     <UberLogo src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"/> 
            </Header>

            
            <Form onSubmit = {handleSubmit}>
               

                <InputContainer>
                    <InputBoxes>
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
                        name = "password"
                        value = {formValues.password}
                        type = "password"
                        onChange={handleChange}
                    />
                    <ErrorMessage>{formErrors.password}</ErrorMessage>
                    </InputBoxes>

                </InputContainer>
        
                    <ActionButton >
                     Sign In
                    </ActionButton>
                    <ErrorMessage>{formErrors.failedAuth}</ErrorMessage>

         
            </Form>
            <Footer page={router.pathname} />
        </Wrapper>
    )

    
}

export default SignIn


const SuccessMessage = tw.p`
    text-center pb-4
`

const ErrorMessage = tw.div`
    text-red-600 text-sm
`

const InputLabel = tw.label`
    text-gray-700 font-bold
`

const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 p-4
`
const Form = tw.form`
    flex-1
`
const Header = tw.div`
    flex justify-between    
`
const UberLogo = tw.img`
    h-28 w-auto object-contain self-start 
`

const InputContainer = tw.div`
    bg-white flex items-center px-4 mb-2 py-4
`
const InputBoxes = tw.div`
    flex flex-col flex-1
`
const Input = tw.input`
    h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none
`

const ActionButton = tw.button`
    flex bg-white justify-center transform hover:scale-105 transition text-xl w-full

`
