<template>
    <div class="wrapper">
        <p class="date">Дата создания: {{ article.createdAt }}</p>
        <p class="author">Автор статьи: {{ article.user.login }}</p>
        <div class="container">
            <div class="content-block">
                <img :src="article.imageUrl" alt="" class="img">
                <h2 class="title" v-if="!edit">{{ article.title }}</h2>
                <input type="text" v-model="article.title" class="edit-title" v-if="edit">
                <p class="text" v-if="!edit">{{ article.text }}</p>
                <textarea class="edit-text" v-model="article.text" v-if="edit"></textarea>
                <button class="send-article" @click="sendArticle" v-if="edit">Сохранить изменения</button>
            </div>
        </div>
        <div class="edit-article" v-if="article.user.login === userInfo.login">
            <svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="edit-svg" @click="editArticle">
                <title/>
                <g id="Complete">
                    <g id="edit">
                        <g>
                            <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none"
                                  stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>

                            <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
                                     stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </g>
                    </g>
                </g>
            </svg>
            <svg width="30px" height="30px" viewBox="0 -0.5 21 21" xmlns="http://www.w3.org/2000/svg" @click="deleteArticle" class="delete-svg">
                <defs>
                </defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="white">
                        <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z"
                                  id="delete-[#1487]">
                            </path>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ArticlePage",
    props: ['id'],
    data() {
        return {
            article: {},
            userInfo: {},
            edit: false
        }
    },
    beforeCreate() {
        axios.get(`http://localhost:3000/api/article/${this.id}`).then(res => {
            this.article = res.data
        })
        const token = localStorage.getItem("token");
        axios.get('http://localhost:3000/api/user/auth', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            if (response.status === 200) {
                this.token = true
                this.userInfo = response.data
            } else {
                console.log(response.status)
            }
        })
    },
    methods:{
        editArticle(e){
            this.edit = true
        },
        sendArticle(){
            axios.put(`http://localhost:3000/api/article/${this.id}`, {
                title: this.article.title,
                text: this.article.text
            })
            this.edit = false
        },
        deleteArticle(){
            axios.delete(`http://localhost:3000/api/article/${this.id}`)
            this.$router.push('/')
        }
    }

}
</script>

<style scoped lang="scss">
.wrapper {
    background-color: #0D1117;
    position: relative;
    min-height: 100vh;
}

.container {
    width: 1000px;
    margin: 0 auto;
    padding: 20px;
}

.img {
    width: 700px;
    height: 400px;
    border-radius: 20px;
}

.title {
    width: 1400px;
    font-size: 40px;
    text-align: center;
    margin-bottom: 20px;
}

.content-block {
    display: flex;
    flex-direction: column;
    gap: 20px 20px;
    align-items: center;

}

.text {
    width: 1400px;
    line-height: 30px;
    font-size: 20px;
    font-weight: 500;
}

.author {
    font-size: 20px;
    font-weight: 700;
    position: absolute;
    top: 50px;
    right: 50px;
}

.date {
    font-size: 20px;
    font-weight: 700;
    position: absolute;
    top: 50px;
    left: 50px;
}

.edit-article {
    display: flex;
    gap: 0 20px;
    position: absolute;
    top: 100px;
    right: 50px;
    & svg{
        cursor: pointer;
    }
}
.edit-title{
    width: 1400px;
    font-size: 30px;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    color: white;
    background-color: #0D1117;
    border: 1px solid white;
}
.edit-text{
    resize: none;
    width: 1400px;
    height: 400px;
    padding: 20px;
    font-size: 18px;
    border-radius: 10px;
    color: white;
    background-color: #0D1117;
    border: 1px solid white;
    overflow: auto;
}
.send-article{
    padding: 20px;
    background-color: green;
    font-size: 20px;
    font-weight: 700;
    color: white;
    border-radius: 10px;
    border: 1px solid green;
    &:hover{
        background-color: transparent;
    }
}
</style>