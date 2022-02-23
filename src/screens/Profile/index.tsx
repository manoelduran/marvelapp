import React, { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Photo } from "@components/Photo";
import { useAuth } from "@hooks/useAuth";
import { Alert, ScrollView } from "react-native";
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
    const [photoView, setPhotoView] = useState('');
    const [photoPath, setPhotoPath] = useState('');
    const [buttonId, setButtonId] = useState(false);
    const [loading, setLoading] = useState(false);
    async function handlePickImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4]
            });
            if (!response.cancelled) {
                setPhotoView(response.uri);
            };
        };
    };

    async function handleAddPhoto() {
        if (!photoView) {
            return Alert.alert('Cadastro', 'Informe a foto');
        };
        setLoading(true);
        const fileName = new Date().getTime();
        const reference = storage().ref(`/users/${fileName}.png`);
        await reference.putFile(photoView);
        const photoUrl = await reference.getDownloadURL();
        firestore()
            .collection(`users`)
            .doc(user?.name)
            .update({
                buttonId: true,
                photoUrl,
                photo_path: reference.fullPath
            })
            .then(() => {
                setPhotoPath(reference.fullPath)
                setButtonId(true)
                setLoading(false);
                navigation.navigate('Home')
            })
            .catch(() => {
                setLoading(false);
                Alert.alert('Editar Perfil', 'Não foi possivel editar o perfil')
            })
    };
    async function handleDeletePhoto() {
        firestore()
            .collection('users')
            .doc(user?.name)
            .update({
                photoUrl: '',
                photo_path: '',
                buttonId: false
            })
            .then(() => {
                storage()
                    .ref(photoPath)
                    .delete()
            })
        setPhotoView('')
        setButtonId(false)
        navigation.navigate('Home');
    };
    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false} >
                <Header>
                    <Title>Profile </Title>
                </Header>
                <Upload>
                    <Photo
                        uri={photoView}
                    />
                    {buttonId === true ? <PickImageButton title='Deletar' onPress={handleDeletePhoto} />
                        :
                        <PickImageButton title='Carregar' onPress={handlePickImage} />
                    }
                </Upload>
                <ItemSeparator />
                <Content>
                    <Info>
                        <Name> Name: </Name>
                        <Description> {user?.name} </Description>
                    </Info>
                    <Info>
                        <Name> Password: </Name>
                        <Description> {user?.password} </Description>
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
                    {buttonId=== false && <AddButton
                        title="Editar"
                        isLoading={loading}
                        onPress={handleAddPhoto}
                    />}
                </Content>
            </ScrollView>
        </Container>
    );
}