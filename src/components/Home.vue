<template>
    <div>
        <Slide />
         
        <Content type="movie" @search="search" :items="movies" label="Popular Movies"/>
        
        
    </div>
</template>

<script>
import Slide from './home/Slide'
import Content from './content/Content'
import axios from 'axios'
export default {
    components:{
        Slide, Content
    }, 
    data(){
        return{
            movies: {
                results:[]
            },
            apiKey: process.env.VUE_APP_API_KEY
        }
    },
    watch:{
        page(){
            this.getData(this.page)
        }
    },
    computed:{
        page(){
            return this.$route.query.page || 1
        },
    },
    created(){
        this.getData(this.page)
    },
    methods:{
        search(value){
            
            if(value != ''){
                axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${value}&sort_by=release_date.desc`)
                .then(res =>{
                    this.movies = res.data
                    this.movies.pagination = false
                });
            }else{
                this.getData(this.page)
                this.$router.replace({'query': null})
            }
            
        },
        async getData(page){
            this.movies.pagination = true
            
            let pageIndex = (parseFloat(page) + 1)/2
            let range = parseInt(1 + (pageIndex - 1) * 5)
            
            let first =  await this.getApi(range)
            this.movies.total_results = first.total_results
            let middle = await this.getApi(range+1)
            let last = await this.getApi(range+2)
            
            last = (page%2 !=0)? last.results.filter((value,i)=> i<10): last.results
            first = (page%2 == 0)? first.results.filter((value,i)=> i>=10): first.results
            this.movies.results = first.concat(middle.results).concat(last)
           
        },
        getApi(range){
            return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&page=${range}&include_adult=false`)
                .then(res => res.data)
        }
    } 
    
}
</script>

<style>
   
</style>
