import React, { useEffect, useState } from 'react';
import { Box, List } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ProducerModel } from '../../providers/models/ProducerModel';
import { selectList, setList } from '../../providers/redux/slices/producerSlice';
import Button from '../../components/Button';
import ItemCard from './itemCard';
import { getProducers } from '../../services/apis/producerAPI';
import LoadingFull from '../../components/LoadingFull';

export default function ListProducer() {
    const [load, setLoad] = useState(false)
    const dispach = useDispatch();
    const listProducer: ProducerModel[] = useSelector(selectList);

    async function getApi() {
        const response = await getProducers()
        if (response.status === 200) {
            dispach(setList(response.data))
        }
    }

    useEffect(() => {
        async function get() {
            setLoad(true)
            if (listProducer.length === 0) {
                await getApi()
            }
            setLoad(false)
        }
        get()
    }, [])

    return (
        <Box>
            <LoadingFull open={load} />
            <NavLink to="/Producer/new">
                <Button tonalidade={200}><AddIcon />Adicionar</Button>
            </NavLink>
            <List>
                {
                    listProducer.map((producer: ProducerModel) => (
                        <ItemCard key={producer.id} producer={producer} />
                    ))
                }
            </List>
        </Box>
    )
}