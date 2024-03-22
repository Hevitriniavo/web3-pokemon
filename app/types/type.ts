
interface Ability {
    name: string;
    url: string;
}

interface AbilityInfo {
    ability: Ability;
    is_hidden: boolean;
    slot: number;
}

interface Sprites {
    front_default: string;
}

interface Cry {
    latest: string;
    legacy: string;
}

interface Form {
    name: string;
    url: string;
}

interface GameIndex {
    game_index: number;
    version: {
        name: string;
        url: string;
    };
}

interface Item {
    name: string;
    url: string;
}

interface VersionDetail {
    rarity: number;
    version: {
        name: string;
        url: string;
    };
}

interface HeldItem {
    item: Item;
    version_details: VersionDetail[];
}

interface Move {
    name: string;
    url: string;
}

interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: {
        name: string;
        url: string;
    };
    version_group: {
        name: string;
        url: string;
    };
}

interface MoveInfo {
    move: Move;
    version_group_details: VersionGroupDetail[];
}

export interface Pokemon {
    abilities: AbilityInfo[];
    base_experience: number;
    cries: Cry;
    forms: Form[];
    game_indices: GameIndex[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: MoveInfo[];
    name: string;
    species: {
        name: string;
        url: string;
    };
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    weight: number;
    sprites: Sprites;
}


export interface PokemonResult {
    name: string;
    url: string;
}

export interface ResponsePokemon {
    name: string;
    details: Pokemon[]
}