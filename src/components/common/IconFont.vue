<template>
    <el-dialog
            title="选择图标"
            :visible.sync="isVisible"
    >
        <ul class="iconfont-box">
            <li class="icon-item" @click="selectIcon('icon-xiaoxi1')">
                <i class="iconfont icon-xiaoxi1"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-status-bh')">
                <i class="iconfont icon-status-bh"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-cuowu-copy')">
                <i class="iconfont icon-cuowu-copy"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-tongyi1')">
                <i class="iconfont icon-tongyi1"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-tuisong')">
                <i class="iconfont icon-tuisong"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-baobiaoguanli-copy')">
                <i class="iconfont icon-baobiaoguanli-copy"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-richeng')">
                <i class="iconfont icon-richeng"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-xitong')">
                <i class="iconfont icon-xitong"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-zengzhi')">
                <i class="iconfont icon-zengzhi"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-shouji')">
                <i class="iconfont icon-shouji"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-youxiang')">
                <i class="iconfont icon-youxiang"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-dizhi')">
                <i class="iconfont icon-dizhi"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-xingbienanxianxing')">
                <i class="iconfont icon-xingbienanxianxing"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-xiugai-copy')">
                <i class="iconfont icon-xiugai-copy"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-shezhi')">
                <i class="iconfont icon-shezhi"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-cloud-form')">
                <i class="iconfont icon-cloud-form"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-course')">
                <i class="iconfont icon-course"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-shang1')">
                <i class="iconfont icon-shang1"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-liebiao')">
                <i class="iconfont icon-liebiao"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-yiban')">
                <i class="iconfont icon-yiban"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-home')">
                <i class="iconfont icon-home"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-xiangmu')">
                <i class="iconfont icon-xiangmu"></i>
            </li>
            <li class="icon-item" @click="selectIcon('icon-shouye2')">
                <i class="iconfont icon-shouye2"></i>
            </li>

        </ul>
    </el-dialog>
</template>

<script>
    export default {
        name: 'dist-show',
        props: ['isIconfont', 'iconfontType', 'suffixIcon', 'prefixIcon'],
        data () {
            return {
                is: this.isIconfont,
            }
        },
        computed: {
            isVisible:{
                get: function(){
                    return this.isIconfont
                },
                set: function(newValue){
                    this.$emit('update:isIconfont', newValue)
                }
            }
        },
        methods: {
            selectIcon(value){
                this.$emit('update:isIconfont', false);
                //后置图标
                if(this.iconfontType === 'suffixIcon'){
                    this.$emit('update:suffixIcon', value)
                }
                else if(this.iconfontType === 'prefixIcon'){
                    this.$emit('update:prefixIcon', value)
                }
            }
        }
    }
</script>

<style lang="scss">
.iconfont-box{
    display: flex;
    font-size: 20px;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    .icon-item{
        display: flex;
        align-items: center;
        justify-content: center;
        list-style: none;
        width: 60px;
        height: 60px;
        cursor: pointer;
        i{
            font-size: 36px;
        }
    }
}
</style>
