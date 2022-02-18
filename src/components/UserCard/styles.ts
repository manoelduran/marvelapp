import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

interface ContainerProps {
    index: number;
};

export const Container = styled.TouchableOpacity.attrs<ContainerProps>(() => ({
    activeOpacity: 0.8,
})) <ContainerProps>`
width: 100%;
padding: 24px;
${({ theme, index }) => css`
border-bottom-width: ${index % 1 > 0 ? 0 : 1}px;
border-bottom-color: ${theme.COLORS.SHAPE};
`}
`;

export const NameContainer = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

export const Name = styled.Text`
font-size: 15px;
${({ theme }) => css`
font-family: ${theme.FONTS.TITLE};
color: ${theme.COLORS.SECONDARY_900};
`}
`;

export const Description = styled.Text`
font-size: 11px;
margin-top: 11px;
${({ theme }) => css`
font-family: ${theme.FONTS.TEXT};
color: ${theme.COLORS.SECONDARY_400};
`}
`;
export const Thumbnail = styled.Image`
width: 80px;
height: 80px;
border-radius: 40px;
`;