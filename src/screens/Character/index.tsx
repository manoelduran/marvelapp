import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { CharacterNavigationProps } from '@src/@types/navigation';
import firestore from '@react-native-firebase/firestore';
import { BackButton } from '@components/BackButton';
import { ItemSeparator } from '@components/ItemSeparator';
import {
    Container,
    Header,
    Title,
    Content,
    Thumbnail,
    Name,
    Description,
    Icon
} from './styles';
import { useAuth } from '@hooks/useAuth';
import { Alert } from 'react-native';

export function Character() {
    const route = useRoute();
    const { user } = useAuth();
    const theme = useTheme();
    const navigation = useNavigation();
    const { character } = route.params as CharacterNavigationProps;
    const [selectedCharacter, setSelectedCharacter] = useState({} as Character);
    const [favoritedCharacter, setFavoritedCharacter] = useState<Character | undefined>({} as Character);
    function favoriteCharacter() {
        firestore()
            .collection(`users/${user?.name}/favorites`)
            .doc(character.name)
            .set({
                active: true,
                id: character.id,
                name: character.name,
                description: character.description,
                thumbnail: {
                    path: character.thumbnail.path,
                    extension: character.thumbnail.extension
                },
            }).then(() => {
                firestore()
                    .collection(`users/${user?.name}/favorites`)
                    .doc(character.name)
                    .get()
                    .then(response => {
                        const data = response.data() as unknown as Character;
                        setFavoritedCharacter(data)
                    })
                    .catch(() => Alert.alert('Search Active Favorite', 'Unable to check if the character is favorite or not!'))
                return Alert.alert('Favorites List', 'Character added to favorites list!');
            })
            .catch(() => {
                return Alert.alert('Favorites List', 'Unable to add character to favorites list!');
            });
    };
    function removeCharacter() {
        firestore()
            .collection(`users/${user?.name}/favorites`)
            .doc(character.name)
            .delete()
            .then(() => {
                setFavoritedCharacter(undefined);
                return Alert.alert('Favorites List', 'Character removed from favorites list!');
            })
            .catch(() => {
                return Alert.alert('Favorites List', 'Unable to remove character from favorites list!');
            });
    };
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
                <Title>MarvelApp </Title>
            </Header>
            <Content>
                <Thumbnail
                    source={{ uri: `${selectedCharacter?.thumbnail?.path}/portrait_incredible.${selectedCharacter?.thumbnail?.extension}` }}
                />
                <Name> {selectedCharacter.name} </Name>
                {
                    favoritedCharacter?.active ?
                        <Icon name='star' size={30} active={true} onPress={() => removeCharacter()} />
                        :
                        <Icon name='star' size={30} active={false} onPress={() => favoriteCharacter()} />
                }
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