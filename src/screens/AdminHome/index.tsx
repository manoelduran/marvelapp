import { Search } from '@components/Search';
import { LogoutButton } from '@components/LogoutButton';
import { UserCard } from '@components/UserCard';
import { useAuth } from '@hooks/useAuth';
import React, { useState } from 'react';
import {
    Container,
    Header,
    Title
} from './styles';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';



export function AdminHome() {
    const navigation = useNavigation();
    const { signOut } = useAuth();
    const [users, setUsers] = useState<User[]>([] as User[])
    const [search, setSearch] = useState('');
    async function handleSearch() {

    };
    async function handleDelete() {
        if (search === '') {
            return;
        };
        setSearch('');
    };
    async function handleSignOut() {
        await signOut();
    };
    function handleCharacter(user: User) {
        navigation.navigate('UserProfile', {
            user
        });
    };
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
                data={users}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) =>
                (
                    <UserCard
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