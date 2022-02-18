import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { GetCharacters, searchCharacter } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { Search } from '@components/Search';
import { CharacterCard } from '@components/CharacterCard';
import { LogoutButton } from '@components/LogoutButton';
import {
    Container,
    Header,
    Title
} from './styles';





export function Home() {
    const navigation = useNavigation();
    const { signOut } = useAuth();
    const [characters, setCharacters] = useState<Character[]>([]);
    const [search, setSearch] = useState('');
    async function fetchCharacters() {
        const response = await GetCharacters();
        const listofCharacters = response.data.results;
        setCharacters(listofCharacters);
    };
    async function handleSearch() {
        const response = await searchCharacter(search);

        setCharacters(response.data.results);
    };
    async function handleSignOut() {
        await signOut();
    };
    async function handleDelete() {
        if (search === '') {
            return;
        };
        setSearch('');
        fetchCharacters();
    };
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
    }, []);
    return (
        <Container>
            <Header>
                <Title>Marvel Land</Title>
                <LogoutButton onPress={handleSignOut} />
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
                contentContainerStyle={{ paddingHorizontal: 24 }}
            />
        </Container>
    );
}