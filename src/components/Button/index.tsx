/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable react/require-default-props */
import React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import {
  green, purple, blue, amber, blueGrey,
  brown, common, cyan, deepOrange,
  deepPurple, grey,
  indigo, lightBlue, lightGreen, lime, orange,
  pink, red, teal, yellow,
} from '@mui/material/colors';


const colors = {
  green, purple, blue, amber, blueGrey,
  brown, common, cyan, deepOrange,
  deepPurple, grey,
  indigo, lightBlue, lightGreen, lime, orange,
  pink, red, teal, yellow,
}

interface _Button extends ButtonProps {
  cor?: string | number;
  tonalidade?: number | string;
  variante?: string;
  loading?: boolean;
}

type colorType = {
  color: number | string,
  hover: number | string,
  contrast: number | string,
}

export default function ButtonTemplate({
  variante, tonalidade, cor, loading = false, ...rest
}: _Button) {
  function getTonalidade(): colorType {
    const defaultTonalidade = {
      color: 500,
      hover: 600,
      contrast: 700,
    }
    if (tonalidade) {
      if (typeof tonalidade === 'string') {
        const acceptedTonalidadesString = {
          A100() {
            return {
              color: tonalidade,
              hover: tonalidade,
              contrast: tonalidade,
            };
          },
          A200() {
            return {
              color: tonalidade,
              hover: tonalidade,
              contrast: tonalidade,
            };
          },
          A400() {
            return {
              color: tonalidade,
              hover: tonalidade,
              contrast: tonalidade,
            };
          },
          A700() {
            return {
              color: tonalidade,
              hover: tonalidade,
              contrast: tonalidade,
            };
          },
          success() {
            return {
              color: '#1BC5BD',
              hover: '#1BC5BD',
              contrast: '#000000',
            };
          }
        }
        return acceptedTonalidadesString[tonalidade as keyof typeof acceptedTonalidadesString] ?
          acceptedTonalidadesString[tonalidade as keyof typeof acceptedTonalidadesString]() :
          defaultTonalidade
      } if (tonalidade > 900) {
        return defaultTonalidade
      }
      return {
        color: tonalidade,
        hover: tonalidade + 100 > 900 ? 900 : tonalidade + 100,
        contrast: tonalidade + 300 > 900 ? 900 : tonalidade + 200,
      };
    }
    return defaultTonalidade
  }

  function getColor(): any {
    if (cor) {
      return colors[cor as keyof typeof colors] ? colors[cor as keyof typeof colors] : colors.blue
    }
    return colors.blue;
  }

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(getColor()[getTonalidade().contrast]),
    backgroundColor: getColor()[getTonalidade().color],
    '&:hover': {
      backgroundColor: getColor()[getTonalidade().hover],
    },
  }));

  const ColorButtonOutilined = styled(Button)<ButtonProps>(({ theme }) => ({
    color: getColor()[getTonalidade().color],
    borderColor: getColor()[getTonalidade().color],
    '&:hover': {
      borderColor: getColor()[getTonalidade().hover],
    },
  }));

  const ColorButtonNone = styled(Button)<ButtonProps>(({ theme }) => ({
    color: getColor()[getTonalidade().color],
    '&:hover': {
      // borderColor: getColor()[getTonalidade()+100],
    },
  }));

  return (
    <div>
      {variante === 'outlined'
        ? (
          <ColorButtonOutilined
            {...rest}
          >
            {rest.children}
          </ColorButtonOutilined>
        ) : variante === 'none'
          ? (
            <ColorButtonNone {...rest}>
              {rest.children}
            </ColorButtonNone>
          ) : (
            <ColorButton
              {...rest}
            >
              {rest.children}
            </ColorButton>
          )}
    </div>
  );
}