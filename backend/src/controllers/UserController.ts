import { Request, Response } from 'express';
import md5 from 'md5';
import { getRepository } from 'typeorm';
import User from '../models/User';

export default {
    async store(req: Request, res: Response) {

        let { email, password, nome } = req.body;

        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailCheck = re.test(email);
        const usersRepository = getRepository(User);
        password = md5('x' + password);
        let result = { info: {}, msg: "", error: false };

        if (nome == "") {
            result.msg = "Campo nome obrigatorio.";
            result.error = true;
            return res.json(result);
        }
        if (!emailCheck) {
            result.msg = "Email invalido.";
            result.error = true;
            return res.json(result);
        }
        const userFind = await usersRepository.query(`SELECT * FROM petapp.users WHERE email = '${email}'`)

        if (userFind == "") {
            const userCreate = usersRepository.create({
                email, password, nome
            });
            await usersRepository.save(userCreate);
            result.info = userCreate;
            result.msg = "Cadastro realizado com sucesso.";
            result.error = true;

        } else {
            result.msg = "Ja existe um cadastro para este email.";
            result.error = true;
        }


        return res.json(result);
    },
    async index(req: Request, res: Response) {

        let { email, password } = req.body;

        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailCheck = re.test(email);
        const usersRepository = getRepository(User);
        password = md5('x' + password);
        let result = { info: {}, msg: "", error: false };

        if (!emailCheck) {
            result.msg = "Email invalido.";
            result.error = true;
            return res.json(result);
        }
        const userFind = await usersRepository.findOne({
            where: [
                { email, password }
            ]
        })
        if (!userFind) {
            result.msg = "Email ou senha incorretos.";
            result.error = true;
            return res.json(result);
        }
        result.info = { email: userFind.email, name: userFind.nome, id: userFind.id }
        return res.json(result);
    },
    async indexFace(req: Request, res: Response) {

        let { name, email, id, accessToken } = req.body;
        const usersRepository = getRepository(User);
        let password = md5('x' + id);
        let result = { info: {}, msg: "", error: false };

        const userFind = await usersRepository.findOne({
            where: [
                { email, faceId: id }
            ]
        })

        if (!userFind) {
            try {
                const userCreate = usersRepository.create({
                    email, password, nome: name, faceId: id, faceToken: accessToken
                });
                await usersRepository.save(userCreate);
                result.info = { email, name, id: userCreate.id }
            } catch (e) {
                console.log(e);
                // [Error: Uh oh!]
            }
        } else {
            result.info = { email, name, id: userFind.id }
        }

        return res.json(result);
    },
    async indexCheck(req: Request, res: Response) {

        let { email, id } = req.body;
        const usersRepository = getRepository(User);

        let result = { info: {}, msg: "", error: false };

        const userFind = await usersRepository.findOne({
            where: [
                { email, id }
            ]
        })

        if (!userFind) {
            result.error = true

        }

        return res.json(result);
    },
};