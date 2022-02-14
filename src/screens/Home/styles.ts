import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";


export const Container = styled.View`
flex: 1;
background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(({theme}) => ({
    colors: theme.COLORS.GRADIENT
}))`
width: 100%;
padding: ${getStatusBarHeight() + 33}px 24px;
`;

export const Title = styled.Text``;