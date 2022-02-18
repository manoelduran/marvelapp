import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import {
    Container,
    NameContainer,
    Description,
    Name,
} from './styles';
interface UserCardProps extends TouchableOpacityProps {
    index: number;
    data: User;
}
export function UserCard({ index, data, ...rest }: UserCardProps) {
    return (
        <Container index={index}  {...rest} >
            <Name>Login: </Name>
            <NameContainer>
                <Name> {data.name} </Name>
            </NameContainer>
            <Name>Senha: </Name>
            <NameContainer>
                <Name> {data.password} </Name>
            </NameContainer>
            <Name>Tipo de usuário: </Name>
            {
                data?.isAdmin ?
                    <Description> Administrador </Description>
                    :
                    <Description> Usuário </Description>
            }
        </Container>
    );
}