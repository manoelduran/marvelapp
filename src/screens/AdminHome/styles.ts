import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.View``;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
    colors: theme.COLORS.GRADIENT
}))`
width: 100%;
flex-direction: row;
align-items: center;
justify-content: center;
padding: ${getStatusBarHeight() + 33}px 24px 24px;
`;

export const Title = styled.Text`
font-size: 24px;
text-align: center;
${({ theme }) => css`
font-family: ${theme.FONTS.TITLE};
color: ${theme.COLORS.TITLE};
`}
`;