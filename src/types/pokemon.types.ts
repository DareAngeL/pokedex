export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonDetails {
    id: number;
    abilities: PokemonAbilities[];
    base_experience: number;
    height: number;
    weight: number;
    name: string;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            }
        }
    };
    stats: PokemonStats[],
    types: PokemonTypes[]
}

export interface PokemonLocalStorage {
    id: number;
    name: string;
    color: string;
    image: string;
    nickname: string;
    date: string;
}

// ==========================================

export interface PokemonSpecies {
    color: {
        name: string
    }
}

export interface PokemonAbilities {
    ability: {
        name: string,
    },
    is_hidden: boolean,
    slot: number
}

export interface PokemonStats {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
    }
}

export interface PokemonTypes {
    type: {
        name: string;
    }
}