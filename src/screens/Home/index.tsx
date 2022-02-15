import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { GetCharacters, searchCharacter } from '../../services/api';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Search } from '@components/Search';
import { CharacterCard } from '@components/CharacterCard';
import {
    Container,
    Header,
    Title
} from './styles';



export function Home() {
    const navigation = useNavigation();
    const [characters, setCharacters] = useState<Character[]>([]);
    const [search, setSearch] = useState('');
    async function fetchCharacters() {
        const response = await GetCharacters();
        const listofCharacters = response.data.results;
        setCharacters(listofCharacters);
    };
    async function handleSearch() {
        const response = await searchCharacter(search);
        console.log(response.data.results);
        setCharacters(response.data.results);
    }
    async function handleDelete() {
        setSearch('');
        const response = await GetCharacters();
        const listofCharacters = response.data.results;
        setCharacters(listofCharacters);
    }
    function handleCharacter(character: Character) {
        navigation.navigate('Character', {
            character
        });
    };
    useEffect(() => {
        if (search) {
            handleSearch();
        } else {
            fetchCharacters();
        };
    }, [search]);
    return (
        <Container>
            <Header>
                <Title>Marvel Land</Title>
            </Header>
            <Search
                value={search}
                onChangeText={setSearch}
                onSearch={handleSearch}
                onClear={handleDelete}
            />
            <FlatList
                data={characters}
                keyExtractor={item => String(item.id)}
                renderItem={({ item, index }) =>
                (
                    <CharacterCard
                        index={index}
                        data={item}
                        onPress={() => handleCharacter(item)}
                    />
                )
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
            />
        </Container>
    );
}