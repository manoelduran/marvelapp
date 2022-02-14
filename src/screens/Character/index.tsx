import { useRoute } from '@react-navigation/native';
import { CharacterNavigationProps } from '@src/@types/navigation';
import React from 'react';
import {
    Container,
    Header,
    Title
} from './styles';



export function Character() {
    const route = useRoute();
    const {id } = route.params as CharacterNavigationProps;
    return (
        <Container>
            <Header>
                <Title>Marvel Land</Title>
            </Header>
        </Container>
    );
}