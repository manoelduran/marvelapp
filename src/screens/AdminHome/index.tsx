import { Search } from '@components/Search';
import { LogoutButton } from '@components/LogoutButton';
import { UserCard } from '@components/UserCard';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/useAuth';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Container,
    Header,
    Title
} from './styles';
import { FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';



export function AdminHome() {
    const navigation = useNavigation();
    const { signOut, user } = useAuth();
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
    };
     function handleDelete() {
        if (search === '') {
            return;
        };
        setSearch('');
    };
    function handleSearchUser() {
        getUsers(search);
    }
    async function handleSignOut() {
        await signOut();
    };
    function handleCharacter(user: User) {
        navigation.navigate('UserProfile', {
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
}