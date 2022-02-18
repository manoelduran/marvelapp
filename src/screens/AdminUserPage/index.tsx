import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AdminUserPageNavigationProps } from '@src/@types/navigation';
import { BackButton } from '@components/BackButton';
import {
    Container,
    Header,
    Title,
    Content,
    Thumbnail,
    Name,
    Description
} from './styles';
import { useTheme } from 'styled-components/native';
import { ItemSeparator } from '@components/ItemSeparator';




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
    }
    useEffect(() => {
        fetchUser();
    }, [user])
    return (
        <Container>
            <Header>
                <BackButton
                    onPress={handleBack}
                />
                <Title>Marvel Land </Title>
            </Header>
            <Content>
                {
                    selectedUser.photo ?
                        <Thumbnail source={{ uri: selectedUser.photo }} />
                        :
                        <Thumbnail source={{ uri: 'https://github.com/manoelduran.png' }} />
                }
                <Name> {selectedUser.name} </Name>
                <ItemSeparator />
            </Content>
        </Container>
    );
}