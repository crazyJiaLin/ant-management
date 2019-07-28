<template>
    <div>
        axios Test
    </div>
</template>
<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
        captchaId () {
            this.$axios.get('/login/captchaid').then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mounted () {
        this.captchaId();
    }
}
</script>