<template>
  <div>
    <Navbar/>
    <router-view></router-view>
  </div>
  
</template>

<script>
import Navbar from '@/components/home/Navbar'
import axios from 'axios'
export default {
  components:{
    Navbar
  },
  mounted(){
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=a6e6381bba3f98f3d8d5d40dbe25d1a4&language=en-US')
    .then(res =>{
      this.$store.state.genres =  res.data.genres;
      
    });
    localStorage.setItem('movie','');
    localStorage.setItem('tv','');
    
  }
}
</script>
<style>
  body{
    background-color:#FFF;
  }
    
  *{margin: 0; padding:0; box-sizing: border-box; font-family: 'Roboto', sans-serif;}
</style>
