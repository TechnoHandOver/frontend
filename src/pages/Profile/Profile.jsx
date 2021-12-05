import { Cell } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import React from 'react';
import { ProfileBlock } from '../../components/ProfileBlock/ProfileBlock';
import { AdsIcon } from '../../images/ads/AdsIcon';
import { BasePage } from '../BasePage/BasePage';

export const Profile = ({ id, user, active, navigationHandler, onClickMyAds }) => {
    return (
        <BasePage id={id} active={active} headerText="Профиль" navigationHandler={navigationHandler}>
            {user && <ProfileBlock {...user} />}
            <Cell before={<AdsIcon />} onClick={onClickMyAds}>
                Мои объявления
            </Cell>
        </BasePage>
    );
};

Profile.propTypes = {
    id: PropTypes.string.isRequired,
};
