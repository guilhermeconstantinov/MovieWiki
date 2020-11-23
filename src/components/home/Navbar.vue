<template>
    <nav>
        <h1 class="logo"><router-link to="/">MovieWiki</router-link></h1>
        <ul class="nav-items" v-if="mqResponsive()">
            <li><router-link to="/" @click="show = !show">Home</router-link></li>
            <li><router-link to="/movies">Movies</router-link></li>
            <li><router-link to="/series">TV Series</router-link></li>
            <li><router-link to="/favorite">Favorite</router-link></li>
        </ul>
        <button class="btn-collapse" @click="show = !show"><i class="fas fa-bars"></i></button>
    </nav>
</template>

<script>
export default {
    data(){
        return{
            show: false
        }
    },
    computed:{
        
    },
    methods:{
        mqResponsive(){
                       
            if(this.$mq === 'mobile'){
                return this.show ? true : false
            }else{
                this.show = false
                return true
            }
            
            
        }
    }
  
}
</script>

<style>
    nav{
        width: 100%;
        height: 60px;
        display: flex ;
        align-items: center;
        justify-content: space-between;
        padding-left: 10px;
        padding-right: 10px;
        background-color: rgb(243, 243, 243);
               
    }
    .logo , .logo a{
        height: 100%;
        margin:0;
       
    }
    .logo a{
        font-size:1.5rem;
        display: flex;
        align-items: center;
        color: rgb(82, 82, 82);
        text-decoration: none;
  
        
    }
    .nav-items{
        display: flex;
        height: 100%;
        list-style: none;
        justify-content: space-around;
        align-items: center;
        width: 500px;
        margin:0;
    }
    
    .nav-items li a{
        text-decoration:none;
        padding:5px;
        color:rgb(82, 82, 82);
        font-size: 1rem;
        font-weight: 500;
    }
    .nav-items li a:hover{
        color:rgb(150, 150, 150);
    }
    .btn-collapse{
        width: 35px;
        height: 35px;
        border:1px solid rgba(201, 111, 236, 0.5);;
        border-radius:5px;
        background:transparent;
        outline: none;
        visibility: collapse;
      
    }
    .btn-collapse:hover{
        background-color: rgba(128, 128, 128, 0.2);
        cursor:pointer;
    }
    .fa-bars{
        color: rgb(95, 94, 94);
    }
    .collapse{
        display: flex;
    }
  
    @media (max-width: 600px){
       
        .btn-collapse{
            visibility: visible;
        }
        .nav-items{
            position: absolute;
            max-width: 200px;
            background-color:rgb(223, 223, 223);
            box-shadow: 5px 5px 10px rgba(0,0,0,0.2);
            bottom:-60px;
            right:0;
            z-index:10;
            flex-direction: column;
            justify-content: flex-start;
            
        }
        .nav-items li{
            
            width: 100%;
        }
        .nav-items li a{
            display: block;
            color: rgb(82, 82, 82);
            width: 100%;
            padding:10px;
           
        }
        .nav-items li a:hover{
            background-color: rgb(194, 194, 194);
           
        }
        .logo a{
            font-size:1.2rem;
        }

    }



    
</style>