import { Input } from '@components/Input';
import { Button } from '@components/Button';
import brandImg from '@assets/brand.png';
import { KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import {
    Container,
    Content,
    Title,
    Brand,
    CreateAccount,
    CreateAccountLabel,
    ForgotPasswordButton,
    ForgotPasswordLabel
} from './styles';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleSignIn() {
    }
    function handleCreateAccount() {

    }
    function handleForgotPassword() {
    }
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
                    <CreateAccount onPress={handleCreateAccount} >
                        <CreateAccountLabel>Criar conta</CreateAccountLabel>
                    </CreateAccount>
                    <ForgotPasswordButton onPress={handleForgotPassword}>
                        <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
                    </ForgotPasswordButton>
                    <Button title='Conectar' onPress={handleSignIn} isLoading={false} />
                </Content>
            </KeyboardAvoidingView>
        </Container>
    );
}