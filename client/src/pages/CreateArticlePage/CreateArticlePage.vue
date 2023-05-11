<template>
    <div class="wrapper">
        <div class="container">
            <h2 class="title">Добавить статью</h2>
            <form enctype="multipart/form-data" @submit.prevent="submit" class="form">
                <input class="article-title" v-model="title" @input="handleTitle" placeholder="Заголовок...">
                <textarea class="textarea" @input="handleText" v-model="text" placeholder="Основной текст..."/>
                <div class="input-file">
                    <p class="label">Выберите обложку статьи: </p>
                    <input type="file" @change="handleFile" name="file" class="input">
                </div>
                <button type="submit" class="submit">Добавить статью</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "CreateArticlePage",
    data() {
        return {
            file: null,
            text: '',
            title: '',
            userInfo: {}
        }
    },
    methods: {
        handleFile(event) {
            this.file = event.target.files[0];
        },
        submit(event) {
            const formData = new FormData();
            formData.append("file", this.file)
            formData.append('text', this.text)
            formData.append('author', this.userInfo.id)
            formData.append('title', this.title)
            axios.post('http://localhost:3000/api/article', formData)
            console.log(this.file)
        },
        handleText(event) {
            this.text = event.target.value
        },
        handleTitle(event) {
            this.title = event.target.value
        },

    },
    beforeCreate() {
        const token = localStorage.getItem("token");
        axios.get('http://localhost:3000/api/user/auth', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            if (response.status === 200) {
                this.userInfo = response.data
            } else console.log(response.status)
        })
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
}

.form {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px 0;
}

.submit {
  padding: 20px;
  border-radius: 10px;
  text-transform: uppercase;
  background-color: #fff;
  font-weight: 700;
  font-size: 20px;
  border: 1px solid white;

  &:hover {
    color: white;
    background-color: transparent;
  }
}

.textarea {
  resize: none;
  width: 1400px;
  min-height: auto;
  height: 400px;
  padding: 20px;
  font-size: 18px;
}

.title {
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
}
.input-file{
    display: flex;
    align-items: center;
    gap: 0 20px;
    padding: 20px;
    border: 1px solid white;
}
.label{
    font-size: 20px;

}
.article-title{
    width: 1400px;
    padding: 20px;
    font-size: 20px;
}
</style>
