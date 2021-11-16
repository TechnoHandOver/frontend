import React from 'react';

import { IconButton, Input } from '@vkontakte/vkui';
import { Icon16Clear } from '@vkontakte/icons';
import { SettingsIcon } from '../../images/settings/SettingsIcon';

import './SearchPanel.css';

export const SearchPanel = ({ fromInput, onChangeFromInput, toInput, onChangeToInput }) => {
    return (
        <div className="search-panel">
            <div className="search-panel__inputs-block">
                <Input type="text" placeholder="Откуда" value={fromInput} onChange={onChangeFromInput} />
                <Input
                    type="text"
                    placeholder="Куда"
                    className="search-panel__input"
                    value={toInput}
                    onChange={onChangeToInput}
                />
            </div>
            <div className="search-panel__icon">
                <SettingsIcon />
            </div>
        </div>
    );
};
