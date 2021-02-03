import Store from '../models/Store'
import imagesView from './image_view'

export default {
    render(store: Store) {
        return {
            id: store.id,
            user_id: store.user_id,
            cnpj: store.cnpj,
            inscricao: store.inscricaoestadual,
            razao: store.razaosocial,
            nome: store.name,
            rua: store.rua,
            numero: store.numero,
            cidade: store.cidade,
            estado: store.estado,
            complemento: store.complemento,
            email: store.email,
            telefone: store.telefone,
            website: store.website,
            latitude: store.latitude,
            longitude: store.longitude,
            cep: store.cep,
            domingoAbre: store.domingoAbre,
            domingoFecha: store.domingoFecha,
            segundaAbre: store.segundaAbre,
            segundaFecha: store.segundaFecha,
            tercaAbre: store.tercaAbre,
            tercaFecha: store.tercaFecha,
            quartaFecha: store.cep,
            quartaAbre: store.cep,
            quintaAbre: store.cep,
            quintaFecha: store.cep,
            sextaAbre: store.cep,
            sextaFecha: store.cep,
            sabadoAbre: store.cep,
            sabadoFecha: store.cep,
            images: imagesView.renderMany(store.images)
        }
    },

    renderMany(store: Store[]) {
        return store.map(store => this.render(store))
    }
}