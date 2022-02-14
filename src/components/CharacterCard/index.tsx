import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import {
    Container,
    NameContainer,
    Description,
    Name,
    Thumbnail
} from './styles';
interface CharacterCardProps extends TouchableOpacityProps {
    index: number;
    data: Character;
}

export function CharacterCard({ index, data, ...rest }: CharacterCardProps) {
    return (
        <Container index={index}  {...rest} >
            <NameContainer>
                <Thumbnail source={{ uri: `${data?.thumbnail?.path}/portrait_medium.${data?.thumbnail?.extension}` }} />
                <Name> {data.name} </Name>
            </NameContainer>
            {
                data?.description ?
                    <Description> {data.description} </Description>
                    :
                    <Description> not available </Description>
            }

        </Container>
    );
}