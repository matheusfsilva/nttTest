import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PizzaChart from '../../components/PizzaChart';
import { setList, selectList } from '../../providers/redux/slices/producerSlice';
import { getProducers, } from '../../services/apis/producerAPI';
import { ProducerModel } from '../../providers/models/ProducerModel';
import LoadingFull from '../../components/LoadingFull';
import HomeCard from './homeCards';

export default function HomePage() {
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
            <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                    <HomeCard type="Fazendas" />
                </Grid><Grid item sm={6} xs={12}>
                    <HomeCard type="Hectares" />
                </Grid>
                <Grid item sm={4}>
                    <PizzaChart typeChart="agriculture" title="Culturas" />
                </Grid>
                <Grid item sm={4}>
                    <PizzaChart typeChart="area" title="Solo" />
                </Grid>
                <Grid item sm={4}>
                    <PizzaChart typeChart="state" title="Estados" />
                </Grid>
            </Grid>
        </Box >
    )
}