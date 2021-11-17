import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, Root } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { AdsListPage } from './pages/AdsListPage/AdsListPage';
import { CreateAds } from './pages/CreateAds/CreateAds';
import { Profile } from './pages/Profile/Profile';
import { AdPage } from './pages/AdPage/AdPage';

const App = () => {
    const [activePanel, setActivePanel] = useState('adsListPage');
    const [activeView, setActiveView] = useState('main');
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(null);
    const [adData, setAdData] = useState({});

    useEffect(() => {
        bridge.subscribe(({ detail: { type, data } }) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);

            const session = await fetch('/api/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    vkId: user.id,
                    name: `${user.first_name} ${user.last_name}`,
                    avatar: user.photo_200,
                }),
                credentials: 'include',
            });

            if (!session.ok) {
                console.log(`/api/sessions: ${session.status}`);
            }
        }

        fetchData();
    }, []);

    return (
        <AdaptivityProvider>
            <AppRoot>
                <Root activeView={activeView}>
                    <View activePanel={activePanel} popout={popout} id="main">
                        <CreateAds
                            id="createads"
                            active={activePanel}
                            navigationHandler={setActivePanel}
                            setPopout={setPopout}
                            setActivePanel={setActivePanel}
                        />
                        <AdsListPage
                            id="adsListPage"
                            active={activePanel}
                            navigationHandler={setActivePanel}
                            setActiveView={setActiveView}
                            setAdData={setAdData}
                        />
                        <Profile
                            id="profile"
                            active={activePanel}
                            navigationHandler={setActivePanel}
                            user={fetchedUser}
                        />
                    </View>
                    <View id="one-ad">
                        <AdPage data={adData} setActiveView={setActiveView} />
                    </View>
                </Root>
            </AppRoot>
        </AdaptivityProvider>
    );
};

export default App;
