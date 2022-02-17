import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '@screens/Home';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes() {
    const theme = useTheme();
    return (
        <Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.COLORS.SECONDARY_900,
                tabBarInactiveTintColor: theme.COLORS.SECONDARY_400,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 80,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0
                },
            }}
        >
            <Screen
                name="Home"
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <MaterialIcons
                            name='home'
                            width={24}
                            height={24}
                            size={50}
                            color={focused ? theme.COLORS.SUCCESS_900 : theme.COLORS.TITLE} />
                    )
                }}
                component={Home}
            />
        </Navigator>
    );
}