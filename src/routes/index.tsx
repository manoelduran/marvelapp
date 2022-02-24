import React from 'react';
import { useAuth } from '@hooks/useAuth';
import { NavigationContainer } from '@react-navigation/native';
import { UserStackRoutes } from './user.stack.routes';
import { SignIn } from '@screens/SignIn';


export function Routes() {
    const { user } = useAuth();
    return (
        <NavigationContainer>
            {user ?
                <UserStackRoutes />
                :
                <SignIn />
            }
        </NavigationContainer>
    );
};