import { datosIglesias } from "../mock";

export default function handler(req: any, res: any) {
    const {id} = req.query;
    const church = datosIglesias.find(iglesia => {
        return iglesia.id.toString() === id.toString()
    })
    res.status(200).json(church)
}

