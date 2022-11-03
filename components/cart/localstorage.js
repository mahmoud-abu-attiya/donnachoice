export class LocalStorageCart {
    storedCart = []
    storedCartIds = []

    load() {
        this.storedCart = JSON.parse(localStorage.getItem("stored-cart")) || []
        this.storedCartIds = this.storedCart.map(item => item.id)
    }

    getItemsCount() {
        return this.storedCartIds.length
        // this should be like the code below but keep it like this till the backend is updated
        let total = 0
        this.storedCart.forEach(item => {
            total += item.quantity
        })
        return total
    }

    setCartCount(setterFunc, dispatcher) {
        dispatcher(setterFunc(this.getItemsCount()))
    }

    add(optionId, quantity = 1) {
        const index = this.storedCartIds.indexOf(optionId)
        if (index === -1) {
            this.storedCart.push({
                id: optionId,
                amount: quantity
            })
            this.storedCartIds.push(optionId)
        } else {
            this.storedCart[index].amount += quantity
        }
    }

    remove(optionId, quantity = -1) {
        const index = this.storedCartIds.indexOf(optionId)
        if (index !== -1) {
            if (quantity === -1) {
                this.storedCart.splice(index, 1)
                this.storedCartIds.splice(index, 1)
            } else {
                this.storedCart[index].amount -= quantity
            }
        }
    }

    update(optionId, quantity) {
        const index = this.storedCartIds.indexOf(optionId)
        if (index !== -1) {
            this.storedCart[index].amount = quantity
        }
    }

    save() {
        localStorage.setItem("stored-cart", JSON.stringify(this.storedCart))
    }
}