export type CharacterNavigationProps = {
    id?: string;
}

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined;
            Character: CharacterNavigationProps;
        };
    };
};