import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import {
    Container
} from './styles';



export function LogoutButton({ ...rest }: TouchableOpacityProps) {
    const theme = useTheme();
    return (
        <Container  {...rest} >
            <MaterialIcons
                name='logout'
                color={theme.COLORS.TITLE}
                size={24}
            />
        </Container>
    );
}