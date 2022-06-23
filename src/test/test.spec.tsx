/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import { act, render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux'
import ProducerPage from '../pages/Producer/index';
import Store from '../providers/redux/store';
// import { useContextProvider } from '../providers/context/contextProvider'


function ReduxProvider({ children, reduxStore }: any) {
    return <Provider store={reduxStore}>{children}</Provider>
}

describe('Test ProducerPage regras de entrada ', () => {
    it('regras de entrada', async () => {
        const history = createMemoryHistory();
        const route = '/Producer/new';
        history.push(route);

        await act(async () => {
            const component = render(<Router location={history.location} navigator={history}><ReduxProvider reduxStore={Store}><ProducerPage /></ReduxProvider></Router >);
        });

        expect(screen.getByText('Nome')).toBeInTheDocument()
        expect(screen.getByText('Cpf')).toBeInTheDocument()
        expect(screen.getByText('Nome da fazenda')).toBeInTheDocument()
        expect(screen.getByText('Estado')).toBeInTheDocument()
        expect(screen.getByText('Cidade')).toBeInTheDocument()
        expect(screen.getByText('Culturas cultivadas')).toBeInTheDocument()
        expect(screen.getByText('Área total em hectares da fazenda')).toBeInTheDocument()
        expect(screen.getByText('Área agricultável em hectares')).toBeInTheDocument()
        expect(screen.getByText('Área de vegetação em hectares')).toBeInTheDocument()
    })

    it('Erros das Regras de entrada (yup)', async () => {
        const history = createMemoryHistory();
        const route = '/Producer/new';
        history.push(route);
        await act(async () => {
            const component = render(<Router location={history.location} navigator={history}><ReduxProvider reduxStore={Store}><ProducerPage /></ReduxProvider></Router >);
        });

        await act(async () => {
            userEvent.click(screen.getByText('Concluir'))
        });

        expect(screen.queryByText('Nome requerido')).toBeInTheDocument()
        expect(screen.queryByText('Cidade requerida')).toBeInTheDocument()
        expect(screen.queryByText('Nome da fazenda')).toBeInTheDocument()
        expect(screen.queryByText('Estado requerido')).toBeInTheDocument()
        expect(screen.queryByText('Nome da fazenda requerido')).toBeInTheDocument()
        expect(screen.queryByText('Selecione ao menos 1 cultura')).toBeInTheDocument()
        expect(screen.queryAllByText('Area deve ser maior que 0')).toBeTruthy()


    })
})