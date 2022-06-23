/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { iconSx, MenuProps } from './styles';
import Input from '../input';

interface _AutoComplete extends SelectProps {
    labelinput?: string,
    list: string[],
    addList: Function,
    valueInitial: string[],
    errormessage?: string | boolean,
}

export default function AutoCompleteChip(props: _AutoComplete) {
    const [LocalValue, setLocalValue] = React.useState<string[]>(props.valueInitial);

    React.useEffect(() => {
        setLocalValue(props.valueInitial)
    }, [props.valueInitial])

    const handleChange = (event: SelectChangeEvent<typeof LocalValue>) => {
        const {
            target: { value },
        } = event;
        setLocalValue(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        // returnLocal.push(typeof value === 'string' ? value.split(',') : value)
        props.addList(typeof value === 'string' ? value.split(',') : value)
    };

    return (
        <div>
            <Select
                multiple
                value={LocalValue}
                disabled={props.disabled}
                onChange={handleChange}
                input={<Input labelinput={props.labelinput} error={props.error} errormessage={props.errormessage} />}
                IconComponent={() => (<KeyboardArrowDownIcon sx={iconSx} />)}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip sx={{ height: '22px' }} key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {props.list.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
}