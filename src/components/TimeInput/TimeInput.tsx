import { FormItem, Input } from '@vkontakte/vkui';
import React, { FC, ReactNode } from 'react';
import './TimeInput.css';
import { getMasked } from '../../helpers/mask/mask';

interface TimeInput {
    header: string | ReactNode;
    error: boolean;
    // errorText: string;

    time: string;
    setTime: React.Dispatch<React.SetStateAction<string>>;
}

export const TimeInput: FC<TimeInput> = ({ error, header, time, setTime }) => {
    const handleChangeTime = (evt: React.ChangeEvent) => {
        const target = evt.target as HTMLInputElement;
        const masked = getMasked(target.value);

        setTime(masked);
    };

    return (
        <FormItem
            top={header}
            className="time"
            status={(!time && error) || (time.length !== 5 && error) ? 'error' : undefined}
            bottom={!time && error ? 'Обязательное поле' : time.length !== 5 && error && 'Некорректные данные'}
        >
            <Input placeholder="14:20" value={time} onChange={handleChangeTime} />
        </FormItem>
    );
};
