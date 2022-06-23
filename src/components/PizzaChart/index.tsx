/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable operator-assignment */
/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line no-unused-vars
import Raact, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectList } from '../../providers/redux/slices/producerSlice';
import { ProducerModel } from '../../providers/models/ProducerModel';
import { PaperCardChart } from './styles';

type auxValues<KeyName, KeyValue> = {
    name: KeyName,
    value: KeyValue
}

type infosType = {
    series: number[],
    labels: string[],
}

interface PizzaChartInterface {
    typeChart: 'state' | 'agriculture' | 'area',
    title: 'Estados' | 'Culturas' | 'Solo'
}

export default function PizzaChart({ typeChart, title }: PizzaChartInterface) {
    const listProducer: ProducerModel[] = useSelector(selectList);
    const [infos, setInfos] = useState<infosType>({
        series: [],
        labels: [],
    })

    function calculateSeries(arrayAux: auxValues<string, number>[]): number[] {
        const retunrArray: number[] = []
        arrayAux.forEach((element: auxValues<string, number>) => {
            retunrArray.push(element.value)
        })
        return retunrArray
    }

    function calculateLabels(arrayAux: auxValues<string, number>[]): string[] {
        const retunrArray: string[] = []
        arrayAux.forEach((element: auxValues<string, number>) => {
            retunrArray.push(element.name)
        })
        return retunrArray
    }

    function getAgricultureInfo() {
        const auxArray: auxValues<string, number>[] = []
        listProducer.forEach((producer: ProducerModel) => {
            producer.plantationCrops.forEach((plantation: string) => {
                if (!auxArray.find((state: auxValues<string, number>) => state.name === plantation)) {
                    auxArray.push({
                        name: plantation,
                        value: 1
                    })
                } else {
                    const index = auxArray.map((state: auxValues<string, number>) => state.name).indexOf(plantation)
                    auxArray[index].value = auxArray[index].value + 1
                }
            })
        })
        setInfos({
            series: calculateSeries(auxArray),
            labels: calculateLabels(auxArray)
        })
    }

    function getStateInfo() {
        const auxArray: auxValues<string, number>[] = []
        listProducer.forEach((producer: ProducerModel) => {
            if (!auxArray.find((state: auxValues<string, number>) => state.name === producer.state)) {
                auxArray.push({
                    name: producer.state,
                    value: 1
                })
            } else {
                const index = auxArray.map((state: auxValues<string, number>) => state.name).indexOf(producer.state)
                auxArray[index].value = auxArray[index].value + 1
            }
        })
        setInfos({
            series: calculateSeries(auxArray),
            labels: calculateLabels(auxArray)
        })
    }

    function getAreaInfo() {
        let agriculture = 0;
        let vagetation = 0;

        listProducer.forEach((producer: ProducerModel) => {
            agriculture += producer.agriculturalArea
            vagetation += producer.vegetationArea
        })
        setInfos({
            series: [agriculture, vagetation],
            labels: ['Área agricultáve', 'vegetação']
        })
    }

    const types = {
        state: getStateInfo,
        agriculture: getAgricultureInfo,
        area: getAreaInfo
    }

    useEffect(() => {
        if (types[typeChart]) {
            types[typeChart]()
        }
    }, [listProducer])

    const options = {
        chart: {
            id: 'apexchart-example',
        },
        dataLabels: {
            enabled: false,
        },
        labels: infos.labels,
        legend: {
            show: false,
        }
    }

    return (
        <PaperCardChart elevation={0}>
            <Chart options={options} series={infos.series} type="donut" width={300} style={{ display: 'flex', justifyContent: 'center' }} />
            <Typography variant="h5" align="center">{title}</Typography>
        </PaperCardChart>
    )

}