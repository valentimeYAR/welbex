<template>
    <div class="wrapper">
        <div class="container">
            <h2 class="title">Список статей</h2>
            <ArticleItem v-for="article in articles" :key="article.id" :article="article"/>
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
            perPage: 20
        }
    },
    mounted() {
        this.getArticles()
    },
    methods: {
        async getArticles() {
            try {
                const response = await axios.get('http://localhost:3000/api/articles', {
                    params: {
                        page: this.currentPage,
                        perPage: this.perPage,
                    },
                });
                this.articles = response.data.transformedArticles;
            } catch (error) {
                console.error(error);
            }
        },
    },
    computed: {
        extractedArticles() {
            const {transformedArticles} = this;
        }
    }
}
</script>

<style scoped lang="scss">
.wrapper {
  background-color: #0D1117;
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
</style>