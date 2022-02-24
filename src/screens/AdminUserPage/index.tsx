import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AdminUserPageNavigationProps } from '@src/@types/navigation';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
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
import { useTheme } from 'styled-components/native';
import { ItemSeparator } from '@components/ItemSeparator';
import { Button } from '@components/Button';




export function AdminUserPage() {
    const route = useRoute();
    const theme = useTheme();
    const navigation = useNavigation();
    const { user } = route.params as AdminUserPageNavigationProps;
    const [selectedUser, setSelectedUser] = useState({} as User);
    function handleBack() {
        navigation.goBack();
    };
    function fetchUser() {
        setSelectedUser(user)
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
        navigation.navigate('AdminHome')
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
            </Content>
        </Container>
    );
}