<template>
    <div>
        
        <Content type="serie" @search="search" :items="series" label="List Series"/>
    </div>
</template>

<script>

import Content from './content/Content'
import axios from 'axios'

export default {
    components: { Content},
   data(){
        return{
            series: {
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
                axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${this.apiKey}&language=en-US&page=1&include_adult=false&query=${value}&sort_by=release_date.desc`)
                .then(res =>{
                    this.series = res.data
                    this.series.pagination = false
                });
            }else{
                this.getData(this.page);
                this.$router.replace({'query': null})
            }
            
        },
        async getData(page){
            this.series.pagination = true
            
            let pageIndex = (parseFloat(page) + 1)/2
            let range = parseInt(1 + (pageIndex - 1) * 5)
            
            let first =  await this.getApi(range)
            this.series.total_results = first.total_results
            let middle = await this.getApi(range+1)
            let last = await this.getApi(range+2)
            last = (page%2 !=0)? last.results.filter((value,i)=> i<10): last.results
            first = (page%2 == 0)? first.results.filter((value,i)=> i>=10): first.results
            this.series.results = first.concat(middle.results).concat(last)
           
        },
        getApi(range){
            return axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${this.apiKey}&language=en-US&sort_by=first_air_date.desc&page=${range}&timezone=America%2FNew_York&include_null_first_air_dates=false&first_air_date.lte=2020-12-30&include_adult=false`)
                .then(res => res.data)
        }
    } 
}
</script>

<style >

</style>