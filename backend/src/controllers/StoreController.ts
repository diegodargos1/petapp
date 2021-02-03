import { Request, Response } from 'express';

export default {
    async index(req: Request, res: Response) {

        // const lat = parseFloat(req.params.lat);
        // const lon = parseFloat(req.params.lon);

        // const storeRepository = getRepository(Store);

        // const stores = await storeRepository.find(
        //     {
        //         where: {
        //             // latitude: {
        //             //     [Op.gte]: -0.1 + lat,
        //             //     [Op.lte]: lat + 0.2
        //             // },
        //             // longitude: {
        //             //     [Op.lte]: lon + 0.1,
        //             //     [Op.gte]: -0.2 + lon
        //             // },
        //         }
        //     }
        // );
        // return res.json(stores);
    },

    async store(req: Request, res: Response) {
        // const { name, rua, numero, cidade, estado, complemento, email, telefone, website, latitude, longitude, cnpj, inscricaoestadual, razaosocial } = req.body;

        // const storeRepository = getRepository(Store);

        // const requestImages = req.files as Express.Multer.File[];
        // const images = requestImages.map(async image => {
        //     return { path: image.filename }
        // })

        // const storeLocation = storeRepository.create({
        //     name,
        //     rua,
        //     numero,
        //     cidade,
        //     estado,
        //     complemento,
        //     email,
        //     telefone,
        //     website,
        //     latitude,
        //     longitude,
        //     cnpj,
        //     inscricaoestadual,
        //     razaosocial
        // });

        // await storeRepository.save(storeLocation)

        // return res.json({ info: [storeLocation, images] });
    }
};