import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ModalRoot,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { AdsListPage } from "./pages/AdsListPage/AdsListPage";
import { CreateAds } from "./pages/CreateAds/CreateAds";
import { Profile } from "./pages/Profile/Profile";
import { SearchModal } from "./components/SearchModal/SearchModal";

const App = () => {
    const [activePanel, setActivePanel] = useState('adsListPage');
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(null);
  const [activePanel, setActivePanel] = useState("adsListPage");
  const [activeModal, setActiveModal] = useState("");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(null);

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

            const session = await fetch('/api/session', {
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
                console.log(`/api/session: ${session.status}`);
            }
        }

        fetchData();
    }, []);

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <AdaptivityProvider>
      <AppRoot>
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
            modalHandler={setActiveModal}
          />
          <Profile
            id="profile"
            active={activePanel}
            navigationHandler={setActivePanel}
            user={fetchedUser}
          />
          <ModalRoot activeModal={activeModal}>
            <SearchModal />
          </ModalRoot>
        </View>
      </AppRoot>
    </AdaptivityProvider>
  );
};

export default App;
