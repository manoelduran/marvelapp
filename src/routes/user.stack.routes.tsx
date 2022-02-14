import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@screens/Home';
import { Character } from '@screens/Character';

const { Navigator, Screen, Group } = createNativeStackNavigator();

export function UserStackRoutes() {
    return (
        <Navigator initialRouteName="Home">
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
        </Navigator>
    );
}