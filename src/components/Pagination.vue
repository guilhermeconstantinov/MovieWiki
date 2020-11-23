<template>
        <div class="center">
            <ul class="pagination" v-if="pagination">
                <li @click="pageDecre()">&lt;</li>
                <router-link tag="li" v-for="n in pages" :key="n" :to="{ name: $route.name, query: {page:(n+incre)}}">{{(n+incre)}}</router-link>
                <li @click="pageIncre()">&gt;</li>
                
            </ul>
        </div>

</template>

<script>

export default {
    props:{
        pagination:{
            default: true
        },
        results: Number, 
        qtdPage: Number, 
        route:{ 
            type: String, 
            default: ''
        }
    },
    data(){
        return{
            incre:0,
        }
    },
    computed:{
        pages(){
            return this.totalPages > 10 || isNaN(this.totalPages) ? 10 : this.totalPages
        },
        totalPages(){
            return Math.ceil(this.results / this.qtdPage)
        },
     
    },
    watch:{
        totalPages(){
            this.incre = 0
        }
    },
    methods:{
        pageIncre(){
            const maxIncrement = this.totalPages - this.pages
            return this.incre < maxIncrement ? this.incre += 10 : this.incre
        },
        pageDecre(){
            return this.incre > 0 ? this.incre -= this.pages: this.incre
        }
    }
}
</script>

<style>
.pagination{
    display: flex;
    list-style: none;
    flex-wrap: wrap;
}
.pagination > li{
    background-color:rgb(37, 95, 161);
    min-width: 30px;
    text-align: center;
    padding: 5px;
    margin: 10px 5px;
    cursor:pointer;
}
.center{
    display: flex;
    justify-content: center;
}
</style>