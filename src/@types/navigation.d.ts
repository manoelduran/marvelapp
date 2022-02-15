export type CharacterNavigationProps = {
    character: Character;
}

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined;
            Character: CharacterNavigationProps;
        };
    };
};