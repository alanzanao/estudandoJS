Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: ` 
    <div class="product">

            <div class="product-image">
                <img v-bind:src="image">
            </div>
    
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <p> User is premium: {{ premium }} </p>
                <p> Shipping: {{ shipping }} </p>
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
    
                <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box"
                    :style="{ backgroundColor: variant.variantColor }" @mouseover="updateProduct(index)">
                </div>
            </div>

            <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">
            Add to cart
            </button>

        </div>
    `,
    data: function () {
        return {brand: 'Zanao',
        product: 'Socks',
        selectedVariant: 0,
        details: ["80% algodao", "fabricacao nacional", "mais vendio"],
        variants: [
            {variantId: 2234, variantColor: 'green', variantImage: './assets/greenSocks.jpg', variantQuantity: 0},
            {variantId: 2235, variantColor: 'black', variantImage: './assets/blackSocks.jpg', variantQuantity: 4}
        ],
        inventory: 10
        }   
    },
    methods: {
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
            this.variants[this.selectedVariant].variantQuantity -= 1;
            if (this.variants[this.selectedVariant].variantQuantity == 0){
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
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 9.99
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        updateCart (id) {
            this.cart.push(id)
        }
    }
})