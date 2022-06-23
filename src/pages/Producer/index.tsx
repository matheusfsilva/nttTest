/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import { Paper, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch } from 'react-redux';
import { paperSx, BoxButton, BoxBody, BoxBodySx } from './styles'
import Button from '../../components/Button';
import Input from '../../components/input';
import Select from '../../components/select';
import AutoCompleteChip from '../../components/autoCompleteChip';
import LoadingFull from '../../components/LoadingFull';
import { ProducerModel, ProducerModelValidation } from '../../providers/models/ProducerModel';
import { Culturas } from '../../providers/models/Consumable';
import { putProducer, postProducer, getProducer } from '../../services/apis/producerAPI';
import { addToList, removeToList } from '../../providers/redux/slices/producerSlice';

export default function ProducerPage() {
    const [producer, setProducer] = useState<ProducerModel>(new ProducerModel())
    const [errors, setErrors] = useState<ProducerModelValidation>(new ProducerModelValidation())
    const [load, setLoad] = useState(false)
    const [, setOpenCheck] = useState(false)
    const dispach = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    async function getApi() {
        if (id) {
            if (id !== 'new') {
                const response = await getProducer(parseInt(id, 10))
                if (response.status === 200) {
                    setProducer(response.data)
                }
            }
        }
    }

    useEffect(() => {
        async function get() {
            setLoad(true)
            await getApi()
            setLoad(false)
        } get()
    }, [])

    function cpfIsInvalid(cpf: string | undefined) {
        if (cpf) {
            cpf = cpf.replace(/[^\d]+/g, '');
            if (cpf === '') return false;
            // Elimina CPFs invalidos conhecidos	
            if (cpf.length !== 11 ||
                cpf === "00000000000" ||
                cpf === "11111111111" ||
                cpf === "22222222222" ||
                cpf === "33333333333" ||
                cpf === "44444444444" ||
                cpf === "55555555555" ||
                cpf === "66666666666" ||
                cpf === "77777777777" ||
                cpf === "88888888888" ||
                cpf === "99999999999")
                return false;
            // Valida 1o digito	
            let add = 0;
            for (let i = 0; i < 9; i++) {
                add += parseInt(cpf.charAt(i), 10) * (10 - i);
            }
            let rev = 11 - (add % 11);
            if (rev === 10 || rev === 11) {
                rev = 0;
            }
            if (rev !== parseInt(cpf.charAt(9), 10)) {
                return false;
            }
            // Valida 2o digito	
            add = 0;
            for (let i = 0; i < 10; i++) {
                add += parseInt(cpf.charAt(i), 10) * (11 - i);
            }
            rev = 11 - (add % 11);
            if (rev === 10 || rev === 11) {
                rev = 0;
            }
            if (rev !== parseInt(cpf.charAt(10), 10)) {
                return false;
            }
            return true;
        }
        return false;
    }

    const maskCpf = (v: string) => {
        v = v.replace(/\D/g, "")
        if (v.length <= 11) {
            v = v.replace(/(\d{3})(\d)/, "$1.$2")
            v = v.replace(/(\d{3})(\d)/, "$1.$2")
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        } else {
            v = v.slice(0, -1)
            v = v.replace(/(\d{3})(\d)/, "$1.$2")
            v = v.replace(/(\d{3})(\d)/, "$1.$2")
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        }
        return v
    }

    async function validation() {
        setErrors(new ProducerModelValidation())
        const userSchema = yup.object().shape({
            name: yup
                .string()
                .required('Nome requerido'),
            city: yup
                .string()
                .required('Cidade requerida'),
            state: yup
                .string()
                .required('Estado requerido'),
            farm: yup
                .string()
                .required('Nome da fazenda requerido'),
            cpf: yup
                .string()
                .required('Cpf requerido').test(
                    'test-invalid-cpf',
                    'cpf inválido',
                    (cpf) => cpfIsInvalid(cpf)),
            plantationCrops: yup.array().min(1, 'Selecione ao menos 1 cultura').required('cultura'),
            totalArea: yup.number().min(1, 'Area deve ser maior que 0').required('area total'),
            agriculturalArea: yup.number().min(1, 'Area deve ser maior que 0').required('area agricultavel'),
            vegetationArea: yup.number().min(1, 'Area deve ser maior que 0').required('area vegetacao'),
        })
        try {
            await userSchema
                .validate(producer, {
                    abortEarly: false,
                })
            return true
        } catch (error: any) {
            const validationErrors: any = {};
            error.inner.forEach((err: ValidationError) => {
                const path: string = err.path ? err.path?.toString() : 'null';
                validationErrors[path] = err.message;
            });
            setErrors(validationErrors)
            return false
        }
    }

    async function postProducerCall() {
        const response = await postProducer(producer)
        if (response.status === 201 || response.status === 200) {
            setOpenCheck(true)
            dispach(addToList(response.data))
            navigate(-1)
        }
    }

    async function putProducerCall() {
        const response = await putProducer(producer)
        console.log(response)
        if (response.status === 201 || response.status === 200) {
            setOpenCheck(true)
            dispach(removeToList(response.data.id))
            dispach(addToList(response.data))
            navigate(-1)
        }
    }

    async function submit(event: any) {
        event.preventDefault();
        setLoad(true)
        const valid = await validation()
        if (valid) {
            if (producer.id) {
                await putProducerCall()
            } else {
                await postProducerCall()
            }
        }
        setLoad(false)
    }

    return (
        <BoxBody sx={BoxBodySx}>
            <LoadingFull open={load} />
            <Paper sx={paperSx} elevation={0}>
                <form onSubmit={submit}>
                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <Typography variant='h4'>Informações</Typography>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Input
                                labelinput="Nome"
                                data-testid="Nome-input"
                                value={producer.name}
                                error={!!errors.name}
                                errormessage={errors.name}
                                onChange={(e) => setProducer((prevState: ProducerModel) => (
                                    { ...prevState, name: e.target.value }
                                ))}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Input
                                labelinput="Cpf"
                                data-testid="Cpf-input"
                                error={!!errors.cpf}
                                errormessage={errors.cpf}
                                value={producer.cpf}
                                onChange={(e) => setProducer((prevState: ProducerModel) => (
                                    { ...prevState, cpf: maskCpf(e.target.value) }
                                ))}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Input
                                labelinput="Nome da fazenda"
                                data-testid="Fazenda-input"
                                error={!!errors.farm}
                                value={producer.farm}
                                errormessage={errors.farm}
                                onChange={(e) => setProducer((prevState: ProducerModel) => (
                                    { ...prevState, farm: e.target.value }
                                ))}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Select
                                value={producer.state}
                                data-testid="Estado-input"
                                error={!!errors.state}
                                errormessage={errors.state}
                                stateInput
                                labelinput="Estado"
                                onChange={(e: any) => setProducer((prevState: ProducerModel) => (
                                    { ...prevState, state: e.target.value }
                                ))}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Select
                                value={producer.city}
                                data-testid="City-input"
                                disabled={!producer.state}
                                error={!!errors.city}
                                errormessage={errors.city}
                                selectStateForCitie={producer.state}
                                labelinput="Cidade"
                                onChange={(e: any) => setProducer((prevState: ProducerModel) => (
                                    { ...prevState, city: e.target.value }
                                ))}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <AutoCompleteChip
                                list={Culturas}
                                data-testid="Culturas-input"
                                error={!!errors.plantationCrops}
                                errormessage={errors.plantationCrops}
                                labelinput="Culturas cultivadas"
                                label='culturas'
                                valueInitial={producer.plantationCrops}
                                addList={(e: string[]) => setProducer((prevState) => (
                                    { ...prevState, plantationCrops: e }
                                ))}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <Typography variant='h4'>Dimensões da propriedade</Typography>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <Input
                                labelinput="Área total em hectares da fazenda"
                                data-testid="Total-input"
                                value={producer.totalArea}
                                error={!!errors.totalArea}
                                errormessage={errors.totalArea}
                                type="number"
                                onChange={(e) => setProducer((prevState: ProducerModel) => (
                                    { ...prevState, totalArea: parseInt(e.target.value, 10) }
                                ))}
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <Input
                                labelinput="Área agricultável em hectares"
                                type="number"
                                data-testid="Agricultavel-input"
                                error={!!errors.agriculturalArea}
                                errormessage={errors.agriculturalArea}
                                value={producer.agriculturalArea}
                                onChange={(e) => setProducer((prevState: ProducerModel) => (
                                    { ...prevState, agriculturalArea: parseInt(e.target.value, 10) }
                                ))}
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <Input
                                labelinput="Área de vegetação em hectares"
                                data-testid="Vegetacao-input"
                                value={producer.vegetationArea}
                                errormessage={errors.vegetationArea}
                                error={!!errors.vegetationArea}
                                type="number"
                                onChange={(e) => setProducer((prevState: ProducerModel) => (
                                    { ...prevState, vegetationArea: parseInt(e.target.value, 10) }
                                ))}
                            />
                        </Grid>
                    </Grid>
                    <BoxButton>
                        <NavLink to="/listProducer">
                            <Button sx={{ marginRight: '5px' }} cor="red" tonalidade="A400"><CloseIcon />Cancelar</Button>
                        </NavLink>
                        <Button tonalidade={200} type="submit"><DoneIcon />Concluir</Button>
                    </BoxButton>
                </form>
            </Paper>
        </BoxBody>
    )
}