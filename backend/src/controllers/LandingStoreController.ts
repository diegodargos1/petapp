import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Store from '../models/Store';
import storeView from '../views/store_view';

export default {
    async store(req: Request, res: Response) {
        const user_id = parseInt(req.params.id);
        const {
            id,
            nome,
            razao,
            inscricao,
            cnpj,
            website,
            telefone,
            numero,
            complemento,
            email,
            cep,
            cidade,
            estado,
            rua,
            latitude,
            longitude,
            domingoAbre,
            domingoFecha,
            segundaAbre,
            segundaFecha,
            tercaAbre,
            tercaFecha,
            quartaFecha,
            quartaAbre,
            quintaAbre,
            quintaFecha,
            sextaAbre,
            sextaFecha,
            sabadoAbre,
            sabadoFecha,
        } = req.body;

        const storeRepository = getRepository(Store);

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(i => {
            return { path: i.filename }
        })

        const storeFind = await storeRepository.findOne({
            where: [
                { cnpj }
            ]
        })

        if (storeFind) {
            return res.json({ msg: "Ja existe um estabelecimento com esse CNPJ registrado no sistema!" });
        }

        const storeLocation = storeRepository.create({
            name: nome,
            rua,
            numero,
            cidade,
            estado,
            complemento,
            email,
            telefone,
            website,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            cnpj,
            cep,
            inscricaoestadual: inscricao,
            razaosocial: razao,
            user_id,
            domingoAbre,
            domingoFecha,
            segundaAbre,
            segundaFecha,
            tercaAbre,
            tercaFecha,
            quartaFecha,
            quartaAbre,
            quintaAbre,
            quintaFecha,
            sextaAbre,
            sextaFecha,
            sabadoAbre,
            sabadoFecha,
            images
        });

        await storeRepository.save(storeLocation)

        return res.json({ info: storeView.render(storeLocation), msg: "Hotel salvo com sucesso!" });
    },
    async index(req: Request, res: Response) {
        const user_id = parseInt(req.params.id);

        console.log(user_id)

        const storeRepository = getRepository(Store);

        const storeFind = await storeRepository.find({
            where: [
                { user_id }
            ],
            relations: ['images']
        })

        return res.json({ info: storeView.renderMany(storeFind) });
        // return res.json({ info: "oi" });
    },
    async update(req: Request, res: Response) {
        const {
            id,
            nome,
            razao,
            inscricao,
            cnpj,
            website,
            telefone,
            numero,
            complemento,
            email,
            cep,
            cidade,
            estado,
            rua,
            latitude,
            longitude,
            domingoAbre,
            domingoFecha,
            segundaAbre,
            segundaFecha,
            tercaAbre,
            tercaFecha,
            quartaFecha,
            quartaAbre,
            quintaAbre,
            quintaFecha,
            sextaAbre,
            sextaFecha,
            sabadoAbre,
            sabadoFecha,
        } = req.body;

        const storeRepository = getRepository(Store);

        const storeUpdate = await storeRepository.createQueryBuilder().update(Store).set({
            name: nome,
            rua,
            numero,
            cidade,
            estado,
            complemento,
            email,
            telefone,
            website,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            cnpj,
            cep,
            inscricaoestadual: inscricao,
            razaosocial: razao,
            domingoAbre,
            domingoFecha,
            segundaAbre,
            segundaFecha,
            tercaAbre,
            tercaFecha,
            quartaFecha,
            quartaAbre,
            quintaAbre,
            quintaFecha,
            sextaAbre,
            sextaFecha,
            sabadoAbre,
            sabadoFecha,
        }).where("id = :id", { id: id }).execute();

        return res.json({ info: storeUpdate, msg: "Hotel salvo com sucesso!" });
    },

};

