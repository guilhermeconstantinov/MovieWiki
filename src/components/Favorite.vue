<template>
    <div class="favorite-content">
        <div class="favorite-items">
            <h1>Your Favorite list</h1>
            <div v-if="movie.results.length || tv.results.length">
                <Content type="movie" v-if="movie.results.length" @remove="remove('movie', $event)" :search="false" :items="movie" label="Movie List" />
                <Content type="serie" v-if="tv.results.length" @remove="remove('tv', $event)" :search="false" :items="tv" label="Serie List" />
            </div>
            <p v-else>Nothing found</p>
        </div>
    </div>
</template>

<script>
import Content from './favorites/Content'
import axios from 'axios'
export default {
    components: { Content },
    data(){
        return{
            movie: {
                results: []
            },
            tv: {
                results: []
            }
        }
    },
    created(){
       
        this.getData('movie')
        this.getData('tv')
       
    },
    methods:{
        getData(type){
            let data = localStorage.getItem(type).split(',');
            if(data != ''){
                for (let id of data){
                    
                    axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=a6e6381bba3f98f3d8d5d40dbe25d1a4`)
                    .then(res => {
                            let value = res.data;
                            value.genre_ids = value.genres.map(genre=> genre.id)
                            
                            this[type].results.push(value)
                    });
                }
            }
            
        },
        remove(type, id){

            let dataId = localStorage.getItem(type).split(',');
          
            this[type].results = this[type].results.filter(value=> {
                    return value.id != id
            })
    
            localStorage.setItem(type, dataId.filter(value => value != id))
        }
    }
}

</script>

<style>
.favorite-content{
    margin-top:20px;
    display: flex;
    
    justify-content: center;
    
}
.favorite-items{
    
    width: 80%;
}
.favorite-items > p{
    margin-top:20px;
    text-align:center;
    font-size: 1.3rem;
}
.favorite-content h1{
    
    margin-bottom: 10px;
}
</style>