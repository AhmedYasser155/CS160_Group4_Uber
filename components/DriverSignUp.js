import {React, useState, useEffect,useRef } from "react"
import tw from "tailwind-styled-components"
import { Router,useRouter } from "next/router"
import { verifyEmail } from '../APIFunctions/EmailVerification.js'


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
        try {
            
            const userData={
                firstName:userFirstNameInputRef.current.value,
                lastName:userLastNameInputRef.current.value,
                email:userEmailInputRef.current.value,
                phone:userPhoneInputRef.current.value,
                license: userLicenseInputRef.current.value,
                password:userPasswordInputRef.current.value,
                userType:1,
            }
          const res = await fetch("/api/users", {
            method: "POST",
            headers: {
              Accept: contentType,
              "Content-Type": contentType,
            },
            body: JSON.stringify(userData)            
            
          });
          console.log(res)
    
          if (!res.ok) {
            throw new Error(res.status);
          }
          router.push("/driver");
    
        } catch (error) {
            const errors={}
            errors.addUserFailed="Failed to add user!"
            setFormErrors(errors)
        }
      }

    const handleChange = (e) => {
        const{name, value} = e.target
        setFormValues({...formValues, [name]: value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        const res = await verifyEmail(formValues.email)
            if(res.error) {
                errors.email = "Email is not valid"
            }   
        setIsSubmit(true)
        
       
    
    }

    useEffect(() => {
        if(Object.keys(formErrors).length == 0 && isSubmit){
            postData()
        }

    },[formErrors])

    
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
        else {
            if(!/^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(values.phoneNumber))
                errors.phoneNumber = "Invalid phone number!"
        }
        if(!values.license){
            errors.license = "Drivers License Number is required!"
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