import styled, { css } from "styled-components/native";
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity)`
flex: 1;
max-height: 56px;
min-height: 56px;
border-radius: 12px;
justify-content: center;
align-items: center;
background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
`;

export const Title = styled.Text`
font-size: 14px;
${({ theme }) => css`
color: ${theme.COLORS.TITLE};
font-family: ${theme.FONTS.TEXT};
`};
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
    color: theme.COLORS.TITLE
}))``;