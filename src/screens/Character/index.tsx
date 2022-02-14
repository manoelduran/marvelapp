import { useNavigation, useRoute } from '@react-navigation/native';
import { CharacterNavigationProps } from '@src/@types/navigation';
import { BackButton } from '@components/BackButton';
import React from 'react';
import {
    Container,
    Header,
    Title
} from './styles';



export function Character() {
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params as CharacterNavigationProps;
    function handleBack() {
        navigation.goBack();
    };
    return (
        <Container>
            <Header>
                <BackButton
                    onPress={handleBack}
                />
                <Title>Marvel Land</Title>
            </Header>
        </Container>
    );
}