/* eslint-disable max-classes-per-file */
export class ProducerModel {
    name: string = '';

    plantationCrops: string[] = [];

    farm: string = '';

    city: string = '';

    state: string = '';

    cpf: string = '';

    totalArea: number = 0;

    agriculturalArea: number = 0;

    vegetationArea: number = 0;

    id: number = 0
}

export class ProducerModelValidation {
    name: string = '';

    plantationCrops: string = '';

    farm: string = '';

    city: string = '';

    state: string = '';

    cpf: string = '';

    totalArea: string = '';

    agriculturalArea: string = '';

    vegetationArea: string = '';
}