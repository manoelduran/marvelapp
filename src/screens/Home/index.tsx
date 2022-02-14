import { CharacterCard } from '@components/CharacterCard';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import {
    Container,
    Header,
    Title
} from './styles';
import { GetCharacters } from '../../services/api';


export function Home() {
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        async function fetchCharacters() {
            const response = await GetCharacters();
            const listofCharacters = response.data.results;
            setCharacters(listofCharacters)
        }
        fetchCharacters()
    }, [])
    return (
        <Container>
            <Header>
                <Title>BORA INICIAR O APP</Title>
            </Header>
            <FlatList
                data={characters}
                keyExtractor={item => item.name}
                renderItem={({ item }) =>
                (
                    <CharacterCard
                        data={item}
                    />
                )
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
            />
        </Container>
    );
}