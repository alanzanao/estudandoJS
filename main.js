var app = new Vue({
    el: '#app',
    data: {
        brand: 'Zanao',
        product: 'Socks',
        selectedVariant: 0,
        details: ["80% algodao", "fabricacao nacional", "mais vendio"],
        variants: [
            {variantId: 2234, variantColor: 'green', variantImage: './assets/greenSocks.jpg', variantQuantity: 0},
            {variantId: 2235, variantColor: 'black', variantImage: './assets/blackSocks.jpg', variantQuantity: 2}
        ],
        cart: 0,
        inventory: 10
    },
    methods: {
        addToCart(){
            this.cart += 1;
            this.inventory -= 1;
            if (this.inventory == 0){
                this.inStock = false
            }
        },
        updateProduct(index){
            this.selectedVariant = index
            console.log(index)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        }
    }
    
})