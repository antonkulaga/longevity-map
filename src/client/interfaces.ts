export interface IOlympicData {
    athlete: string;
    age: number;
    country: string;
    year: number;
    date: string;
    sport: string;
    gold: number;
    silver: number;
    bronze: number;
    total: number;
}

/**
 * Has some mistakes, for example some fields are either str or undefined, there can be other mistakes in field names or values
 */
export interface ILongevityRow{
    id: int;
    quickyear:int;
    population_id: int;
    study_design: str;
    conclusions: str;
    association: str;
    gender: str;
    identifier: str;
    identifier_alt: str;
    gene_symbol: str;
    genotypes: str;
    "Genotype longevity weight": str;
    Skip: str;
    quickpubmed: int;
    "Gene prioritization": int;
    location: str;
    quickref: str;
    gene_id: str;
}
//just for the sake of example