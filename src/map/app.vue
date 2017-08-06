<template>
<div class="app">

</div>
</template>

<script>

export default {
    name: 'app',
    components: {

    },
    data() {
        return {

        }
    },
    props: {
        data: {}
    },
    mounted() {
        this.$store.dispatch('fetchData');
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.app {

}
</style>
