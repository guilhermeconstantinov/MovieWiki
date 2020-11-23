<template>
    <router-link tag="li" :to="`/${type}/${id}`" class="item" :class="{scale: scale}" >
        <div class="poster">
            <img :src="getPoster" alt="">
            <span class="year">{{year | year}}</span>
        </div>
        <h1>{{title}}</h1>
        <p class="genres">{{getGenres(genres)}}</p>
        
    </router-link>
</template>

<script>
export default {
    props:{
        id: Number,
        title: String,
        year: String,
        poster: String,
        genres: Array,
        type: String,
        scale:{
            type:Boolean,
            default: true
        }
    },  
  
    computed:{
        getPoster(){
           return this.poster == null? require('@/assets/semfoto.jpg') : `https://image.tmdb.org/t/p/w342${this.poster}`
        },
    },    
    methods:{
        getGenres(value){
            const genres = this.$store.state.genres
            let result = []
            for(const id of value){
                for(const genre of genres){
                    if(genre.id == id){
                        result.push(genre.name)
                    }
                }
            }
            return (result.length < 1)? 'Uncategorized': result.reduce((accumulator,currentValue)=> accumulator + ', '+ currentValue)
        }
    }
    
   
}
</script>
<style >
    .item{
        display: flex;
        flex-direction: column;
        width: 150px;
    }
    .item:hover{
        cursor:pointer;
    }
    .scale:hover{
         transform: scale(1.1);
    }
    .item h1{
        font-size: 0.9rem;
        font-weight: 600;
        color: rgb(66, 66, 66);
    }
    .poster{
        position: relative;
    }
    .poster img{
        width: 100%;
    }
    .year{
        position: absolute;
        right:0;
        bottom: 0;
        padding: 5px 8px;
        background-color:rgb(214, 211, 24);
        border-radius: 5px 0 0 0;
        color:rgb(49, 49, 49);
        font-weight: 600;
        letter-spacing: -1px;
    }
    .genres{
        font-size: 0.8rem;
        padding-right: 5px;
        color: rgb(116, 116, 116);
     
    }



</style>
