import React, { useState, useEffect, useCallback } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
    View,
    ScreenSpinner,
    AdaptivityProvider,
    AppRoot,
    ModalRoot,
    SplitLayout,
    ModalPage,
    ModalPageHeader,
    PanelHeaderClose,
    PanelHeaderSubmit,
    FormItem,
    Input,
    Radio,
    Root,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { AdsListPage } from './pages/AdsListPage/AdsListPage';
import { CreateAds } from './pages/CreateAds/CreateAds';
import { Profile } from './pages/Profile/Profile';
import { SearchModal } from './components/SearchModal/SearchModal';
import { Modals } from './enums/Modals';
import { AdPage } from './pages/AdPage/AdPage';
import { MyAdsListPage } from './pages/MyAdsListPage/MyAdsListPage';

const App = () => {
    const [activePanel, setActivePanel] = useState('adsListPage');
    const [activeModal, setActiveModal] = useState(null);
    const [activeView, setActiveView] = useState('main');
    const [adData, setAdData] = useState({});
    const [myAdData, setMyAdData] = useState({});
    const [fetchedUser, setUser] = useState<any>(null);
    const [popout, setPopout] = useState(null);
    const [modalPriceInput, setModalPriceInput] = useState('');

    useEffect(() => {
        bridge.subscribe(({ detail: { type, data } }) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                // @ts-ignore
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

        // fetchData();
    }, []);
    const handleCloseModal = useCallback(() => {
        // @ts-ignore
        setActiveModal(null);
    }, []);

    const handleChangePrice = useCallback((evt) => {
        setModalPriceInput(evt.target.value);
    }, []);

    const onClickMyAds = useCallback((evt) => {
        setActivePanel('myAds');
    }, []);

    const modal = (
        <ModalRoot activeModal={activeModal} onClose={handleCloseModal}>
            <ModalPage
                id={Modals.SearchFilter}
                onClose={handleCloseModal}
                header={
                    <ModalPageHeader right={<PanelHeaderClose onClick={handleCloseModal} />}>Фильтры</ModalPageHeader>
                }
            >
                <FormItem top="Максимальная цена">
                    <Input value={modalPriceInput} onChange={handleChangePrice} />
                </FormItem>
                <FormItem top="Сортировка">
                    <Radio name="radio" value="1" defaultChecked>
                        По умолчанию
                    </Radio>
                    <Radio name="radio" value="2">
                        По новизне
                    </Radio>
                    <Radio name="radio" value="3">
                        По стоимости
                    </Radio>
                </FormItem>
            </ModalPage>
        </ModalRoot>
    );

    // @ts-ignore
    return (
        <AdaptivityProvider>
            <AppRoot>
                <SplitLayout modal={modal}>
                    <View activePanel={activePanel} popout={popout}>
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
                            priceFilter={modalPriceInput}
                            // @ts-ignore
                            modalHandler={setActiveModal}
                            setAdData={setAdData}
                        />
                        <Profile
                            id="profile"
                            active={activePanel}
                            navigationHandler={setActivePanel}
                            user={fetchedUser}
                            onClickMyAds={onClickMyAds}
                        />
                        <AdPage id="one-ad" data={adData} setActivePanel={setActivePanel} />
                        <MyAdsListPage
                            id="myAds"
                            active={activePanel}
                            navigationHandler={setActivePanel}
                            setAdData={setAdData}
                        />
                    </View>
                </SplitLayout>
            </AppRoot>
        </AdaptivityProvider>
    );
};

export default App;
