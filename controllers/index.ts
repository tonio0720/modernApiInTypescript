import {
    JsonController,
    Get,
    QueryParams,
    Param,
} from 'routing-controllers';
import { IsInt, IsOptional } from 'class-validator';

interface Pokemon {
    id: number;
    name: string;
    type1: string;
    type2: string;
}

const pokemons: Pokemon[] = [
    {
        id: 1,
        name: 'フシギダネ',
        type1: 'くさ',
        type2: 'どく'
    },
    {
        id: 2,
        name: 'フシギソウ',
        type1: 'くさ',
        type2: 'どく'
    },
    {
        id: 3,
        name: 'フシギバナ',
        type1: 'くさ',
        type2: 'どく'
    }
]

class GetPokemonQuery {
    @IsInt()
    @IsOptional()
    limit?: number;

    @IsInt()
    @IsOptional()
    offset?: number;
}

@JsonController()
export class PokemonController {
    @Get('/pokemons')
    async pokemons(
        @QueryParams() query: GetPokemonQuery
    ): Promise<Pokemon[]> {
        const { offset = 0, limit = 100 } = query;
        return pokemons.slice(offset, offset + limit);
    }

    @Get('/pokemon/:id')
    async pokemon(
        @Param('id') id: number
    ): Promise<Pokemon> {
        const pokemon = pokemons.find((pokemon) => pokemon.id === id);
        if (pokemon) {
            return pokemon;
        }
        throw new Error('no pokemon');
    }
}
