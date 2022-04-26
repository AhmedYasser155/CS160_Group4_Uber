import {React, useState, useEffect,useRef } from "react"
import tw from "tailwind-styled-components"
import { Router,useRouter } from "next/router"
import { verifyEmail } from '../APIFunctions/EmailVerification.js'
import { addUser } from '../APIFunctions/DbFunctions'
var bcrypt = require("bcryptjs");



export const DriverSignUp = () => {

    const initialValues = {firstName:"", lastName:"", email:"", password:"", phoneNumber:"", license:""}

    const[formValues, setFormValues] = useState(initialValues)
    const contentType = "application/json";
    const[formErrors, setFormErrors] = useState({})
    const[isSubmit, setIsSubmit] = useState(false)
    const userFirstNameInputRef = useRef()
    const userLastNameInputRef = useRef()
    const userEmailInputRef = useRef()
    const userPhoneInputRef = useRef()
    const userPasswordInputRef=useRef()
    const userLicenseInputRef=useRef()
    const router = useRouter()


    async function postData() {
        const salt = await bcrypt.genSalt(10)

        const userData = {
            firstName:userFirstNameInputRef.current.value,
            lastName:userLastNameInputRef.current.value,
            email:userEmailInputRef.current.value,
            phone:userPhoneInputRef.current.value,
            license: userLicenseInputRef.current.value,
            password:userPasswordInputRef.current.value,
            userType:1,
        }
        userData.password=await bcrypt.hash(userData.password,salt)
        console.log(userData)

        const res = await addUser(userData);
        if(res.error) {
            console.log("Error when adding user!");
            const error={}
            error.addUserFailed="Failed to add user!"
            setFormErrors(error)
        }
        else {
            console.log(res.responseData);
            router.push("/driver");
        }
    }

    const handleChange = (e) => {
        const{name, value} = e.target
        setFormValues({...formValues, [name]: value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setIsSubmit(true)
        const errors = {}
        if(!formValues.firstName){
            errors.firstName = "First Name is required!"
        }
        if(!formValues.lastName){
            errors.lastName = "Last Name is required!"
        }
        if(!formValues.email){
            errors.email = "Email is required!"
        }
        else {
            const res = await verifyEmail(formValues.email)
            if(res.error) {
                errors.email = "Email is not valid!"
            }
        }
        if(!formValues.password){
            errors.password = "Password is required!"
        }
        if(!formValues.phoneNumber){
            errors.phoneNumber = "Phone Number is required!"
        }
        else {
            if(!/^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(formValues.phoneNumber))
                errors.phoneNumber = "Invalid phone number!"
        }
        if(!formValues.license){
            errors.license = "Drivers License Number is required!"
        }
        setFormErrors(errors)
        
       
    
    }

    useEffect(() => {
        if(Object.keys(formErrors).length == 0 && isSubmit){
            postData()
        }

    },[formErrors])

    
    

  
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
                        ref={userFirstNameInputRef}
                        onChange= {handleChange}
                    />
                    <ErrorMessage> {formErrors.firstName} </ErrorMessage>
                    <InputLabel> last Name </InputLabel>
                    <Input
                        placeholder = "Enter Last Name"
                        value = {formValues.lastName}
                        name = "lastName"
                        type = "text"
                        ref={userLastNameInputRef}
                        onChange={handleChange}
                    />
                    <ErrorMessage> {formErrors.lastName} </ErrorMessage>
                    <InputLabel> Email </InputLabel>

                    <Input
                        placeholder = "Enter Email"
                        value = {formValues.email}
                        name = "email"
                        type = "text"
                        ref={userEmailInputRef}
                        onChange={handleChange}
                    />
                    <ErrorMessage> {formErrors.email} </ErrorMessage>
                    <InputLabel> Password </InputLabel>
                    <Input
                        placeholder = "Enter Password"
                        value = {formValues.password}
                        name = "password"
                        type = "password"
                        ref={userPasswordInputRef}
                        onChange={handleChange}
                    />
                    <ErrorMessage> {formErrors.password} </ErrorMessage>
                    <InputLabel> Phone Number </InputLabel>

                    <Input
                        placeholder = "Enter Phone Number"
                        value = {formValues.phoneNumber}
                        name = "phoneNumber"
                        type = "text"
                        ref={userPhoneInputRef}
                        onChange= {handleChange}
                    />
                    <ErrorMessage> {formErrors.phoneNumber} </ErrorMessage>
                    <InputLabel> Drivers License Number </InputLabel>
                    <Input
                        placeholder = "Enter Drivers License Number"
                        value = {formValues.license}
                        name = "license"
                        type="text"
                        ref={userLicenseInputRef}
                        onChange= {handleChange}
                    />
                    <ErrorMessage> {formErrors.license} </ErrorMessage>


                    </InputBoxes>

                </InputContainer>

                

                <ActionButton>
                    Sign up
                </ActionButton>
                <ErrorMessage> {formErrors.addUserFailed} </ErrorMessage>

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