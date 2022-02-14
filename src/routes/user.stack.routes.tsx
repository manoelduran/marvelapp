import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@screens/Home';

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
        </Navigator>
    );
}