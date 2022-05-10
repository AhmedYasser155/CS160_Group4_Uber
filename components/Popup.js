import React from 'react';
import tw from "tailwind-styled-components";

export const Popup = (props) => {
    return (props.trigger) ? (
        <PopupContainer>
            <PopupInner>
                { props.children }
                <PopupButton onClick={() => props.confirm}
                >Confirm</PopupButton>
                <PopupButton onClick={() => props.decline}
                >Decline</PopupButton>
            </PopupInner>
        </PopupContainer>
    ) : "";
}

export default Popup

const PopupContainer = tw.div`
fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black
`

const PopupButton = tw.button`
absolute justify-center items-center
`

const PopupInner = tw.div`
relative p-8 w-full max-w-screen-sm bg-white
`