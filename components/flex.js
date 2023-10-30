import styled from 'styled-components/native';

const flex = styled.View`
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  justify-content: ${({justify})=> justify||'space-between'};
  padding: ${({padding})=>padding || 0};
  background-color: ${({ backgroundColor }) => backgroundColor || '#f2f2f2'};
  border-bottom-width: ${({borderBottomWidth})=>borderBottomWidth||0};
  border-bottom-color: ${({ borderColor }) => borderColor || '#ccc'};
  gap: ${({gap})=>gap||0};
`;
export default flex;