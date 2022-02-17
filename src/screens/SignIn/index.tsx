import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useAuth } from '@hooks/useAuth';
import brandImg from '@assets/brand.png';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import {
    Container,
    Content,
    Title,
    Brand,
    CreateAccount,
    CreateAccountLabel,
    ForgotPasswordButton,
    ForgotPasswordLabel,
    FooterContainer
} from './styles';


export function SignIn() {
    const { signIn, createAccount, forgotPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleSignIn() {
        signIn(email, password);
    };
    function handleCreateAccount() {
        createAccount(email, password);
    };
    function handleForgotPassword() {
        forgotPassword(email);
    };
    return (
        <Container>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
                <Content>
                    <Brand source={brandImg} />
                    <Title>Login</Title>
                    <Input
                        placeholder="E-mail"
                        onChangeText={setEmail}
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                    <Input
                        placeholder="Senha"
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <FooterContainer>
                        <CreateAccount onPress={handleCreateAccount} >
                            <CreateAccountLabel>Criar conta</CreateAccountLabel>
                        </CreateAccount>
                        <ForgotPasswordButton onPress={handleForgotPassword}>
                            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
                        </ForgotPasswordButton>
                    </FooterContainer>
                    <Button title='Conectar' onPress={handleSignIn} isLoading={false} />
                </Content>
            </KeyboardAvoidingView>
        </Container>
    );
}