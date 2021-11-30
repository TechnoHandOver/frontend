import bridge from '@vkontakte/vk-bridge';
import {
    View,
    AdaptivityProvider,
    AppRoot,
    ModalRoot,
    SplitLayout,
    ModalPage,
    ModalPageHeader,
    PanelHeaderClose,
    FormItem,
    Input,
    Radio,
} from '@vkontakte/vkui';
import React, { useState, useEffect, useCallback, FC } from "react";
import '@vkontakte/vkui/dist/vkui.css';

import { Modals } from './enums/Modals';
import { AdPage } from './pages/AdPage/AdPage';
import { AdsListPage } from './pages/AdsListPage/AdsListPage';
import { ChangeAds } from "./pages/ChangeAds/ChangeAds";
import { CreateAds } from './pages/CreateAds/CreateAds';
import { MyAdsListPage } from './pages/MyAdsListPage/MyAdsListPage';
import { Profile } from './pages/Profile/Profile';

const App: FC = () => {
    const [activePanel, setActivePanel] = useState('adsListPage');
    const [activeModal, setActiveModal] = useState(null);
    const [adData, setAdData] = useState({});
    const [fetchedUser, setUser] = useState<any>(null);
    const [popout, setPopout] = useState(null);
    const [modalPriceInput, setModalPriceInput] = useState('');
    const [createAd, setCreateAd] = useState({});

    useEffect(() => {
        bridge.subscribe(({ detail: { type, data } }) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }

            if (type === 'VKWebAppAllowMessagesFromGroupResult') {
                console.log('успех');
            }

            if (type === 'VKWebAppAllowMessagesFromGroupFailed') {
                console.log(data);
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

            const { result } = await bridge.send('VKWebAppAllowMessagesFromGroup', { group_id: 207601466, key: 'misha' });
            if (result) {
                console.log('привет');
            }
        }

        fetchData();
    }, []);


    const handleCloseModal = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setActiveModal(null);
    }, []);

    const handleChangePrice = useCallback((evt) => {
        setModalPriceInput(evt.target.value);
    }, []);

    const onClickMyAds = useCallback(() => {
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
                    <Input type="number" value={modalPriceInput} onChange={handleChangePrice} />
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
                        <AdPage id="one-ad" data={adData} setActivePanel={setActivePanel} setCreateAd={setCreateAd}  userId={fetchedUser?.id}/>
                        <MyAdsListPage
                            id="myAds"
                            active={activePanel}
                            navigationHandler={setActivePanel}
                            setAdData={setAdData}
                        />
                        <ChangeAds id="change-ad" navigationHandler={setActivePanel} active={activePanel} setPopout={setPopout} setActivePanel={setActivePanel} data={createAd}/>
                    </View>
                </SplitLayout>
            </AppRoot>
        </AdaptivityProvider>
    );
};

export default App;
