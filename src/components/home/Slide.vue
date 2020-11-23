<template>
    <header class="slide">
        <div class="slide-img" :style="{background: `url('${filtro}'), ${backdrop}`}">
            <div class="slide-group">
                <h1 class="title">{{title}}</h1>
                <p class="genres"></p>
                <h2>Starring</h2>
                <p>{{movie.credits.cast | starring}}</p>
                <div class="btn-group">
                    <router-link tag="button" :to="`/movie/${movie.id}`" class="red mr">Details</router-link>
                    <button v-b-modal.trailer class="transparent">Trailer</button>
                </div>
            </div>
            
        </div>

       <b-modal id="trailer" size="lg" :title="title">
            <iframe class="trailer"  v-if="trailer" :src="trailer" 
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
           
        </b-modal>
    </header>
    
</template>

<script>
import axios from 'axios'
export default {
   
    data(){
        return{
            filtro: require('@/assets/filtro.png'),
            movie: {
                genre_ids: [],
                credits:{
                    cast:[]
                }
            },
            apiKey: process.env.VUE_APP_API_KEY
        } 
    },
    computed:{
        backdrop(){
            return this.movie.backdrop_path ? `url('https://image.tmdb.org/t/p/w1280${this.movie.backdrop_path}')` : ''
        },
        title(){
            return this.movie.original_title || this.movie.name || ''
        },
        trailer(){
            return this.movie.videos.results[0] != null ? 'https://www.youtube.com/embed/' + this.movie.videos.results[0].key:'';
        },
    },
    created(){
        this.getData();
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
        },


        getData(){
            const id = this.$store.state.slideId
            axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&append_to_response=credits,videos`)
                .then(res => this.movie = res.data )

        }
    },
    filters:{
        starring(value){
            
            if(value.length>0){
                return value.map(value=> value.name).filter((value,i) => i < 3).reduce((accumulator,currentValue)=> accumulator + ', ' + currentValue)
            }
            return value
        }
    }
}
</script>

<style>
    .slide{
        color:white;
        
    }
    .slide-img{
        width: 100%;
        height: 350px;
        background-size: cover !important;
        position:relative;
    }
    .btn-group button{
        padding: 5px 12px;
        font-size: 1.2rem;
        border-radius: 4px;
        outline: 0;
        cursor:pointer;
    }
    .mr{
        margin-right: 10px;
    }
    .red{
        background-color: rgb(197, 39, 39);
        color: white;
        border:1px solid rgb(197, 39, 39);
    }
    .red:hover{
        background-color: rgb(224, 52, 52);
        
    }
    .transparent{
        background-color: transparent;
        color: white;
        border: 1px solid white;
    }
    .transparent:hover{
        background-color: rgba(255,255,255,0.1);
    }
    .slide-group{
        position:absolute;
        bottom: 50px;
        left: 8vw;
    }
    .slide-group > *{
        margin-bottom: 10px;
    }
    .slide-group .genres{
        font-size: 0.95rem;
        color: rgb(221, 221, 221);
    }
    .trailer{
        width: 100%;
        height: 400px;
    }
</style>
