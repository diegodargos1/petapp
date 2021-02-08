import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import Store from '../models/Store';
import storeView from '../views/store_view';

export default {
    async store(req: Request, res: Response) {
        const user_id = parseInt(req.params.id);
        const {
            id,
            name,
            razaosocial,
            inscricaoestadual,
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

        const data = {
            name,
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
            inscricaoestadual,
            razaosocial,
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
        }

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome Fantasia obrigatorio.'),
            rua: Yup.string().required('Rua obrigatorio'),
            numero: Yup.string().required('Numero obrigatorio'),
            cidade: Yup.string().required('Cidade obrigatorio'),
            estado: Yup.string().required('Estado obrigatorio'),
            cnpj: Yup.string().required('CNPJ obrigatorio'),
            cep: Yup.string().required('CEP obrigatorio'),
            inscricaoestadual: Yup.string().required('Inscricao Estadual obrigatorio'),
            razaosocial: Yup.string().required('Razao Social obrigatorio'),
            user_id: Yup.number().required('Favor fazer o login novamente.'),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string()
                })
            )
        })
        await schema.validate(data, {
            abortEarly: false,
        })

        const storeLocation = storeRepository.create(data);

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
            name,
            razaosocial,
            inscricaoestadual,
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
            name,
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
            inscricaoestadual,
            razaosocial,
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

