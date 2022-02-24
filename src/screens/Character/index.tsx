import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { CharacterNavigationProps } from '@src/@types/navigation';
import { BackButton } from '@components/BackButton';
import { ItemSeparator } from '@components/ItemSeparator';
import {
    Container,
    Header,
    Title,
    Content,
    Thumbnail,
    Name,
    Description
} from './styles';

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
        setSelectedCharacter(character);
    };
    useEffect(() => {
        fetchCharacter();
    }, [character]);
    return (
        <Container>
            <Header>
                <BackButton
                    onPress={handleBack}
                />
                <Title>Marvel Land </Title>
            </Header>
            <Content>
                <Thumbnail
                    source={{ uri: `${selectedCharacter?.thumbnail?.path}/portrait_incredible.${selectedCharacter?.thumbnail?.extension}` }}
                />
                <Name> {selectedCharacter.name} </Name>
                <ItemSeparator />
                {
                    selectedCharacter.description ?
                        <Description> {selectedCharacter.description} </Description>
                        :
                        <Description style={{ textAlign: 'center' }} > not available </Description>
                }
            </Content>
        </Container>
    );
};