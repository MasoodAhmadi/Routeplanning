import styled from 'styled-components';

export const ProfilePageContainer = styled.div`
  width: 90vw;
  padding: 20px;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column; /* Column on small screens */
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row; /* Row layout on larger screens */
    justify-content: space-between;
  }
`;

export const ProfileFormContainer = styled.div`
  flex: 1; /* Flexible width for the form container */
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  @media (min-width: 768px) {
    height: auto; /* Allows natural height on larger screens */
  }

  @media (max-width: 767px) {
    width: 100%; /* Full width on small screens */
    margin-right: 0;
  }
`;

export const ProfileRightColumn = styled.div`
  flex: 0 1 30%; /* Fixed width for right column */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  background-color: #ffffff;

  @media (min-width: 768px) {
    height: auto; /* Auto height to adapt with content */
  }

  @media (max-width: 767px) {
    width: 100%; /* Full width on small screens */
    margin-top: 20px;
  }
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

export const ProfileText = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #333;
  flex-grow: 1;
`;

export const SubmitButton = styled.button`
  background-color: #7a42f4;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #5b31b6;
  }
`;

export const MandatoryMessage = styled.p`
  color: red;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Label = styled.label`
  flex: 0 0 150px;
  margin-right: 10px;
  font-weight: bold;
  font-size: 16px;

  &:after {
    content: "${(props) => (props.isMandatory ? " *" : "")}";
    color: red;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  min-width: 0;

  &:focus {
    border-color: #7a42f4;
    outline: none;
  }

  &.mandatory {
    border-color: red;
  }
`;

export const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
