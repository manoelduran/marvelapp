import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@screens/Home';
import { Character } from '@screens/Character';
import { useAuth } from '@hooks/useAuth';
import { UserTabRoutes } from './user.tab.routes';

const { Navigator, Screen, Group } = createNativeStackNavigator();

export function UserStackRoutes() {
    const { user } = useAuth();
    return (
        <Navigator initialRouteName="Home">
            {
                user?.isAdmin ?
                    (
                        <Group>
                            <Screen
                                name="Home"
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false
                                }}
                                component={Home}
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