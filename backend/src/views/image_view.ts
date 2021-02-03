import Store_Images from '../models/Store_Images'

export default {
    render(image: Store_Images) {
        return {
            id: image.id,
            url: `http://localhost:3333/uploads/${image.path}`,
        }
    },
    renderMany(images: Store_Images[]) {
        return images.map(image => this.render(image))
    }
}