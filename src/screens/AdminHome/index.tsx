import React, { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Search } from '@components/Search';
import { LogoutButton } from '@components/LogoutButton';
import { UserCard } from '@components/UserCard';
import { useAuth } from '@hooks/useAuth';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
    Container,
    Header,
    Title
} from './styles';

export function AdminHome() {
    const navigation = useNavigation();
    const { signOut } = useAuth();
    const [users, setUsers] = useState<User[]>([] as User[])
    const [search, setSearch] = useState('');
    function getUsers(value: string) {
        const formattedValue = value.toLowerCase().trim();
        firestore()
            .collection('users')
            .orderBy('name')
            .startAt(formattedValue)
            .endAt(`${formattedValue}\uf8ff`)
            .get()
            .then(response => {
                const data = response.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                }) as User[];
                setUsers(data);
            })
            .catch(() => {
                return Alert.alert('Não foi possivel carregar a lista de usuários');
            });
    };
    function handleDelete() {
        if (search === '') {
            return;
        };
        setSearch('');
        getUsers('');
    };
    function handleSearchUser() {
        getUsers(search);
    };
    async function handleSignOut() {
        await signOut();
    };
    function handleCharacter(user: User) {
        navigation.navigate('AdminUserPage', {
            user
        });
    };
    useFocusEffect(
        useCallback(() => {
            getUsers(search);
        }, []));
    return (
        <Container>
            <Header>
                <Title>Marvel Land</Title>
                <LogoutButton onPress={handleSignOut} />
            </Header>
            <Search
                value={search}
                onChangeText={setSearch}
                onSearch={handleSearchUser}
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
};