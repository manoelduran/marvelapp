import React, { useEffect } from 'react';
import {
    Container,
    Description,
    Name,
    Thumbnail
} from './styles';
interface CharacterCardProps {
    data: Character;
}

export function CharacterCard({ data }: CharacterCardProps) {
    return (
        <Container key={data.id} >
            <Name> {data.name} </Name>
            <Description> {data.description} </Description>
            <Thumbnail source={{ uri: `${data.thumbnail.path}/portrait_medium.${data.thumbnail.extension}`}} />
        </Container>
    );
}