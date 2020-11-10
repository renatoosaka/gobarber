import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: #636660;
  display: flex;
  align-items: center;

  input {
    flex: 1;
    color: #f4ede8;
    background: transparent;
    border: 0;

    &::placehoder {
      color: #636660;
    }
  }

  svg {
    margin-right: 16px;
  }

  & + div {
    margin-top: 8px;
  }
`;
