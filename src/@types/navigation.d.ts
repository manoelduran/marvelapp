export type CharacterNavigationProps = {
    character: Character;
};
export type UserProfileNavigationProps = {
    user: User;
};

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined;
            AdminHome: undefined;
            UserProfile: UserProfileNavigationProps;
            Character: CharacterNavigationProps;
        };
    };
};