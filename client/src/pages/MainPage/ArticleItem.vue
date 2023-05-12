<template>
    <div class="article-container" @click="redirectOnArticle">
        <div class="article-image-block">
            <img :src="article.imageUrl" alt="" class="article-img">
        </div>
        <div class="text-block">
            <h2 class="article-title">{{ article.title }}</h2>
            <p class="article-text">
                {{ cutText(article.text, 1000) }}<br><a :href="'/article/' + this.article.id"
                                                        v-if="article.text.length >= 1000"
                                                        class="article-more">Читать дальше</a>
            </p>
            <p class="article-author">Автор статьи: {{ article.user.login }}</p>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ArticleItem",
    props: {
        article: {
            type: Object,
            required: true,
        }
    },
    methods: {
        cutText(text, maxlength) {
            if (text.length <= maxlength) {
                return text
            } else {
                return text.slice(0, maxlength) + "..."
            }
        },
        redirectOnArticle(){
            this.$router.push(`/article/${this.article.id}`)
        }
    },
}
</script>

<style scoped lang="scss">
.article-container {
  background-color: #0D1117;
  border: 1px solid white;
  display: flex;
  padding: 20px;
  gap: 0 20px;
  position: relative;
  cursor: pointer;
}

.article-img {
  width: 600px;
  height: 400px;
  border-radius: 10px;
}

.article-title {
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: 700;
}

.article-more {
  font-size: 20px;
  color: dodgerblue;
  text-decoration: underline;
}

.article-author {
  position: absolute;
  right: 20px;
  bottom: 20px;
  font-size: 20px;
  font-weight: 700;
}
</style>