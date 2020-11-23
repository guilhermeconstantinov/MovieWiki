<template>
    <div>
        <div class="slide-movie" :style="{background: backdrop}">
        </div>

        <div class="content-movie">
            <div class="poster">
                <img :src="poster" alt="">
                <div class="poster-info">
                    <h1>{{ movie.original_title || movie.original_name }}</h1>
                    <p>{{ movie.genres  |genres}}</p>
                    <p><span class="c-gray">Release date:</span> {{dateReleased | year}}</p>
                    <button class="favorite-btn" @click="addFavorite">Add to my favorites list</button>
                </div>
            </div> 

            <div class="content-description">
                <h2>Synopsis</h2>
                <p>{{movie.overview || 'No information'}}</p>
                <h2>Movie Trailer</h2>
                <iframe width="560" height="315" v-if="trailer" :src="trailer" 
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
                <p v-else>No trailer</p>
            </div>
        
        </div>
    </div>
</template>


<script>
import axios from 'axios'
export default {
   
    data(){
        return {
            movie: { 
                original_title: '',
                videos:{
                    results:[]
                },
                genres: [],
                backdrop_path: null,
                poster_path: null,

            },
            apiKey: process.env.VUE_APP_API_KEY
        }
    },  
    computed:{
        trailer(){
            return this.movie.videos.results[0] != null ? 'https://www.youtube.com/embed/' + this.movie.videos.results[0].key:'';
        },
        poster(){
            return this.movie.poster_path ?  'https://image.tmdb.org/t/p/w342'+this.movie.poster_path: require('@/assets/semfoto.jpg')
        },
        backdrop(){
            return this.movie.backdrop_path ? `url('https://image.tmdb.org/t/p/w1280${this.movie.backdrop_path}')` : `url('${require('@/assets/no-image.jpg')}')`
        },
        dateReleased(){
            return this.movie.release_date ? this.movie.release_date: this.movie.first_air_date;
        }
        
    },
    created(){
        const id = this.$route.params.id;
        const type = this.$route.meta.type;
        axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${this.apiKey}&append_to_response=videos`)
            .then(res => this.movie = res.data )
        
    }, 
    filters:{
        genres(value){
            
            if(value[0] != undefined){
                if(value.length > 1){
                    return value.map(value => value.name ).reduce((accumulator, currentValue)=> accumulator + ', ' + currentValue)
                }else{
                    return value[0].name;
                }
            }
            
            return 'Uncategorized'
            
        }
    },
    methods:{
        addFavorite(){
            const type = this.$route.meta.type;
            let storage =  localStorage.getItem(type) != '' ? localStorage.getItem(type).split(',') : '';
            
            if(storage == ''){
            
                localStorage.setItem(type,this.$route.params.id);
                return
            }

            if(!storage.includes(this.$route.params.id)){
                storage.push(this.$route.params.id)
                
            }
            localStorage.setItem(type,storage)

            
        }
    } 
   
    
}
</script>

<style>
    .slide-movie{
        width: 100%;
        border:1px solid rgb(216, 215, 215);
        height:350px;
        background-size: cover !important;
        background-position:center;
    }
    .content-movie{
        display: flex;
        flex-wrap: wrap;
        padding: 50px;
    }
    .content-movie .poster{
        width:200px;
        display: flex;
        flex-direction: column;
     
    }
    .content-movie .poster h1{
        font-size: 1.2rem;
        margin-top:10px;
        margin-bottom: 5px;
        color: rgb(66, 66, 66);
    }
    
    .content-movie .poster p{
        font-size: 0.92rem;
        margin-bottom: 5px;
        color:rgb(116, 116, 116);
    }
    .content-description{
        flex:1;
        padding: 0 20px 20px 20px;
    }
    .content-description h2{
        font-size: 1.2rem;
    }
    .content-description > *{
        margin-bottom: 10px;
    }
    .c-gray{
        color: rgb(102, 101, 101);
        font-weight: 500;
    }
    .favorite-btn{
        padding: 10px;
        text-align:center;
        border-radius:4px;
        cursor:pointer;
        outline:0;
        border-style: none;
        background-color: rgb(190, 176, 48);
        color:white;
        font-weight: 600;
        width: 100%;
    }
    @media (max-width: 600px){
        .content-movie{
            align-items: center;
            flex-direction: column;
            padding:10px 0 0 0;
        }
        .content-description{
            width: 100%;
        }
        .content-description iframe{
            width: 100%;
        }
        .slide-movie{
            height: 250px;
        }
        .content-movie .poster{
            flex-direction: row;
            width: 100%;
            padding:10px;
        }
        .content-movie .poster img{
            width: 200px;
            margin-right:10px;
        }
        
    }
    
    
    
</style>