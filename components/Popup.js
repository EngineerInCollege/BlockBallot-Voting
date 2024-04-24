import React from 'react';
import styled from 'styled-components';

const PopupContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 1vw;
    padding: 2vw;
    box-shadow: 0 0 1vw rgba(0, 0, 0, 0.2);
    z-index: 9999;
    max-width: 80%;
`;

const PopupText = styled.div`
    font-family: "Helvetica";
    margin-bottom: 1vw;
    color: ${props => props.theme.colors.main};
    font-size: 1vw;
`;

const PopupButton = styled.button`
    background-color: ${props => props.theme.colors.feature};
    font-family: "Helvetica";
    color: #fff;
    border: none;
    border-radius: .5vw;
    padding: .5vw 2vw;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    display: block;
    margin: 0 auto;

    &:hover {
        background-color: ${props => props.theme.colors.main};
    }
`;

const Popup = ({ message, onClose }) => {
    return (
        <PopupContainer>
            <PopupText>{message}</PopupText>
            <PopupButton onClick={onClose}>Close</PopupButton>
        </PopupContainer>
    );
};

export default Popup;
