import { useAuth } from '@hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
    Container,
    Header,
    Title
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { CharacterCard } from '@components/CharacterCard';
import { BackButton } from '@components/BackButton';

export function UserFavorites() {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [characters, setCharacters] = useState<Character[]>([]);
    function handleBack() {
        navigation.goBack();
    };
    function fetchCharacterList() {
        firestore()
            .collection(`users/${user?.name}/favorites`)
            .get()
            .then(response => {
                const data = response.docs.map(doc => {
                    return {
                        ...doc.data()
                    };
                }) as Character[];
                setCharacters(data);
            }).catch(() => Alert.alert('Favorites List', 'Failed to load favorites list!'))
    };
    function handleCharacter(character: Character) {
        navigation.navigate('Character', {
            character
        });
    };
    useEffect(() => {
        fetchCharacterList();
    }, [characters]);
    return (
        <Container>
            <Header>
                <BackButton
                    onPress={handleBack}
                />
                <Title>Favorites List</Title>
            </Header>
            <FlatList
                data={characters}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item, index }) =>
                (
                    <CharacterCard
                        index={index}
                        data={item}
                        onPress={() => handleCharacter(item)} />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24 }}
            />
        </Container>
    );
}