import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import {
    Container,
    Load,
    Title
} from './styles';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    isLoading?: boolean;
}

export function Button({ title, isLoading = false, ...rest }: ButtonProps) {
    return (
        <Container {...rest}>
            {isLoading ? <Load /> : <Title> {title} </Title>}
        </Container>
    );
};