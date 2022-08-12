<template>
    <div>
        {{value}}
    </div>
</template>

<script>
    export default {
        name: 'dist-show',
        props: {
            dict: {
                type: null,
                default: ''
            },
            val: {
                type: null,
                default: ''
            },
            param: {
                type: null,
                default: ''
            }
        },
        data () {
            return {
                value: ''
            }
        },
        created(){
            this.updateData(this.dict)
        },
        methods: {
            updateData(newData){
                if(newData[this.param]){
                    newData[this.param].forEach(item=>{
                        if(item.code === this.val){
                            this.value = item.name
                        }
                    })
                }
            }
        },
        watch: {
            dict: function (newData, oldData) {
                this.dict = newData;
                this.updateData(newData)
            },
            val: function (newData, oldData) {
                this.val = newData;
                this.updateData(this.dict)
            },
        }
    }
</script>

<style lang="scss">

</style>
