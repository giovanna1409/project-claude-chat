'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { useContext, useState } from 'react';
import { LayoutContext } from '../layout/context/layoutcontext';
import { ChatService } from '@/service/chat-service';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const chatService = new ChatService;

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    function signIn() {
        setLoading(true);
        chatService.getCredentials().then(response => {
            const credentials = response.data.credentials[0];
            if (username === credentials.username && password === credentials.password) {
                router.push('/chats/');
            }
            setLoading(false);
        });
    }

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/anthropic-logo.svg`} alt="AK logo" className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Welcome!</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Username
                            </label>
                            <InputText id="email1" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Email address" className="w-full mb-5" />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full mb-5" inputClassName="w-full"></Password>

                            <Button label="Sign In" className="w-full p-3 text-xl" onClick={signIn}></Button>
                        </div>

                        <div className="mt-5">
                            {loading ? ('Loading...') : ('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
