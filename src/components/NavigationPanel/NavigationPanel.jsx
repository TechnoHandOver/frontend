import * as React from 'react';
import {FixedLayout, IconButton, Separator} from "@vkontakte/vkui";
import {Icon16LikeOutline, Icon20Add, Icon20Search, Icon28Profile} from '@vkontakte/icons';
import './NavigationPanel.css';

const defaultIconSizes = 28;
const iconIds = {
    'add': 'createads',
    'search': 'adsListPage',
}
const icons = [
    {
        id: 'like',
        content: <Icon16LikeOutline width={defaultIconSizes} height={defaultIconSizes}/>,
        activeContent: <Icon16LikeOutline width={defaultIconSizes} height={defaultIconSizes}  fill='#5c9ce6'/>,
    },
    {
        id: 'profile',
        content: <Icon28Profile/>,
        activeContent: <Icon28Profile fill='#5c9ce6'/>,
    },
    {
        id: 'add',
        content: <Icon20Add width={defaultIconSizes} height={defaultIconSizes}/>,
        activeContent: <Icon20Add width={defaultIconSizes} height={defaultIconSizes} fill='#5c9ce6'/>,
    },
    {
        id: 'search',
        content: <Icon20Search width={defaultIconSizes} height={defaultIconSizes}/>,
        activeContent: <Icon20Search width={defaultIconSizes} height={defaultIconSizes} fill='#5c9ce6'/>,
    }
];

export const NavigationPanel = function NavigationPanel({active, navigationHandler}) {
    const [activeId, setActiveId] = React.useState(active);

    const onClickHandler = React.useCallback((evt) => {
        const currentId = evt.currentTarget.id;
        if (navigationHandler && iconIds[currentId]) {
            navigationHandler(iconIds[currentId]);
            setActiveId(iconIds[currentId]);
        }
    }, [navigationHandler]);

    return (
        <FixedLayout filled vertical='bottom'>
            <div className='navigational-panel'>
                {icons.map(item => (
                    <IconButton id={item.id} onClick={onClickHandler} key={item.id}>
                        {iconIds[item.id] === activeId ? item.activeContent : item.content}
                    </IconButton>
                ))}
            </div>
        </FixedLayout>

    );
}