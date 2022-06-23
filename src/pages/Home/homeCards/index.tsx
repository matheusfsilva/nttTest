import React from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { PaperCard } from './styles';
import { selectList } from '../../../providers/redux/slices/producerSlice';
import { ProducerModel } from '../../../providers/models/ProducerModel';

interface homeCardInterface {
    type: 'Fazendas' | 'Hectares'
}

export default function HomeCard({ type }: homeCardInterface) {
    const listProducer: ProducerModel[] = useSelector(selectList);

    function getFarms(): number {
        return listProducer.length
    }

    function getHectares(): number {
        let allHectares = 0;
        listProducer.forEach((producer: ProducerModel) => {
            allHectares += producer.totalArea
        })
        return allHectares
    }

    return (
        <PaperCard elevation={0} sx={{ backgroundColor: type === 'Fazendas' ? '#D8D8FF' : '#B8F8CF' }}>
            <Typography align="center" variant="h3">{type === 'Fazendas' ? getFarms() : getHectares()}</Typography>
            <Typography align="center" variant="h4">{type}</Typography>
        </PaperCard>
    )
}