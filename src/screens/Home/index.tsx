import { CharacterCard } from '@components/CharacterCard';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import {
    Container,
    Header,
    Title
} from './styles';
import { GetCharacters } from '../../services/api';
import { useNavigation } from '@react-navigation/native';


export function Home() {
    const navigation = useNavigation();
    const [characters, setCharacters] = useState<Character[]>([]);
    function handleCharacter(id: string) {
        navigation.navigate('Character', {
            id
        })
    }
    useEffect(() => {
        async function fetchCharacters() {
            const response = await GetCharacters();
            const listofCharacters = response.data.results;
            setCharacters(listofCharacters);
        };
        fetchCharacters();
    }, []);
    return (
        <Container>
            <Header>
                <Title>Marvel Land</Title>
            </Header>
            <FlatList
                data={characters}
                keyExtractor={item => String(item.id)}
                renderItem={({ item, index }) =>
                (
                    <CharacterCard
                        index={index}
                        data={item}
                        onPress={() => handleCharacter(String(item.id))}
                    />
                )
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
            />
        </Container>
    );
}