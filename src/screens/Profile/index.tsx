import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Photo } from "@components/Photo";
import { useAuth } from "@hooks/useAuth";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
    Container,
    Header,
    Title,
    Upload,
    PickImageButton,
    AddButton,
    Description,
    Info,
    Name,
    Content
} from './styles';
import { ItemSeparator } from "@components/ItemSeparator";

export function Profile() {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [photo, setPhoto] = useState('');
    const [loading, setLoading] = useState(false);
    async function handlePickImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4]
            });
            if (!response.cancelled) {
                setPhoto(response.uri);
            };
        };
    };

    async function handleAddPhoto() {
        if (!photo) {
            return Alert.alert('Cadastro', 'Informe a foto');
        };
        setLoading(true);
        const fileName = new Date().getTime();
        const reference = storage().ref(`/users/${fileName}.png`);
        await reference.putFile(photo);
        const photoUrl = await reference.getDownloadURL();
        firestore()
            .collection(`users`)
            .doc(user?.name)
            .update({
                photo: photoUrl,
                photo_path: reference.fullPath
            })
            .then(() => {
                setLoading(false);
                navigation.navigate('Home')
            })
            .catch(() => {
                setLoading(false);
                Alert.alert('Editar Perfil', 'Não foi possivel editar o perfil')
            })
    };
    return (
        <Container>
            <Header>
                <Title>Profile </Title>
            </Header>
            <Upload>
                <Photo
                    uri={photo}
                />
                {!user?.photo && <PickImageButton title='Carregar' onPress={handlePickImage} />}
            </Upload>
            <ItemSeparator />
            <Content>
                <Info>
                    <Name> Name: </Name>
                    <Description> {user?.name} </Description>
                </Info>
                <Info>
                    <Name>Type:</Name>
                    {
                        user?.isAdmin ?
                            <Description> Administrador </Description>
                            :
                            <Description> Usuário </Description>
                    }
                </Info>
            </Content>
            {!user?.photo && <AddButton
                title="Editar"
                isLoading={loading}
                onPress={handleAddPhoto}
            />}
        </Container>
    );
}