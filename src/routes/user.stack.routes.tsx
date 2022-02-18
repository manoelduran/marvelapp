import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@hooks/useAuth';
import { UserTabRoutes } from './user.tab.routes';
import { AdminHome } from '@screens/AdminHome';
import { AdminUserPage } from '@screens/AdminUserPage';
import { Character } from '@screens/Character';

const { Navigator, Screen, Group } = createNativeStackNavigator();

export function UserStackRoutes() {
    const { user } = useAuth();
    return (
        <Navigator initialRouteName="AdminHome">
            {
                user?.isAdmin ?
                    (
                        <Group>
                            <Screen
                                name="AdminHome"
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false
                                }}
                                component={AdminHome}
                            />
                            <Screen
                                name="AdminUserPage"
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false
                                }}
                                component={AdminUserPage}
                            />
                        </Group>
                    ) : (
                        <Group>
                            <Screen
                                name="UserTabRoutes"
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false
                                }}
                                component={UserTabRoutes}
                            />
                            <Screen
                                name="Character"
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false
                                }}
                                component={Character}
                            />
                        </Group>
                    )
            }
        </Navigator>
    );
}