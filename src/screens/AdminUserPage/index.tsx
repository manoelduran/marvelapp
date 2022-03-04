import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AdminUserPageNavigationProps } from '@src/@types/navigation';
import { ItemSeparator } from '@components/ItemSeparator';
import { Button } from '@components/Button';
import { BackButton } from '@components/BackButton';
import {
    Container,
    Header,
    Title,
    Content,
    Thumbnail,
    Name,
    Info,
    Description
} from './styles';
import { Alert } from 'react-native';

export function AdminUserPage() {
    const route = useRoute();
    const navigation = useNavigation();
    const { user } = route.params as AdminUserPageNavigationProps;
    const [selectedUser, setSelectedUser] = useState({} as User);
    function handleBack() {
        navigation.goBack();
    };
    function fetchUser() {
        setSelectedUser(user);
    };
    function handleDeleteUser() {
        firestore()
            .collection('users')
            .doc(user.name)
            .delete()
            .then(() => {
                storage()
                    .ref(user.photo_path)
                    .delete()
            })
            .catch(() => Alert.alert('Não foi possivel deletar o usuáriro'));
        navigation.navigate('AdminHome');
    };
    function handleAdminUserFavorites(user: User) {
        navigation.navigate('AdminUserFavorites', {
            user
        })
    }
    useEffect(() => {
        fetchUser();
    }, [user]);
    return (
        <Container>
            <Header>
                <BackButton
                    onPress={handleBack}
                />
                <Title>Marvel Land </Title>
                <Button
                    title='Deletar Usuário'
                    style={{ backgroundColor: 'red' }}
                    onPress={handleDeleteUser}
                />
            </Header>
            <Content>
                {
                    selectedUser.photoUrl ?
                        <Thumbnail source={{ uri: selectedUser.photoUrl }} />
                        :
                        <Thumbnail source={{ uri: 'https://github.com/manoelduran.png' }} />
                }
                <ItemSeparator />
                <Info>
                    <Name> Name: </Name>
                    <Description> {selectedUser.name} </Description>
                </Info>
                <Info>
                    <Name>Password:</Name>
                    <Description> {selectedUser.password} </Description>
                </Info>
                <Info>
                    <Name>Type:</Name>
                    {
                        selectedUser.isAdmin ?
                            <Description> Administrador </Description>
                            :
                            <Description> Usuário </Description>
                    }
                </Info>
                <Button
                    title="Favoritos"
                    onPress={() => handleAdminUserFavorites(user)}
                    style={{ marginBottom: 15 }}
                />
            </Content>
        </Container>
    );
};