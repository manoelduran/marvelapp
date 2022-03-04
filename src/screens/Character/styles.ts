import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Feather } from '@expo/vector-icons';
import styled, { css } from "styled-components/native";

interface LabelProps {
    active: boolean;
}

export const Container = styled.View`
flex: 1;
background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
    colors: theme.COLORS.GRADIENT
}))`
width: 100%;
flex-direction: row;
justify-content: flex-start;
padding: ${getStatusBarHeight() + 33}px 24px 24px;
`;

export const Title = styled.Text`
font-size: 24px;
margin-left: 45px;
${({ theme }) => css`
font-family: ${theme.FONTS.TITLE};
color: ${theme.COLORS.TITLE};
`}
`;

export const Content = styled.View`
width: 100%;
margin-top: 24px;
padding:  0 24px;
background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Thumbnail = styled.Image`
align-self: center;
width: 240px;
height: 240px;
border-radius: 120px;
`;

export const Name = styled.Text`
text-align: center;
font-size: 24px;
margin-top: 24px;
${({ theme }) => css`
font-family: ${theme.FONTS.TITLE};
color: ${theme.COLORS.SUCCESS_900};
`}
`;

export const Description = styled.Text`
font-size: 14px;
margin-top: 11px;
${({ theme }) => css`
font-family: ${theme.FONTS.TEXT};
color: ${theme.COLORS.SECONDARY_400};
`}
`;

export const Icon = styled(Feather) <LabelProps>`
margin-left: 15px;
color: ${({ active, theme }) => active ? theme.COLORS.SUCCESS_900 : theme.COLORS.SECONDARY_900}; 
`;