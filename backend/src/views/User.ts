import User from '../models/User'

export default {
    render(user: User) {
        return {
            id: user.id,
            email: user.email,
            password: user.password,
            nome: user.nome,
            faceId: user.faceId,
            faceToken: user.faceToken,
        }
    },

    renderMany(user: User[]) {
        return user.map(user => this.render(user))
    }
}