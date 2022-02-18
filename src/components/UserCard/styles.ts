import styled, { css } from "styled-components/native";

interface ContainerProps {
    index: number;
};

export const Container = styled.TouchableOpacity.attrs<ContainerProps>(() => ({
    activeOpacity: 0.8,
})) <ContainerProps>`
width: 100%;
flex-direction: row;
align-items: center;
padding: 24px;
padding-left: 5px;
${({ theme, index }) => css`
border-bottom-width: ${index % 1 > 0 ? 0 : 1}px;
border-bottom-color: ${theme.COLORS.SHAPE};
`}
`;

export const Photo = styled.Image`
width: 80px;
height: 80px;
border-radius: 40px;
align-self: center;
`;

export const Content = styled.View`
align-items: center;
padding-left: 30px;
`;

export const NameContainer = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-top: 5px;
`;

export const Name = styled.Text`
font-size: 13px;
padding-top: 5px;
${({ theme }) => css`
font-family: ${theme.FONTS.TITLE};
color: ${theme.COLORS.SECONDARY_900};
`}
`;

export const Type = styled.Text`
padding-top: 5px;
font-size: 11px;
margin-top: 11px;
${({ theme }) => css`
font-family: ${theme.FONTS.TEXT};
color: ${theme.COLORS.SECONDARY_400};
`}
`;