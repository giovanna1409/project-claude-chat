/* eslint-disable @next/next/no-img-element */

import { ChatService } from '@/service/chat-service';
import { AppMenuItem } from '@/types';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [chatItems, setChatItems] = useState([]);
    const chatService = new ChatService();
    const router = useRouter();

    useEffect(() => {
        chatService.getChats().then(response => {
            const chatItems = response.data.chats.map((chat: any) => { return { label: chat.name, icon: 'pi pi-fw pi-comment', to: '/chats/' + chat.id } as AppMenuItem });
            setChatItems(chatItems);
        });
    }, [router]);

    const model: AppMenuItem[] = [
        {
            label: 'New',
            items: [{ label: 'Create new chat', icon: 'pi pi-fw pi-plus', to: '/chats' }]
        },
        {
            label: 'Existing chats',
            items: chatItems
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
