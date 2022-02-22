import { Button } from "@components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";
import styled, { css } from "styled-components/native";


export const Container = styled.View`
flex: 1;
background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

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
${({ theme }) => css`
font-family: ${theme.FONTS.TITLE};
color: ${theme.COLORS.TITLE};
`}
`;

export const Upload = styled.View`
width: 100%;
flex-direction: row;
justify-content: center;
align-items: center;
margin: 32px 0;
`;

export const Content = styled.View`
width: 100%;
margin-top: 24px;
padding:  0 24px;
background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const PickImageButton = styled(Button)`
max-width: 90px;
margin-left: 32px;
`;

export const AddButton = styled(Button)`
margin-top: 30px;
`;

export const Name = styled.Text`
text-align: center;
font-size: 24px;
margin-top: 20px;
${({ theme }) => css`
font-family: ${theme.FONTS.TITLE};
color: ${theme.COLORS.SUCCESS_900};
`}
`;

export const Description = styled.Text`
font-size: 14px;
margin-top: 20px;
${({ theme }) => css`
font-family: ${theme.FONTS.TEXT};
color: ${theme.COLORS.SECONDARY_400};
`}
`;

export const Info = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;