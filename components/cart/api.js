import axios from 'axios'

export class APICart {
    storedCart = []
    storedCartIds = []
    token
    url = "https://backends.donnachoice.com/api/products/cart/"
    countUrl = "https://backends.donnachoice.com/api/counts"

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
        return axios.get(this.countUrl, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            }
        })
    }

    setCartCount(setterFunc, dispatcher) {
        this.getItemsCount().then((res) => dispatcher(setterFunc(res.data.cart)))
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