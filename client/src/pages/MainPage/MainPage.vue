<template>
    <div class="wrapper">
        <div class="container">
            <h2 class="title">Список статей</h2>
            <ArticleItem v-for="article in articles" :key="article.id" :article="article"/>
            <div class="empty" v-if="articles.length === 0">Список статей пуст :(</div>
            <div class="pagination">
                <button @click="lastPage" class="pagination-item back">Предыдущая страница</button>
                <button @click="nextPage" class="pagination-item next" v-if="currentPage !== pages">Следующая страница</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import ArticleItem from "@/pages/MainPage/ArticleItem.vue";

export default {
    name: "MainPage",
    components: {ArticleItem},
    data() {
        return {
            articles: [],
            currentPage: 1,
            perPage: 20,
            pages: 1
        }
    },
    mounted() {
        this.getArticles()
    },
    methods: {
        async getArticles() {
            try {
                const response = await axios.get(`http://localhost:3000/api/articles?page=${this.currentPage}&perPage=20`, {
                    params: {
                        page: this.currentPage,
                        perPage: this.perPage,
                    },
                })
                this.pages = response.data.totalPages
                this.articles = response.data.transformedArticles;
            } catch (error) {
                console.error(error);
            }
        },
        nextPage(){
            this.currentPage += 1;
            this.getArticles()
        },
        lastPage(){
            this.currentPage -= 1;
            this.getArticles()
        }
    },
}
</script>

<style scoped lang="scss">
.wrapper {
  background-color: #0D1117;
    min-height: 100vh;
}

.container {
  width: 1400px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px 0;
}

.title {
  font-size: 30px;
  font-weight: 700;
  text-align: center;
}

.img {
  height: 300px;
  width: 300px;
}
.empty{
    margin-top: 50px;
    font-size: 30px;
    text-align: center;
    font-weight: 700;
}
.pagination{
    display: flex;
    gap: 0 20px;
}
.pagination-item{
    padding: 10px;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 700;
    color: white
}
.next{
    background-color: darkgreen;
}
.back{
    background-color: tomato;
}
</style>