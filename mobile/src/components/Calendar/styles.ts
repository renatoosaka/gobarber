import styled, { css } from 'styled-components/native';

interface DayButtonProps {
  isDisabledDay?: boolean;
  isSelected?: boolean;
}

interface DayTextProps {
  isDisabledDay?: boolean;
  isSelected?: boolean;
}

export const Container = styled.View`
  border-radius: 8px;
  background-color: #28262e;
`;

export const Header = styled.View`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #3e3b47;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  height: 40px;
`;
export const HeaderButton = styled.TouchableOpacity`
  padding: 0 16px;
`;

export const Title = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  text-transform: capitalize;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
export const Content = styled.View`
  justify-content: center;
  align-items: flex-start;
  padding: 4px;
  margin-bottom: 8px;
`;

export const WeekContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 32px;
`;

export const WeekTitle = styled.Text`
  color: #7e7e7e;
  font-size: 14px;
  font-family: 'RobotoSlab-Medium';
`;

export const DayContainer = styled.View`
  margin: 4px;
`;

export const DayButton = styled.TouchableOpacity<DayButtonProps>`
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  background-color: #3e3b47;

  ${({ isDisabledDay }) =>
    isDisabledDay &&
    css`
      background-color: #28262e;
    `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: #ff9000;
    `}
`;

export const DayText = styled.Text<DayTextProps>`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';

  ${({ isDisabledDay }) =>
    isDisabledDay &&
    css`
      color: #666360;
    `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: #232129;
    `}
`;
