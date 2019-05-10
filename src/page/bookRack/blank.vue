<template>
    <div v-if="isShow">书架空空如也</div>
</template>
<script>
export default {
    name: 'Blank-rack',
    data () {
        return {
            
        }
    },
    props: ['isShow']
}
</script>

