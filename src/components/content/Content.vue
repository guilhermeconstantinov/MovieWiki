<template>
    <content>
        <div class="content">
            <div class="header-content">
                <h1>{{label}}</h1>
                <input class="search" v-show="search" type="text" @keyup="$emit('search', $event.target.value)" placeholder="Movie or TV series" >
            </div>
            
            <ul class="items" v-if="items">
                <Item class="mr-item"
                :id="item.id" :type="type" :title="item.original_title !== undefined? item.original_title: item.name" 
                :year="item.release_date !== undefined? item.release_date: item.first_air_date" 
                :poster="item.poster_path" :genres="item.genre_ids"  
                v-for="item in items.results" :key="item.id"/>
            </ul>
            <Page :results="items.total_results" :pagination="items.pagination" :qtdPage="50" />
            
        </div>
        
    </content>
</template>

<script>
import Item from './Item'
import Page from '../Pagination'
export default {
    props:{
        items:{
            type: Object,
            require: true
        },
        label:{
            type: String,
            require: true
        },
        type:{
            type: String,
            require: true
        },
        search:{
            type:Boolean,
            default:true
        },
        
    },
    components:{
       Item, Page
    },
}
</script>
<style>
    content{
        display: flex;
        justify-content: center;
        margin-top:20px;
        grid-area: Content;
        
    }
    .content{
        display:flex;
        flex-direction: column;
        width: 80%;
        
    }
    .content h1{
        color: rgb(48, 48, 48);
        margin-bottom: 20px;
    }
    .items{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px,1fr));
        grid-template-rows: repeat(1, 350px);
        grid-gap: 20px;
        list-style: none;
    }
    .mr-item{
        margin:  0 auto;
    }
    .header-content{
        display:flex;
        justify-content:space-between
    }
    .header-content .search{
        height: 35px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.5);
        outline: 0;
        padding: 0 0 0 10px;
    }
    @media (max-width:600px){
        .content{
            width: 100%;
        }
    }
    .error{
        padding-left: 20px;
    }
    
</style>