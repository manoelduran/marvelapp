export type CharacterNavigationProps = {
    character: Character;
};
export type ProfileNavigationProps = {
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
            Profile: ProfileNavigationProps;
            Character: CharacterNavigationProps;
            UserFavorites: undefined;
        };
    };
};