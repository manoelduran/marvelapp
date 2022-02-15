import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CharacterNavigationProps } from '@src/@types/navigation';
import { BackButton } from '@components/BackButton';
import {
    Container,
    Header,
    Title,
    Content,
    Thumbnail,
    Name
} from './styles';
import { useTheme } from 'styled-components/native';




export function Character() {
    const route = useRoute();
    const theme = useTheme();
    const navigation = useNavigation();
    const { character } = route.params as CharacterNavigationProps;
    const [selectedCharacter, setSelectedCharacter] = useState({} as Character);
    function handleBack() {
        navigation.goBack();
    };
     function fetchCharacter() {
        setSelectedCharacter(character)
    }
    useEffect(() => {
        fetchCharacter();
    }, [character])
    return (
        <Container>
            <Header>
                <BackButton
                    onPress={handleBack}
                />
                <Title>Marvel Land</Title>
            </Header>
            <Content>
                <Thumbnail
                    source={{ uri: `${character?.thumbnail?.path}/portrait_incredible.${character?.thumbnail?.extension}` }}
                />
                <Name> {character.name} </Name>
            </Content>
        </Container>
    );
}