import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import {
    Container,
    Photo,
    Content,
    NameContainer,
    Type,
    Name,
} from './styles';

interface UserCardProps extends TouchableOpacityProps {
    index: number;
    data: User;
};

export function UserCard({ index, data, ...rest }: UserCardProps) {
    return (
        <Container index={index}  {...rest} >
            {
                data.photoUrl ?
                    <Photo source={{ uri: data.photoUrl }} />
                    :
                    <Photo source={{ uri: 'https://github.com/manoelduran.png' }} />
            }
            <Content>
                <Name>E-mail: </Name>
                <NameContainer>
                    <Name> {data.name} </Name>
                </NameContainer>
                <Name>Type: </Name>
                {
                    data?.isAdmin ?
                        <Type> Administrator </Type>
                        :
                        <Type> User </Type>
                }
            </Content>
        </Container>
    );
};