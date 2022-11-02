import axios from 'axios'

export class APICart {
    storedCart = []
    storedCartIds = []
    token
    url = "https://backends.donnachoice.com/api/products/cart/"

    constructor(token) {
        this.token = token
    }

    load() {
        axios.get(this.url, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        }).then((res) => {
            this.storedCart = res.data
            this.storedCartIds = this.storedCart.map((item) => item.id)
        })
    }

    getItemsCount() {
        this.load()
        // this should call the backend endpoint to check for the count but now we should wait till this endpoint is updated
        return this.storedCartIds.length
    }

    add(optionId, quantity = 1) {
        axios.post(
            this.url,
            [
                {
                    option: optionId,
                    quantity: quantity
                }
            ],
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        )
    }

    remove(optionId, quantity = -1) {
        // TODO: implement
    }

    update(optionId, quantity) {
        // TODO: implement
    }

    save() {
        // already saves to the backend directly
    }

}