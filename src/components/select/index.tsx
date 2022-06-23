/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SelectMaterial, { SelectProps } from '@mui/material/Select';
import statesBrasil from '../../assets/json/statesBrasil.json';
import citiesBrasil from '../../assets/json/citiesBrasil.json';
import { CitiesModel, StateModel } from '../../providers/models/Consumable';
import { iconSx, MenuProps } from './style';
import Input from '../input';

type _selectValue<t> = {
    label: string;
    value: t;
}
interface _Select extends SelectProps {
    labelinput?: string,
    list?: _selectValue<string>[],
    stateInput?: boolean,
    selectStateForCitie?: string,
    errormessage?: string | boolean,
}

export default function Select({ labelinput, list, stateInput, selectStateForCitie, errormessage, ...props }: _Select) {
    const [listState, setListState] = useState<_selectValue<string>[]>(list || [])
    const [load, setLoad] = useState(true)

    useEffect(() => {
        if (stateInput) {
            setListState(statesBrasil.map((state: StateModel): _selectValue<string> => ({
                label: state.nome,
                value: state.sigla
            })))
        }
    }, [])

    useEffect(() => {
        setLoad(false)
        if (selectStateForCitie) {
            const auxCities = citiesBrasil.filter(((city: CitiesModel) => city.estado === selectStateForCitie))
            setListState(auxCities.map((city: CitiesModel): _selectValue<string> => ({
                label: city.cidade,
                value: `${city.cidade}-${city.sigla}`
            })
            ))
        }
        setLoad(true)
    }, [selectStateForCitie])

    return (
        <SelectMaterial
            input={<Input labelinput={labelinput} errormessage={errormessage} />}
            variant="outlined"
            {...props}
            IconComponent={() => (<KeyboardArrowDownIcon sx={iconSx} />)}
            MenuProps={MenuProps}
        >
            {load &&
                (listState || []).map((e: _selectValue<string>) => (
                    <MenuItem key={e.value} value={e.label}>{e.label}</MenuItem>
                ))
            }
        </SelectMaterial>
    );
}
