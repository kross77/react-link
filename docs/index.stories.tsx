import React, {useState} from 'react';
import {storiesOf} from '@storybook/react-native';
import {Button, TextInput, Title, Surface} from 'react-native-paper';
import Layout from "@kross77/react-native-layout";
import {useObjectLink, useSingleLink} from "@kross77/react-link";

interface LoginFormData {
    email: string
    password: string
}

const isValid = (form: LoginFormData) => {
    console.log('isValid', {e: form.email.length, p: form.password.length})
    return form.email.length > 3 && form.password.length > 5
}

const HookTest = () => {
    const [state, setState] = useState('test');
    return (
        <Layout yellow w h center>
            <Layout pv={20} ph={40}>
                <h1>{state}</h1>
                <TextInput value={state} onChangeText={setState} label={'Email'}/>

            </Layout>
        </Layout>
    )
}

const LoginForm = ({onSave}) => {
    const inputLink = useObjectLink<LoginFormData>({
        email: "", password: ""
    });

    return (
        <Layout color={'grey'} w h center>
            <Surface>
                <Layout pv={20} ph={40} color={'white'}>
                    <Layout pv={10} center>
                        <Title>Sign in: </Title>
                    </Layout>
                    <Layout gap={10}>
                        <TextInput onChangeText={inputLink.cb('email')} label={'Email'}/>
                        <TextInput onChangeText={inputLink.cb('password')} type={'password'} label={'Password'}/>
                    </Layout>
                    <Layout pv={20}>
                        <Button mode="contained"  disabled={!isValid(inputLink.value)} onPress={() => onSave(inputLink.value)}>Submit</Button>
                    </Layout>
                </Layout>
            </Surface>
        </Layout>
    )
}

storiesOf('Links', module)
    .add('test', () => (
        <Layout yellow w h center>
            <HookTest/>
        </Layout>
    ))
    .add('login form', () => (
        <Layout yellow w h center>
            <LoginForm onSave={console.log}/>
        </Layout>
    ))
