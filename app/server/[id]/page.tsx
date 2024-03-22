import { getDataById } from "@/app/services/fetch"

export default async function PokemonDetailsSSR({params}: {params: {id: number}}) {
    const pokemon = await getDataById(params.id)
    return (
      <div>page</div>
    )
  }
  