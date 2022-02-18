export type CharacterNavigationProps = {
    character: Character;
};
export type UserProfileNavigationProps = {
    user: User;
};
export type AdminUserPageNavigationProps = {
    user: User;
};

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined;
            AdminHome: undefined;
            AdminUserPage: AdminUserPageNavigationProps;
            UserProfile: UserProfileNavigationProps;
            Character: CharacterNavigationProps;
        };
    };
};