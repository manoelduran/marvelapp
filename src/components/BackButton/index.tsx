import React from 'react';
import {
    Container
} from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';

export function BackButton({ ...rest }: TouchableOpacityProps) {
    const theme = useTheme();
    return (
        <Container  {...rest}  >
            <MaterialIcons
                name='chevron-right'
                size={18}
                color={theme.COLORS.TITLE}
            />
        </Container>
    );
}
